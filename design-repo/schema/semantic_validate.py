#!/usr/bin/env python3
"""Semantic validator for PageSpecs: everything Draft-07 JSON Schema cannot express.

    python3 schema/semantic_validate.py <pagespec.json> [...]     # schema layer + semantic layer
    python3 schema/semantic_validate.py --semantic-only <file>

Importable: validate(spec) -> (errors, warnings), each a list of (code, message);
validate_schema(spec) -> list of messages (Draft-07, needs `jsonschema`).

Rule families
  TEMPLATE_*                 nodes are matched against the declared template's real node list
  ROUTE_TEMPLATE_MISMATCH    reference pages must use a mounted route of their template
  graph rules (GRAPH_RULE_IDS, same ids as compatibility/graph.json)
  MAX_WORDS, VARIANT_FIELDS, MOTION_*, ASSET_*, THEME_*, TOKEN_*
  GENERATED_MODE_*           mode=generated may not carry source identity or content
Pins (independent of the JSON registries, so editing a registry alone cannot loosen them):
  PINNED_AVAILABILITY, PINNED_POLICY, RETRIEVAL_INELIGIBLE.
Standard library only, except the optional schema layer.
"""
import json, os, re, sys
from urllib.parse import urlparse

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

# ---- pins ------------------------------------------------------------------------------------
PINNED_AVAILABILITY = {
    "brand.source-wordmark": "blocked-for-generation",
    "brand.reference-wordmark": "reference-only",
    "brand.placeholder-mark": "generation-safe",
    "brand.user-supplied-mark": "generation-safe",
    "logo.source-customer": "blocked-for-generation",
    "logo.reference-company": "reference-only",
    "logo.fictional-company": "generation-safe",
    "logo.third-party-app": "blocked-for-generation",
    "icon.generated-app": "generation-safe",
    "icon.stroke-ui": "generation-safe",
    "product.source-screenshot": "blocked-for-generation",
    "product.reference-mock": "reference-only",
    "product.generated-visual": "generation-safe",
    "person.source-photo": "blocked-for-generation",
    "person.reference-portrait": "reference-only",
    "person.fictional-portrait": "generation-safe",
    "avatar.abstract": "generation-safe",
    "illustration.reference-art": "reference-only",
    "illustration.generated-abstract": "generation-safe",
    "illustration.decorative-pattern": "generation-safe",
    "media.source-video": "blocked-for-generation",
    "media.video-placeholder": "generation-safe",
    "rating.source-review": "blocked-for-generation",
    "rating.placeholder": "generation-safe",
    "store.source-badge": "blocked-for-generation",
    "store.placeholder-badge": "generation-safe",
    "chart.illustrative": "generation-safe",
    "url.placeholder": "generation-safe",
    "copy.original": "generation-safe",
}
# compliance-critical roles pinned to one specific generationPolicy value (not just enum membership)
PINNED_POLICY = {
    "brand.source-wordmark": "must-not-fabricate",
    "logo.source-customer": "must-not-fabricate",
    "logo.third-party-app": "must-not-fabricate",
    "product.source-screenshot": "must-not-fabricate",
    "person.source-photo": "must-not-fabricate",
    "media.source-video": "must-not-fabricate",
    "rating.source-review": "must-not-fabricate",
    "store.source-badge": "must-not-fabricate",
    "brand.reference-wordmark": "reference-evidence-only",
    "brand.user-supplied-mark": "must-reuse-exact",
}
# runtime/utility UI that must never be retrieved or placed as a page node
RETRIEVAL_INELIGIBLE = {"overlay.search-dialog", "overlay.gallery-lightbox", "overlay.mobile-nav-drawer"}

GRAPH_RULE_IDS = ["SHELL_POSITION", "ONE_HERO", "HERO_FIRST", "HOME_ROUTE_ONLY", "ONE_PER_PAGE", "NO_CONSECUTIVE_SAME_SECTION",
                  "NO_ADJACENT_SAME_CATEGORY", "MUST_PRECEDE_FOOTER", "DARK_STACK_ORDER", "CURTAIN_NEEDS_DARK_STACK",
                  "GROUP_NEEDS_HEADER", "OVERLAY_NOT_A_NODE", "MOTION_BUDGET"]
GENERATED_RULES = ["GENERATED_MODE_BRAND", "GENERATED_MODE_CTA", "GENERATED_MODE_COPY", "GENERATED_MODE_URL", "GENERATED_MODE_ASSET",
                   "GENERATED_MODE_PERSON", "GENERATED_MODE_RATING", "GENERATED_MODE_STORE"]
CONTINUOUS_MOTION = {"badge-comet", "auto-cycle-tabs", "marquee-loop", "ambient-streaks", "decorative-loop"}
MOTION_BUDGET_MAX = 5
SHINGLE = 6

def _load(rel):
    with open(os.path.join(REPO, rel)) as f:
        return json.load(f)

_CTX = {}
def ctx():
    if not _CTX:
        _CTX["contracts"] = {}
        for fn in sorted(os.listdir(os.path.join(REPO, "sections"))):
            if fn.endswith(".json"):
                c = _load(f"sections/{fn}")
                _CTX["contracts"][c["id"]] = c
        _CTX["templates"] = _load("templates/templates.json")["templates"]
        _CTX["routes"] = _load("templates/routes.json")["routes"]
        _CTX["graph"] = _load("compatibility/graph.json")
        _CTX["roles"] = {r["id"]: r for r in _load("assets/asset-roles.json")["roles"]}
        _CTX["catalog"] = _load("tokens/llm/token-catalog.json")["tokens"]
        _CTX["policy"] = _load("tokens/llm/token-policy.json")
        _CTX["brand"] = _load("schema/source-brand.json")["patterns"]
        corpus = _load("schema/reference-copy-corpus.json")
        sh, short = set(), set()
        for s in corpus["strings"]:
            toks = _toks(s)
            if len(toks) < SHINGLE:
                short.add(" ".join(toks))
            for i in range(len(toks) - SHINGLE + 1):
                sh.add(" ".join(toks[i:i + SHINGLE]))
        _CTX["shingles"], _CTX["shortCopy"] = sh, short
    return _CTX

def _toks(s):
    return re.findall(r"[a-z0-9]+(?:['’][a-z]+)?", s.lower())

def words(s):
    return len(s.split())

# ---- helpers -----------------------------------------------------------------------------------
def walk_strings(o, path="$"):
    if isinstance(o, str):
        yield path, o
    elif isinstance(o, dict):
        for k, v in o.items():
            yield from walk_strings(v, f"{path}.{k}")
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from walk_strings(v, f"{path}[{i}]")

def walk_objects(o, path="$"):
    if isinstance(o, dict):
        yield path, o
        for k, v in o.items():
            yield from walk_objects(v, f"{path}.{k}")
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from walk_objects(v, f"{path}[{i}]")

def resolve(schema, root_defs):
    if isinstance(schema, dict) and "$ref" in schema:
        return root_defs.get(schema["$ref"].split("/")[-1], {})
    return schema

DEF_MAXWORDS = {"cta": {"label": 5}, "link": {"label": 6}, "person": {"name": 4, "role": 10}, "media": {"alt": 16}}

def check_words(value, schema, path, errs, roles_out):
    """Walk content against a section contract schema; enforce maxWords and collect media role slots."""
    if schema is None:
        return
    if isinstance(schema, dict) and "$ref" in schema:
        name = schema["$ref"].split("/")[-1]
        if name == "media" and isinstance(value, dict):
            roles_out.append((path, value.get("assetRole"), schema.get("x-assetRoles")))
        if isinstance(value, dict) and name in DEF_MAXWORDS:
            for k, m in DEF_MAXWORDS[name].items():
                if isinstance(value.get(k), str) and words(value[k]) > m:
                    errs.append(("MAX_WORDS", f"{path}.{k}: {words(value[k])} words > maxWords {m}"))
        return
    if "oneOf" in schema:
        for s in schema["oneOf"]:
            if isinstance(value, dict) and set(value) <= set(s.get("properties", {})) and set(s.get("required", [])) <= set(value):
                check_words(value, s, path, errs, roles_out)
                return
        return
    t = schema.get("type")
    if t == "string" and isinstance(value, str):
        m = schema.get("maxWords")
        if m is not None and words(value) > m:
            errs.append(("MAX_WORDS", f"{path}: {words(value)} words > maxWords {m}"))
    elif t == "object" and isinstance(value, dict):
        for k, v in value.items():
            check_words(v, schema.get("properties", {}).get(k), f"{path}.{k}", errs, roles_out)
    elif t == "array" and isinstance(value, list):
        for i, v in enumerate(value):
            check_words(v, schema.get("items"), f"{path}[{i}]", errs, roles_out)

# ---- template matching -------------------------------------------------------------------------
def match_template(nodes, tpl, errs):
    i, n = 0, len(nodes)
    for tn in tpl["nodes"]:
        if "section" in tn:
            cnt = 0
            while i < n and nodes[i].get("type") == tn["section"]:
                v = nodes[i].get("variant")
                if tn.get("variants") and v not in tn["variants"]:
                    errs.append(("TEMPLATE_VARIANT_NOT_ALLOWED", f"node '{nodes[i].get('id')}' {tn['section']} variant '{v}' not in template variants {tn['variants']}"))
                cnt += 1; i += 1
            if cnt == 0 and tn["required"]:
                errs.append(("TEMPLATE_MISSING_REQUIRED", f"template '{tpl['id']}' requires {tn['section']} at this position"))
            if cnt > 1 and not tn["repeatable"]:
                errs.append(("TEMPLATE_REPEAT_NOT_ALLOWED", f"{tn['section']} appears {cnt} times; template node is not repeatable"))
        else:
            cnt = 0
            while i < n and nodes[i].get("type") in tn["allowedSections"]:
                t, v = nodes[i].get("type"), nodes[i].get("variant")
                av = tn.get("allowedVariants", {}).get(t)
                if av and v not in av:
                    errs.append(("TEMPLATE_VARIANT_NOT_ALLOWED", f"node '{nodes[i].get('id')}' {t} variant '{v}' not allowed in region {tn['region']} ({av})"))
                cnt += 1; i += 1
            if cnt < tn["minItems"] or cnt > tn["maxItems"]:
                errs.append(("TEMPLATE_REGION_COUNT", f"region '{tn['region']}' holds {cnt} nodes; template requires {tn['minItems']}-{tn['maxItems']}"))
    known = {tn["section"] for tn in tpl["nodes"] if "section" in tn} | {s for tn in tpl["nodes"] if "region" in tn for s in tn["allowedSections"]}
    for nd in nodes[i:]:
        code = "TEMPLATE_ORDER" if nd.get("type") in known else "TEMPLATE_UNEXPECTED_NODE"
        errs.append((code, f"node '{nd.get('id')}' ({nd.get('type')}) does not fit template '{tpl['id']}' at this position"))
        break

def route_matches(pattern, route):
    rx = "^" + re.sub(r":[a-z]+", "[^/]+", pattern) + "$"
    return re.match(rx, route) is not None

# ---- token policy ------------------------------------------------------------------------------
RAW_COLOR = re.compile(r"(?<![\w/&])#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b|\b(?:rgba?|hsla?|oklch|oklab|lab|color-mix)\(", re.I)
RAW_LEN = re.compile(r"^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|svh)?$")
URL_KEYS = {"href", "route"}

def check_style(nd, contract, errs):
    st = nd.get("style")
    if not st:
        return
    cat, pol = ctx()["catalog"], ctx()["policy"]
    theme = st.get("theme", contract["themes"][0])
    if theme not in contract["themes"]:
        errs.append(("THEME_NOT_ALLOWED_FOR_SECTION", f"node '{nd['id']}': theme '{theme}' not in {contract['id']} themes {contract['themes']}"))
    s = st.get("surface")
    if s is not None:
        if RAW_COLOR.search(s) or s.startswith("#"):
            errs.append(("TOKEN_RAW_COLOR", f"node '{nd['id']}' style.surface is a raw colour '{s}'"))
        elif s not in cat:
            errs.append(("TOKEN_UNKNOWN", f"node '{nd['id']}' style.surface '{s}' is not in the token catalog"))
        elif not cat[s]["approvedForPageSpec"] or cat[s]["type"] != "color":
            errs.append(("TOKEN_NOT_APPROVED", f"node '{nd['id']}' style.surface '{s}' is not approved for PageSpecs"))
        elif s not in pol["themeSurfaces"].get(theme, []):
            errs.append(("TOKEN_THEME_MISMATCH", f"node '{nd['id']}' surface '{s}' is not valid for theme '{theme}'"))
    for k in ("paddingTop", "paddingBottom"):
        v = st.get(k)
        if v is None:
            continue
        if RAW_LEN.match(v) or not v.startswith("space."):
            errs.append(("TOKEN_ARBITRARY_SPACING", f"node '{nd['id']}' style.{k} '{v}' is a raw length, not a spacing token"))
        elif v not in cat:
            errs.append(("TOKEN_UNKNOWN", f"node '{nd['id']}' style.{k} '{v}' is not in the token catalog"))
        elif v not in pol["sectionRhythm"]:
            errs.append(("TOKEN_ARBITRARY_SPACING", f"node '{nd['id']}' style.{k} '{v}' is not a section-rhythm spacing token"))
    f = st.get("headingFont")
    if f is not None and (f not in cat or cat[f]["type"] != "fontFamily" or f not in pol["approvedFonts"]):
        errs.append(("TOKEN_UNSUPPORTED_FONT", f"node '{nd['id']}' style.headingFont '{f}' is not an approved font token"))

# ---- generated mode ------------------------------------------------------------------------------
def _rx(p):
    return re.compile(p, re.I)

def check_generated(spec, errs):
    pats = ctx()["brand"]
    brand_rx = [_rx(p) for p in pats["brand"]]
    company_rx = [_rx(r"\b" + re.escape(c) + r"\b") for c in pats["company"]]
    cta_rx = [_rx(p) for p in pats["cta"]]
    copy_rx = [_rx(re.escape(p)) for p in pats["copy"]]
    person_rx = [_rx(r"\b" + re.escape(p) + r"\b") for p in pats["person"]]
    rating_rx = [_rx(p) for p in pats["rating"]]
    store_rx = [_rx(p) for p in pats["store"]]
    url = pats["url"]
    shingles, short = ctx()["shingles"], ctx()["shortCopy"]
    seen = set()
    def add(code, msg):
        if (code, msg) not in seen:
            seen.add((code, msg)); errs.append((code, msg))
    if spec.get("brand", {}).get("fictional") is not True:
        add("GENERATED_MODE_BRAND", "brand.fictional must be true in generated mode")
    for path, s in walk_strings(spec):
        key = path.rsplit(".", 1)[-1]
        if key in ("type", "variant", "mode", "template", "pageSpecVersion", "reducedMotionFallback", "assetRole", "kind", "theme", "surface", "paddingTop", "paddingBottom", "headingFont") or re.search(r"\.patterns\[\d+\]$", path):
            continue
        is_url = key in URL_KEYS or s.startswith("http")
        for rx in brand_rx + company_rx:
            if rx.search(s):
                add("GENERATED_MODE_BRAND", f"{path}: source/reference brand or identity '{rx.pattern}' in '{s[:60]}'")
        for rx in cta_rx:
            if rx.search(s):
                add("GENERATED_MODE_CTA", f"{path}: source CTA '{s[:60]}'")
        for rx in person_rx:
            if rx.search(s):
                add("GENERATED_MODE_PERSON", f"{path}: reference/real person name in '{s[:60]}'")
        for rx in rating_rx:
            if rx.search(s):
                add("GENERATED_MODE_RATING", f"{path}: rating/review claim in '{s[:60]}'")
        for rx in store_rx:
            if rx.search(s):
                add("GENERATED_MODE_STORE", f"{path}: app-store mark or link in '{s[:60]}'")
        if is_url:
            if s.startswith("http"):
                u = urlparse(s)
                host = (u.hostname or "").lower()
                ok = host in url["allowedHosts"] or any(host.endswith(sfx) for sfx in url["allowedHostSuffixes"])
                if not ok or host in url["blockedHosts"]:
                    add("GENERATED_MODE_URL", f"{path}: '{s}' is not on a reserved placeholder domain (.example/.invalid)")
                tail = u.path
            else:
                tail = s
            parts = set(re.split(r"[/_.\-#?=&:]+", tail.lower()))
            hit = parts & set(url["blockedPathTokens"])
            if hit:
                add("GENERATED_MODE_URL", f"{path}: '{s}' contains source-specific path token(s) {sorted(hit)}")
            continue
        if key == "assetRef":
            for pre in pats["assetRefPrefixesBlockedInGenerated"]:
                if s.startswith(pre):
                    add("GENERATED_MODE_ASSET", f"{path}: assetRef '{s}' points at reference/source media")
            continue
        for rx in copy_rx:
            if rx.search(s):
                add("GENERATED_MODE_COPY", f"{path}: source copy phrase '{rx.pattern}'")
        toks = _toks(s)
        if 4 <= len(toks) < SHINGLE and " ".join(toks) in short:
            add("GENERATED_MODE_COPY", f"{path}: reuses reference copy verbatim: '{s[:60]}'")
        for i in range(len(toks) - SHINGLE + 1):
            if " ".join(toks[i:i + SHINGLE]) in shingles:
                add("GENERATED_MODE_COPY", f"{path}: reuses a {SHINGLE}-word run of reference copy: '{' '.join(toks[i:i + SHINGLE])}'")
                break
    for path, o in walk_objects(spec):
        if "assetRole" in o:
            r = o["assetRole"]
            av = PINNED_AVAILABILITY.get(r)
            if av != "generation-safe":
                add("GENERATED_MODE_ASSET", f"{path}: asset role '{r}' is {av or 'unknown'}; generated pages may only use generation-safe roles")
            if r in ("rating.source-review",):
                add("GENERATED_MODE_RATING", f"{path}: real review/rating asset")
            if r in ("store.source-badge",):
                add("GENERATED_MODE_STORE", f"{path}: store badge asset")
            if r in ("person.source-photo", "person.reference-portrait"):
                add("GENERATED_MODE_PERSON", f"{path}: real/reference person likeness")
        if {"name", "role", "fictional"} <= set(o) and o.get("fictional") is not True:
            add("GENERATED_MODE_PERSON", f"{path}: people on generated pages must be fictional (fictional=true)")

# ---- main -----------------------------------------------------------------------------------------
def validate(spec):
    errs, warns = [], []
    C = ctx()
    contracts, templates = C["contracts"], C["templates"]
    nodes = spec.get("nodes") or []
    tpl = templates.get(spec.get("template"))
    if not tpl:
        errs.append(("TEMPLATE_UNKNOWN", f"template '{spec.get('template')}' not in templates.json"))
        return errs, warns
    known_nodes = [nd for nd in nodes if nd.get("type") in contracts]
    for nd in nodes:
        if nd.get("type") not in contracts:
            errs.append(("SECTION_UNKNOWN", f"node '{nd.get('id')}' type '{nd.get('type')}' has no section contract"))
    ids = [nd.get("id") for nd in nodes]
    for d in sorted({x for x in ids if ids.count(x) > 1}):
        errs.append(("NODE_ID_DUPLICATE", f"node id '{d}' is used more than once"))
    # OVERLAY_NOT_A_NODE (pinned)
    for nd in nodes:
        t = nd.get("type")
        if t in RETRIEVAL_INELIGIBLE or (t in contracts and contracts[t]["retrievalEligible"] is False):
            errs.append(("OVERLAY_NOT_A_NODE", f"node '{nd.get('id')}' uses runtime UI section {t} (retrievalEligible=false)"))
        if t in contracts and (t in RETRIEVAL_INELIGIBLE) != (contracts[t]["retrievalEligible"] is False):
            errs.append(("RETRIEVAL_PIN_DRIFT", f"{t}: contract retrievalEligible disagrees with the pinned RETRIEVAL_INELIGIBLE set"))
    match_template(nodes, tpl, errs)
    # route
    if spec.get("mode") == "reference":
        if not any(r["template"] == tpl["id"] and route_matches(r["route"], spec.get("route", "")) for r in C["routes"]):
            errs.append(("ROUTE_TEMPLATE_MISMATCH", f"reference route '{spec.get('route')}' is not a mounted route of template '{tpl['id']}'"))
    cat_of = lambda nd: contracts[nd["type"]]["semantic"]["category"]
    # SHELL_POSITION
    if not nodes or nodes[0].get("type") != "shell.site-header":
        errs.append(("SHELL_POSITION", "first node must be shell.site-header"))
    if not nodes or nodes[-1].get("type") != "shell.site-footer":
        errs.append(("SHELL_POSITION", "last node must be shell.site-footer"))
    body = [nd for nd in known_nodes if cat_of(nd) != "SHELL"]
    heroes = [nd for nd in body if cat_of(nd) == "HERO"]
    if len(heroes) > 1:
        errs.append(("ONE_HERO", f"{len(heroes)} HERO nodes: {[h['id'] for h in heroes]}"))
    if not heroes and not tpl.get("heroless"):
        errs.append(("ONE_HERO", f"template '{tpl['id']}' expects a HERO node (only heroless templates may omit it)"))
    if heroes:
        allowed_before = set(tpl.get("heroAfter", []))
        for nd in body:
            if nd is heroes[0]:
                break
            if nd["type"] not in allowed_before:
                errs.append(("HERO_FIRST", f"node '{nd['id']}' precedes the HERO"))
                break
    for nd in known_nodes:
        c = contracts[nd["type"]]; k = c["constraints"]
        if k.get("homeRouteOnly") and spec.get("route") != "/":
            errs.append(("HOME_ROUTE_ONLY", f"{nd['type']} is only allowed on route '/'"))
    for t in sorted({nd["type"] for nd in known_nodes}):
        k = contracts[t]["constraints"]; cnt = sum(1 for nd in known_nodes if nd["type"] == t)
        lim = 1 if k.get("onePerPage") else k.get("maxPerPage")
        if lim is not None and cnt > lim:
            errs.append(("ONE_PER_PAGE", f"{t} appears {cnt} times (max {lim})"))
    g = C["graph"]["rules"]
    adj = next(r for r in g if r["id"] == "NO_ADJACENT_SAME_CATEGORY")
    pairs = {tuple(p) for p in adj["allowedPairs"]}
    for a, b in zip(body, body[1:]):
        if (a["type"], a.get("variant")) == (b["type"], b.get("variant")) and not contracts[a["type"]]["constraints"].get("repeatable"):
            errs.append(("NO_CONSECUTIVE_SAME_SECTION", f"'{a['id']}' and '{b['id']}' are the same section back to back"))
        ca, cb = cat_of(a), cat_of(b)
        if ca == cb and ca not in adj["allowedCategories"] and (a["type"], b["type"]) not in pairs:
            warns.append(("NO_ADJACENT_SAME_CATEGORY", f"'{a['id']}' and '{b['id']}' are both {ca}"))
    for i, nd in enumerate(known_nodes):
        if contracts[nd["type"]]["constraints"].get("mustPrecedeFooter") and (i + 1 >= len(known_nodes) or known_nodes[i + 1]["type"] != "shell.site-footer"):
            warns.append(("MUST_PRECEDE_FOOTER", f"'{nd['id']}' should sit directly before the footer"))
    for i, nd in enumerate(known_nodes):
        prev = known_nodes[i - 1]["type"] if i else None
        if nd["type"] == "features.developer-platform" and prev != "features.context-horizon":
            errs.append(("DARK_STACK_ORDER", f"'{nd['id']}' must directly follow features.context-horizon"))
        if nd["type"] == "testimonial.quote" and nd.get("variant") == "scroll-curtain" and prev not in ("features.developer-platform", "features.context-horizon"):
            errs.append(("CURTAIN_NEEDS_DARK_STACK", f"'{nd['id']}' (scroll-curtain) must directly follow the dark stack"))
    for grp, head in (("pricing.comparison-group", "pricing.comparison-header"), ("listing.directory-category", "listing.directory-header"), ("content.article-chapter", None)):
        idx = [i for i, nd in enumerate(known_nodes) if nd["type"] == grp]
        if idx:
            if head and not any(nd["type"] == head for nd in known_nodes[:idx[0]]):
                errs.append(("GROUP_NEEDS_HEADER", f"{grp} requires {head} before it"))
            if idx != list(range(idx[0], idx[0] + len(idx))):
                errs.append(("GROUP_NEEDS_HEADER", f"{grp} nodes must be contiguous"))
    loops = [nd["id"] for nd in known_nodes if set(nd.get("motion", {}).get("patterns", [])) & CONTINUOUS_MOTION]
    if len(loops) > MOTION_BUDGET_MAX:
        warns.append(("MOTION_BUDGET", f"{len(loops)} nodes with continuous motion (max {MOTION_BUDGET_MAX}): {loops}"))
    # per-node content, motion, assets, style
    for nd in known_nodes:
        c = contracts[nd["type"]]
        v = nd.get("variant")
        if c.get("variants"):
            if v not in c["variants"]:
                errs.append(("VARIANT_UNKNOWN", f"node '{nd['id']}' variant '{v}' not in {c['variants']}"))
            for f in c.get("variantRequirements", {}).get(v, []):
                if f not in (nd.get("content") or {}):
                    errs.append(("VARIANT_FIELDS", f"node '{nd['id']}' variant '{v}' requires content.{f}"))
        elif v is not None:
            errs.append(("VARIANT_UNKNOWN", f"node '{nd['id']}' {nd['type']} has no variants"))
        m = nd.get("motion") or {}
        if "reducedMotionFallback" not in m:
            errs.append(("MOTION_MISSING_FALLBACK", f"node '{nd['id']}' motion has no reducedMotionFallback"))
        elif m["reducedMotionFallback"] != c["motion"]["reducedMotionFallback"]:
            errs.append(("MOTION_FALLBACK_MISMATCH", f"node '{nd['id']}' fallback '{m['reducedMotionFallback']}' != contract '{c['motion']['reducedMotionFallback']}'"))
        for p in m.get("patterns", []):
            if p not in c["motion"]["allowedPatterns"]:
                errs.append(("MOTION_PATTERN_NOT_ALLOWED", f"node '{nd['id']}' motion pattern '{p}' not allowed for {nd['type']}"))
        extra = set(m) - {"patterns", "reducedMotionFallback"}
        if extra:
            errs.append(("MOTION_UNKNOWN_FIELD", f"node '{nd['id']}' motion has unknown field(s) {sorted(extra)}"))
        slots = []
        check_words(nd.get("content"), c["content"], f"{nd['id']}.content", errs, slots)
        for path, role, allowed in slots:
            if role not in PINNED_AVAILABILITY:
                errs.append(("ASSET_ROLE_UNKNOWN", f"{path}: asset role '{role}' is not in the closed vocabulary"))
            elif allowed and role not in allowed:
                errs.append(("ASSET_ROLE_NOT_ALLOWED_FOR_FIELD", f"{path}: role '{role}' not allowed here ({allowed})"))
            elif PINNED_AVAILABILITY[role] == "blocked-for-generation" and spec.get("mode") != "generated":
                warns.append(("ASSET_BLOCKED", f"{path}: role '{role}' is blocked-for-generation; never ship it"))
        check_style(nd, c, errs)
    # page-level word budgets
    for k, m in (("title", 10), ("description", 30)):
        s = (spec.get("meta") or {}).get(k)
        if isinstance(s, str) and words(s) > m:
            errs.append(("MAX_WORDS", f"meta.{k}: {words(s)} words > {m}"))
    # raw colours anywhere outside URL fields
    for path, s in walk_strings(spec):
        if path.rsplit(".", 1)[-1] in URL_KEYS or s.startswith("http"):
            continue
        if path.endswith(".style.surface"):
            continue
        if RAW_COLOR.search(s):
            errs.append(("TOKEN_RAW_COLOR", f"{path}: raw colour literal in '{s[:40]}'"))
    # registry pins
    for rid, r in C["roles"].items():
        if PINNED_AVAILABILITY.get(rid) != r.get("availability"):
            errs.append(("ASSET_REGISTRY_DRIFT", f"asset-roles.json availability for {rid} ('{r.get('availability')}') disagrees with the pin ('{PINNED_AVAILABILITY.get(rid)}')"))
    if spec.get("mode") == "generated":
        check_generated(spec, errs)
    return errs, warns

def validate_schema(spec):
    try:
        import jsonschema
    except ImportError:
        return ["SCHEMA_LAYER_UNAVAILABLE: install jsonschema to run the Draft-07 layer"]
    schema = _load("schema/pagespec.schema.json")
    v = jsonschema.Draft7Validator(schema)
    return [f"{'/'.join(map(str, e.absolute_path)) or '$'}: {e.message[:200]}" for e in sorted(v.iter_errors(spec), key=lambda e: list(map(str, e.absolute_path)))]

def main(argv):
    sem_only = "--semantic-only" in argv
    files = [a for a in argv if not a.startswith("--")]
    if not files:
        print(__doc__); return 2
    bad = 0
    for f in files:
        with open(f) as fh:
            spec = json.load(fh)
        se = [] if sem_only else validate_schema(spec)
        errs, warns = validate(spec)
        status = "PASS" if not se and not errs else "FAIL"
        bad += status == "FAIL"
        print(f"{status}  {os.path.relpath(f)}  mode={spec.get('mode')} template={spec.get('template')}  schema_errors={len(se)} semantic_errors={len(errs)} warnings={len(warns)}")
        for m in se[:20]:
            print(f"   SCHEMA  {m}")
        for c, m in errs:
            print(f"   {c}  {m}")
        for c, m in warns:
            print(f"   warn {c}  {m}")
    return 1 if bad else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
