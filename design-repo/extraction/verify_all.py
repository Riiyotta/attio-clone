#!/usr/bin/env python3
"""One-shot verification of the design-repo. Exit 1 on any FAIL.

    python3 extraction/verify_all.py

Checks (each prints PASS/FAIL/WARN with evidence):
  self-containment   entryPoints exist inside the repo; no absolute machine paths; no junk files
  json               every *.json parses
  schema             Draft-07 check_schema for both schemas; every section contract and every example validates
  semantic           every example passes schema/semantic_validate.py with zero errors
  allowlist-parity   tokens/llm/component-allowlist.json <-> sections/, components/, primitives/, schema node
                     properties, asset roles, motion patterns; allowlistVersion == manifest
  citations          every path:line-line citation resolves in the sibling source tree (repo/..) and stays in
                     range; for {file, tag, lines} objects the tag text is on the cited start line. WARN-only
                     when the sibling source tree is absent (standalone copy).
  contracts          semantic.id == id == filename, source.id != semantic.id, retrieval pins
                     (RETRIEVAL_INELIGIBLE), runtime-UI name heuristic, motion fallbacks, asset roles, maxWords
                     on every text field
  asset-pins         assets/asset-roles.json == PINNED_AVAILABILITY here == PINNED_AVAILABILITY in the semantic
                     validator; pinned generationPolicy values; substitutes are generation-safe
  tokens             token-catalog.json == recomputation from tokens/00-foundation + 10-semantic + 30-layout;
                     token-policy.json references resolve; catalog/policy versions; drift vs the sibling
                     token file (tailwind config, via node) when present
  routes             templates/routes.json == the sibling route table (src/App.jsx ROUTES) when present; every
                     route mapped exactly once; template node sections exist
  graph-parity       compatibility/graph.json rule ids == semantic_validate.GRAPH_RULE_IDS
  counts             registry.manifest.json counts and README counts block recomputed from disk
  wrapper-gate       extraction/wrapper_gate.py (R9) has zero errors
  generated-examples a generation-safe example exists for home and for at least one non-home template family
"""
import glob, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SRC_ROOT = os.path.dirname(REPO)          # the clone project that contains design-repo/ (optional)
sys.path.insert(0, os.path.join(REPO, "schema"))
sys.path.insert(0, HERE)
import semantic_validate as SV            # noqa: E402
import wrapper_gate                       # noqa: E402

PINNED_AVAILABILITY = {
    "brand.source-wordmark": "blocked-for-generation", "brand.reference-wordmark": "reference-only",
    "brand.placeholder-mark": "generation-safe", "brand.user-supplied-mark": "generation-safe",
    "logo.source-customer": "blocked-for-generation", "logo.reference-company": "reference-only",
    "logo.fictional-company": "generation-safe", "logo.third-party-app": "blocked-for-generation",
    "icon.generated-app": "generation-safe", "icon.stroke-ui": "generation-safe",
    "product.source-screenshot": "blocked-for-generation", "product.reference-mock": "reference-only",
    "product.generated-visual": "generation-safe", "person.source-photo": "blocked-for-generation",
    "person.reference-portrait": "reference-only", "person.fictional-portrait": "generation-safe",
    "avatar.abstract": "generation-safe", "illustration.reference-art": "reference-only",
    "illustration.generated-abstract": "generation-safe", "illustration.decorative-pattern": "generation-safe",
    "media.source-video": "blocked-for-generation", "media.video-placeholder": "generation-safe",
    "rating.source-review": "blocked-for-generation", "rating.placeholder": "generation-safe",
    "store.source-badge": "blocked-for-generation", "store.placeholder-badge": "generation-safe",
    "chart.illustrative": "generation-safe", "url.placeholder": "generation-safe", "copy.original": "generation-safe",
}
RETRIEVAL_INELIGIBLE = {"overlay.search-dialog", "overlay.gallery-lightbox", "overlay.mobile-nav-drawer"}
RUNTIME_UI = re.compile(r"overlay|modal|dialog|drawer|cookie|consent|toast|lightbox|preloader|cursor|popover|tooltip", re.I)
ABS_PATH = re.compile(r"/Users/[A-Za-z0-9._-]+/|/home/[A-Za-z0-9._-]+/|[A-Za-z]:\\Users\\|/private/(tmp|var)/")
CITE = re.compile(r"((?:src|public)/[A-Za-z0-9_./-]+\.(?:jsx|js|css|html)|tailwind\.config\.cjs|index\.html|package\.json):(\d+)-(\d+)")

RESULTS = []
def rec(check, ok, msg, warn=False):
    RESULTS.append((check, "WARN" if (warn and ok) else ("PASS" if ok else "FAIL"), msg))

def load(rel):
    with open(os.path.join(REPO, rel)) as f:
        return json.load(f)

def files(pattern):
    return sorted(glob.glob(os.path.join(REPO, pattern), recursive=True))

def rel(p):
    return os.path.relpath(p, REPO)

SIBLING = os.path.isdir(os.path.join(SRC_ROOT, "src")) and os.path.isfile(os.path.join(SRC_ROOT, "src", "App.jsx"))

# ------------------------------------------------------------------------------------------------
def check_self_containment(man):
    eps = []
    def coll(v):
        if isinstance(v, str): eps.append(v)
        elif isinstance(v, list): [coll(x) for x in v]
        elif isinstance(v, dict): [coll(x) for x in v.values()]
    coll(man.get("entryPoints", {}))
    bad = [e for e in eps if e.startswith("..") or os.path.isabs(e) or not os.path.exists(os.path.join(REPO, e))]
    rec("self-containment", not bad, f"{len(eps)} entryPoints, all inside the repo and present" if not bad else f"outside/missing: {bad[:5]}")
    hits = []
    for p in files("**/*"):
        if os.path.isfile(p) and not p.endswith((".zip",)):
            try:
                t = open(p, encoding="utf-8").read()
            except UnicodeDecodeError:
                continue
            for m in ABS_PATH.finditer(t):
                line = t[:m.start()].count("\n") + 1
                ctx_line = t.split("\n")[line - 1]
                if "ABS_PATH = re.compile" in ctx_line or "re.search(r\"/Users" in ctx_line or "/Users/[A-Za-z0-9._-]+/|" in ctx_line:
                    continue
                hits.append(f"{rel(p)}:{line}")
    rec("no-absolute-paths", not hits, "no absolute machine paths" if not hits else f"found: {hits[:5]}")
    junk = [rel(p) for p in files("**/*") if os.path.basename(p) in (".DS_Store", "Thumbs.db", "desktop.ini") or "__MACOSX" in p or "__pycache__" in p]
    junk += [rel(p) for p in glob.glob(os.path.join(REPO, "**/.DS_Store"), recursive=True)]
    rec("no-junk-files", not junk, "no __MACOSX/.DS_Store/__pycache__" if not junk else f"junk: {sorted(set(junk))[:5]}")

def check_json():
    bad = []
    for p in files("**/*.json"):
        try:
            json.load(open(p))
        except Exception as e:
            bad.append(f"{rel(p)}: {e}")
    rec("json", not bad, f"{len(files('**/*.json'))} JSON files parse" if not bad else bad[:5])

def check_schema(contracts, examples):
    try:
        import jsonschema
    except ImportError:
        rec("schema", False, "jsonschema not installed: Draft-07 layer cannot run (pip install jsonschema)")
        return
    ps, cs = load("schema/pagespec.schema.json"), load("schema/section-contract.schema.json")
    jsonschema.Draft7Validator.check_schema(ps); jsonschema.Draft7Validator.check_schema(cs)
    cv = jsonschema.Draft7Validator(cs)
    bad = []
    for sid, c in contracts.items():
        for e in cv.iter_errors(c):
            bad.append(f"{sid}: {'/'.join(map(str, e.absolute_path))}: {e.message[:120]}")
        try:
            jsonschema.Draft7Validator.check_schema(c["content"])
        except Exception as e:
            bad.append(f"{sid}: content is not a valid Draft-07 schema: {str(e)[:120]}")
    rec("schema-contracts", not bad, f"{len(contracts)} section contracts valid against schema/section-contract.schema.json" if not bad else bad[:5])
    pv = jsonschema.Draft7Validator(ps)
    errs = {rel(p): [e.message[:160] for e in pv.iter_errors(s)] for p, s in examples}
    n = sum(len(v) for v in errs.values())
    rec("schema-examples", n == 0, f"{len(examples)} example PageSpecs, 0 Draft-07 errors" if n == 0 else {k: v[:3] for k, v in errs.items() if v})
    pv_ver = ps["properties"]["pageSpecVersion"]["const"]
    man = load("registry.manifest.json")
    rec("pagespec-version", man["pageSpecVersion"] == pv_ver, f"manifest pageSpecVersion {man['pageSpecVersion']} == schema const {pv_ver}")

def check_semantic(examples):
    out = []
    for p, s in examples:
        e, w = SV.validate(s)
        if e:
            out.append(f"{rel(p)}: {e[:3]}")
    rec("semantic-examples", not out, f"{len(examples)} examples, 0 semantic errors" if not out else out)

def check_allowlist(contracts, man):
    al = load("tokens/llm/component-allowlist.json")
    problems = []
    al_ids = {s["id"] for s in al["sections"]}
    if al_ids - set(contracts): problems.append(f"phantom allowlist sections: {sorted(al_ids - set(contracts))}")
    if set(contracts) - al_ids: problems.append(f"contracts missing from allowlist: {sorted(set(contracts) - al_ids)}")
    for s in al["sections"]:
        c = contracts.get(s["id"])
        if c and (s["retrievalEligible"] != c["retrievalEligible"] or s["category"] != c["semantic"]["category"] or s.get("variants") != c.get("variants")):
            problems.append(f"allowlist entry {s['id']} disagrees with its contract (retrievalEligible/category/variants)")
        if (s["id"] in RETRIEVAL_INELIGIBLE) != (s["retrievalEligible"] is False):
            problems.append(f"allowlist {s['id']} retrievalEligible={s['retrievalEligible']} violates the pinned RETRIEVAL_INELIGIBLE set")
    for kind in ("components", "primitives"):
        disk = {f"{kind[:-1]}.{os.path.splitext(os.path.basename(p))[0]}" for p in files(f"{kind}/*.json")}
        if set(al[kind]) != disk:
            problems.append(f"{kind}: phantom {sorted(set(al[kind]) - disk)} orphan {sorted(disk - set(al[kind]))}")
        for p in files(f"{kind}/*.json"):
            d = json.load(open(p))
            if d["id"] != f"{kind[:-1]}.{os.path.splitext(os.path.basename(p))[0]}":
                problems.append(f"{rel(p)} id mismatch")
            for u in d.get("composes", []):
                if u not in set(al["components"]) | set(al["primitives"]):
                    problems.append(f"{rel(p)} composes unknown {u}")
    ps = load("schema/pagespec.schema.json")
    if sorted(ps["definitions"]["node"]["properties"]) != sorted(al["nodeProperties"]):
        problems.append(f"nodeProperties {al['nodeProperties']} != schema node properties {sorted(ps['definitions']['node']['properties'])}")
    if sorted(ps["properties"]) != sorted(al["pageSpecProperties"]):
        problems.append("pageSpecProperties != schema properties")
    if sorted(ps["definitions"]["style"]["properties"]) != sorted(al["styleFields"]):
        problems.append("styleFields != schema style properties")
    if sorted(ps["definitions"]["node"]["properties"]["type"]["enum"]) != sorted(contracts):
        problems.append("schema node type enum != section contracts")
    roles = [r["id"] for r in load("assets/asset-roles.json")["roles"]]
    if sorted(al["assetRoles"]) != sorted(roles) or sorted(ps["definitions"]["media"]["properties"]["assetRole"]["enum"]) != sorted(roles):
        problems.append("assetRoles: allowlist / schema enum / asset-roles.json disagree")
    mp = [p["id"] for p in load("tokens/00-foundation/motion-patterns.json")["patterns"]]
    if sorted(al["motionPatterns"]) != sorted(mp):
        problems.append("motionPatterns: allowlist != motion-patterns.json")
    if man["allowlistVersion"] != al["version"]:
        problems.append(f"allowlistVersion {man['allowlistVersion']} != allowlist version {al['version']}")
    for sid, c in contracts.items():
        for u in c.get("composes", []):
            if u not in set(al["components"]) | set(al["primitives"]):
                problems.append(f"section {sid} composes unknown {u}")
    rec("allowlist-parity", not problems, f"{len(al_ids)} sections, {len(al['components'])} components, {len(al['primitives'])} primitives, node/style/asset/motion vocabularies in parity; allowlistVersion {al['version']}" if not problems else problems[:6])

def iter_citations():
    """Yield (where, file, start, end, tag|None) for every citation in the repo."""
    for p in files("**/*.json"):
        if p.endswith("reference-copy-corpus.json"):
            continue
        d = json.load(open(p))
        def walk(o, path):
            if isinstance(o, dict):
                if {"file", "tag", "lines"} <= set(o):
                    s, e = map(int, o["lines"].split("-"))
                    yield (f"{rel(p)}{path}", o["file"], s, e, o["tag"])
                    if o.get("citation") and o["citation"] != f"{o['file']}:{o['lines']}":
                        yield (f"{rel(p)}{path}.citation", o["file"], -1, -1, "__MISMATCH__")
                    return
                for k, v in o.items():
                    yield from walk(v, f"{path}.{k}")
            elif isinstance(o, list):
                for i, v in enumerate(o):
                    yield from walk(v, f"{path}[{i}]")
            elif isinstance(o, str):
                for m in CITE.finditer(o):
                    yield (f"{rel(p)}{path}", m.group(1), int(m.group(2)), int(m.group(3)), None)
        yield from walk(d, "")

def check_citations():
    cites = list(iter_citations())
    if not SIBLING:
        rec("citations", True, f"{len(cites)} citations found; sibling source tree absent (standalone copy), range/tag checks skipped", warn=True)
        return
    bad, cache = [], {}
    for where, f, s, e, tag in cites:
        if tag == "__MISMATCH__":
            bad.append(f"{where}: citation string disagrees with file/lines"); continue
        fp = os.path.join(SRC_ROOT, f)
        if not os.path.isfile(fp):
            bad.append(f"{where}: {f} does not exist"); continue
        if f not in cache:
            cache[f] = open(fp, encoding="utf-8").read().split("\n")
        L = cache[f]
        if s < 1 or e < s or e > len(L):
            bad.append(f"{where}: {f}:{s}-{e} out of range (file has {len(L)} lines)"); continue
        if tag is not None and tag not in L[s - 1]:
            bad.append(f"{where}: tag {tag!r} not on {f}:{s}")
    rec("citations", not bad, f"{len(cites)} citations resolve in range against the sibling source; every tagged citation has its tag on the cited start line" if not bad else bad[:8])

def check_contracts(contracts):
    problems = []
    roles = {r["id"]: r for r in load("assets/asset-roles.json")["roles"]}
    mp = {p["id"]: p for p in load("tokens/00-foundation/motion-patterns.json")["patterns"]}
    def text_fields_without_maxwords(s, path=""):
        out = []
        if isinstance(s, dict):
            if s.get("type") == "string" and "enum" not in s and "maxWords" not in s:
                out.append(path)
            for k, v in s.items():
                if isinstance(v, (dict, list)):
                    out += text_fields_without_maxwords(v, f"{path}.{k}")
        elif isinstance(s, list):
            for i, v in enumerate(s):
                out += text_fields_without_maxwords(v, f"{path}[{i}]")
        return out
    for p in files("sections/*.json"):
        c = json.load(open(p)); sid = c["id"]
        if os.path.splitext(os.path.basename(p))[0] != sid: problems.append(f"{rel(p)}: filename != id")
        if c["semantic"]["id"] != sid: problems.append(f"{sid}: semantic.id != id")
        if c["source"]["id"] == c["semantic"]["id"]: problems.append(f"{sid}: source.id must differ from semantic.id")
        pinned_false = sid in RETRIEVAL_INELIGIBLE
        if pinned_false != (c["retrievalEligible"] is False):
            problems.append(f"{sid}: retrievalEligible={c['retrievalEligible']} contradicts RETRIEVAL_INELIGIBLE pin")
        if RUNTIME_UI.search(sid + " " + c["title"]) and not pinned_false:
            problems.append(f"{sid}: looks like runtime UI but is not in the RETRIEVAL_INELIGIBLE pin")
        if c["retrievalEligible"] is False and len(c.get("retrievalIneligibleReason", "")) < 30:
            problems.append(f"{sid}: retrievalIneligibleReason must be >= 30 chars")
        fbs = {mp[x]["reducedMotionFallback"] for x in c["motion"]["allowedPatterns"] if x in mp}
        if set(c["motion"]["allowedPatterns"]) - set(mp): problems.append(f"{sid}: unknown motion pattern")
        if c["motion"]["reducedMotionFallback"] not in fbs: problems.append(f"{sid}: fallback not one of its patterns' fallbacks")
        for sl in c["assetSlots"]:
            for r in sl["assetRoles"]:
                if r not in roles: problems.append(f"{sid}: unknown asset role {r}")
        for r in c["generatedAssetRoles"]:
            if PINNED_AVAILABILITY.get(r) != "generation-safe": problems.append(f"{sid}: generatedAssetRoles has non-generation-safe {r}")
        missing = text_fields_without_maxwords(c["content"])
        if missing: problems.append(f"{sid}: text fields without maxWords {missing[:3]}")
    for sid in RETRIEVAL_INELIGIBLE:
        if sid not in contracts: problems.append(f"pinned overlay {sid} has no contract")
    if set(SV.RETRIEVAL_INELIGIBLE) != RETRIEVAL_INELIGIBLE:
        problems.append("RETRIEVAL_INELIGIBLE pin differs between verify_all.py and semantic_validate.py")
    n_false = sum(1 for c in contracts.values() if not c["retrievalEligible"])
    rec("contracts", not problems, f"{len(contracts)} contracts: ids, source/semantic split, retrieval pins ({n_false} ineligible), motion fallbacks, asset roles, maxWords on every text field" if not problems else problems[:8])

def check_asset_pins():
    ar = load("assets/asset-roles.json")
    problems = []
    reg = {r["id"]: r for r in ar["roles"]}
    if set(reg) != set(PINNED_AVAILABILITY): problems.append(f"registry roles != verify_all pins: {sorted(set(reg) ^ set(PINNED_AVAILABILITY))}")
    if SV.PINNED_AVAILABILITY != PINNED_AVAILABILITY: problems.append(f"semantic_validate PINNED_AVAILABILITY != verify_all PINNED_AVAILABILITY: {sorted(set(SV.PINNED_AVAILABILITY.items()) ^ set(PINNED_AVAILABILITY.items()))}")
    for rid, r in reg.items():
        if r["availability"] not in ar["availabilityEnum"]: problems.append(f"{rid}: availability not in closed enum")
        if PINNED_AVAILABILITY.get(rid) != r["availability"]: problems.append(f"{rid}: registry availability '{r['availability']}' != pin '{PINNED_AVAILABILITY.get(rid)}'")
        if rid in SV.PINNED_POLICY and r["generationPolicy"] != SV.PINNED_POLICY[rid]: problems.append(f"{rid}: generationPolicy '{r['generationPolicy']}' != pinned '{SV.PINNED_POLICY[rid]}'")
        if r["availability"] != "generation-safe":
            subs = r.get("generationSafeSubstitutes") or []
            if not subs: problems.append(f"{rid}: non-generation-safe role without generationSafeSubstitutes")
            for s in subs:
                if PINNED_AVAILABILITY.get(s) != "generation-safe": problems.append(f"{rid}: substitute {s} is not generation-safe")
        if rid.startswith("brand.") and "wordmark" in rid and r["generationPolicy"] == "must-reuse-exact": problems.append(f"{rid}: a real wordmark may never be must-reuse-exact")
    lic = ar.get("licensing", {}).get("rule", "")
    if not re.search(r"logos", lic) or not re.search(r"photos", lic) or "never be reproduced" not in lic:
        problems.append("licensing rule must explicitly forbid reproducing real logos, photos and proprietary content")
    rec("asset-pins", not problems, f"{len(reg)} roles; availability pinned identically in verify_all.py and semantic_validate.py; {len(SV.PINNED_POLICY)} pinned policies; substitutes generation-safe" if not problems else problems[:6])

def recompute_catalog():
    found = {}
    col = load("tokens/00-foundation/color.json")["tokens"]
    for k, v in col.items(): found[k] = ("color", v["value"])
    for k, v in load("tokens/10-semantic/semantic.json")["tokens"].items(): found[k] = ("color", {m: x["ref"] for m, x in v.items()})
    ty = load("tokens/00-foundation/typography.json")
    for k, v in ty["fontFamily"].items(): found[k] = ("fontFamily", v["value"])
    for k, v in ty["fontSize"].items(): found[k] = ("fontSize", {x: v[x] for x in ("fontSize", "lineHeight", "letterSpacing", "fontWeight")})
    for f, t in (("radius", "radius"), ("elevation", "elevation"), ("spacing", "space"), ("breakpoint", "breakpoint"), ("gradient", "gradient")):
        for k, v in load(f"tokens/00-foundation/{f}.json")["tokens"].items(): found[k] = (t, v["value"])
    for k, v in load("tokens/00-foundation/motion.json")["easing"].items(): found[k] = ("easing", v["value"])
    return found, col

def check_tokens(man):
    problems, warns = [], []
    cat = load("tokens/llm/token-catalog.json"); pol = load("tokens/llm/token-policy.json")
    found, col = recompute_catalog()
    ct = cat["tokens"]
    for k, (t, v) in found.items():
        if k not in ct: problems.append(f"catalog missing {k}")
        elif ct[k]["type"] != t or ct[k]["value"] != v: problems.append(f"catalog {k} drifted from the foundation/semantic files")
    extra = set(ct) - set(found) - {k for k in ct if k.startswith("z.")}
    if extra: problems.append(f"catalog has tokens not in the token files: {sorted(extra)[:5]}")
    if cat["total"] != len(ct): problems.append("catalog total != number of tokens")
    from collections import Counter
    if dict(Counter(v["type"] for v in ct.values())) != cat["counts"]: problems.append("catalog counts by type are stale")
    approved = {k for k, v in ct.items() if v["approvedForPageSpec"]}
    referenced = set(sum(pol["themeSurfaces"].values(), [])) | set(pol["sectionRhythm"]) | set(pol["approvedFonts"])
    for k in referenced:
        if k not in ct: problems.append(f"policy references unknown token {k}")
    if approved != referenced: problems.append(f"approvedForPageSpec set != tokens referenced by token-policy ({sorted(approved ^ referenced)[:5]})")
    types = {v["type"] for v in ct.values()}
    for k in pol["rawValueRestrictions"]:
        if k not in types: problems.append(f"policy rawValueRestrictions key '{k}' is not a catalog type")
    for ref_mode in ("light", "dark"):
        th = load(f"tokens/themes/{ref_mode}.json")["tokens"]
        for k, v in th.items():
            if v["ref"] not in col or col[v["ref"]]["value"] != v["value"]: problems.append(f"theme {ref_mode} {k} does not resolve to its foundation value")
    if man["tokenCatalogVersion"] != cat["version"]: problems.append("tokenCatalogVersion != token-catalog version")
    rec("tokens", not problems, f"catalog of {len(ct)} tokens matches tokens/00-foundation + 10-semantic + layout; policy references resolve; {len(approved)} approved for PageSpecs; themes resolve" if not problems else problems[:6])
    # drift against the real token file (sibling)
    cfg = os.path.join(SRC_ROOT, "tailwind.config.cjs")
    if not SIBLING or not os.path.isfile(cfg):
        rec("tokens-vs-source", True, "sibling token file absent (standalone copy): source drift check skipped", warn=True); return
    try:
        out = subprocess.run(["node", "-e", f"console.log(JSON.stringify(require({json.dumps(cfg)})))"], capture_output=True, text=True, timeout=60)
        th = json.loads(out.stdout)["theme"]
    except Exception as e:
        rec("tokens-vs-source", True, f"node unavailable, source drift check skipped ({e})", warn=True); return
    drift = []
    for k, v in col.items():
        path = v["sourceKey"].split(".", 1)[1].split("-")
        cur = th["colors"].get(path[0]) if len(path) == 1 else (th["colors"].get(path[0]) or {}).get(path[1]) if isinstance(th["colors"].get(path[0]), dict) else th["colors"].get("-".join(path))
        if cur is None: cur = th["colors"].get("-".join(path))
        if cur != v["value"]: drift.append(f"{k}: repo {v['value']} vs source {cur}")
    ty = load("tokens/00-foundation/typography.json")["fontSize"]
    for k, v in ty.items():
        src = th["fontSize"].get(v["sourceKey"].split(".", 1)[1])
        if not src or src[0] != v["fontSize"] or src[1]["lineHeight"] != v["lineHeight"]: drift.append(f"{k}: drifted from source fontSize")
    for k, v in load("tokens/00-foundation/radius.json")["tokens"].items():
        if th["borderRadius"].get(v["sourceKey"].split(".", 1)[1]) != v["value"]: drift.append(f"{k}: drifted from source borderRadius")
    for k, v in load("tokens/00-foundation/elevation.json")["tokens"].items():
        if th["boxShadow"].get(v["sourceKey"].split(".", 1)[1]) != v["value"]: drift.append(f"{k}: drifted from source boxShadow")
    srcnames = {f"color.{a}.{b}" if isinstance(x, dict) else f"color.{a}" for a, x in th["colors"].items() if not (isinstance(x, str) and (x.startswith("var(") or a in ("transparent", "current", "inherit"))) for b in (x if isinstance(x, dict) else [None])}
    missing = sorted(srcnames - set(col))
    if missing: drift.append(f"source colours not in the repo: {missing[:5]}")
    rec("tokens-vs-source", not drift, f"{len(col)} colours, {len(ty)} type roles, radii and shadows equal the sibling token file" if not drift else drift[:6])

def check_routes(contracts):
    problems = []
    tpls = load("templates/templates.json")["templates"]
    routes = load("templates/routes.json")["routes"]
    seen = {}
    for r in routes:
        seen[r["route"]] = seen.get(r["route"], 0) + 1
        if r["template"] not in tpls: problems.append(f"{r['route']}: unknown template {r['template']}")
    dup = [k for k, v in seen.items() if v > 1]
    if dup: problems.append(f"routes mapped more than once: {dup}")
    for tid, t in tpls.items():
        if sorted(t["routes"]) != sorted(r["route"] for r in routes if r["template"] == tid): problems.append(f"template {tid} routes list != routes.json")
        for n in t["nodes"]:
            for sid in ([n["section"]] if "section" in n else n["allowedSections"]):
                if sid not in contracts: problems.append(f"template {tid} references unknown section {sid}")
                elif not contracts[sid]["retrievalEligible"]: problems.append(f"template {tid} places runtime UI {sid} as a node")
        for o in t.get("runtimeOverlays", []):
            if o not in RETRIEVAL_INELIGIBLE: problems.append(f"template {tid} runtimeOverlay {o} is not a pinned overlay")
    if SIBLING:
        app = open(os.path.join(SRC_ROOT, "src/App.jsx")).read()
        m = re.search(r"const ROUTES = \[(.*?)\n\]", app, re.S)
        live = re.findall(r"\['([^']+)',", m.group(1)) if m else []
        if sorted(live) != sorted(seen): problems.append(f"route table drift: source {sorted(live)} vs repo {sorted(seen)}")
        msg = f"{len(routes)} mounted routes mapped exactly once to {len(tpls)} templates; equal to the sibling route table"
    else:
        msg = f"{len(routes)} routes mapped exactly once to {len(tpls)} templates (sibling route table absent: drift check skipped)"
    rec("routes", not problems, msg if not problems else problems[:6])

def check_graph():
    g = load("compatibility/graph.json")
    ids = [r["id"] for r in g["rules"]]
    ok = sorted(ids) == sorted(SV.GRAPH_RULE_IDS) and all(r["severity"] in ("error", "warn") for r in g["rules"])
    rec("graph-parity", ok, f"{len(ids)} graph rules == semantic_validate.GRAPH_RULE_IDS, each with severity" if ok else f"graph {sorted(set(ids) ^ set(SV.GRAPH_RULE_IDS))}")

def recount(contracts):
    cat = load("tokens/llm/token-catalog.json")
    return {"tokens": len(cat["tokens"]), "primitives": len(files("primitives/*.json")), "components": len(files("components/*.json")),
            "sections": len(contracts), "retrievableSections": sum(1 for c in contracts.values() if c["retrievalEligible"]),
            "templates": len(load("templates/templates.json")["templates"]), "mountedRoutes": len(load("templates/routes.json")["routes"]),
            "pendingRoutes": len(load("templates/pending-routes.json")["routes"]), "assetRoles": len(load("assets/asset-roles.json")["roles"]),
            "motionPatterns": len(load("tokens/00-foundation/motion-patterns.json")["patterns"]),
            "examplePageSpecs": len(files("schema/example*.json")) + len(files("schema/examples/*.json"))}

def check_counts(man, contracts):
    real = recount(contracts)
    diff = {k: (man["counts"].get(k), v) for k, v in real.items() if man["counts"].get(k) != v}
    rec("manifest-counts", not diff, f"manifest counts == disk {real}" if not diff else f"stale (manifest, disk): {diff}")
    readme = open(os.path.join(REPO, "README.md")).read()
    m = re.search(r"<!-- counts:start -->(.*?)<!-- counts:end -->", readme, re.S)
    bad = []
    if not m:
        bad.append("README counts block missing")
    else:
        for k, v in real.items():
            mm = re.search(rf"\|\s*{k}\s*\|\s*(\d+)\s*\|", m.group(1))
            if not mm or int(mm.group(1)) != v: bad.append(f"{k}: README {mm.group(1) if mm else None} vs disk {v}")
    rec("readme-counts", not bad, "README counts block == disk" if not bad else bad[:5])

def check_gate():
    e, w = wrapper_gate.gate(REPO)
    rec("wrapper-gate", not e, f"0 errors, {len(w)} warnings (HERO >{wrapper_gate.HERO_WARN_PX}/{wrapper_gate.HERO_FAIL_PX}px, share >{wrapper_gate.SHARE_WARN:.0%}/{wrapper_gate.SHARE_FAIL:.0%}, viewport {wrapper_gate.REQUIRED_VIEWPORT})" if not e else e[:5])

def check_generated_examples(examples):
    gen = {s["template"] for p, s in examples if s.get("mode") == "generated"}
    ok = "home" in gen and len(gen - {"home"}) >= 1
    rec("generated-examples", ok, f"generation-safe examples for templates {sorted(gen)}" if ok else f"missing generated examples (have {sorted(gen)})")

def main():
    man = load("registry.manifest.json")
    contracts = {}
    for p in files("sections/*.json"):
        c = json.load(open(p)); contracts[c["id"]] = c
    examples = [(p, json.load(open(p))) for p in files("schema/example*.json") + files("schema/examples/*.json")]
    for fn in (lambda: check_self_containment(man), check_json, lambda: check_schema(contracts, examples), lambda: check_semantic(examples),
               lambda: check_allowlist(contracts, man), check_citations, lambda: check_contracts(contracts), check_asset_pins,
               lambda: check_tokens(man), lambda: check_routes(contracts), check_graph, lambda: check_counts(man, contracts), check_gate,
               lambda: check_generated_examples(examples)):
        try:
            fn()
        except Exception as e:
            rec(getattr(fn, "__name__", "check"), False, f"crashed: {type(e).__name__}: {e}")
    for c, r, m in RESULTS:
        print(f"{r:4}  {c:20} {m}")
    fails = sum(1 for _, r, _ in RESULTS if r == "FAIL")
    print(f"\nverify_all: {sum(1 for _, r, _ in RESULTS if r == 'PASS')} pass, {sum(1 for _, r, _ in RESULTS if r == 'WARN')} warn, {fails} fail"
          + ("" if SIBLING else "  (standalone: sibling source tree not present)"))
    return 1 if fails else 0

if __name__ == "__main__":
    sys.exit(main())
