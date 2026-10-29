#!/usr/bin/env python3
"""Adversarial suite: every mutation must be rejected with the expected rule, every control must pass.

    python3 schema/tests/adversarial_test.py

Layers exercised: Draft-07 schema (code SCHEMA), semantic validator (rule codes), wrapper gate (R9).
Controls: every bundled example PageSpec, one synthesized generated-mode PageSpec per template
(built generically from each template's own node list, so a new template is covered automatically),
and the real measured heights through the gate. Exit 1 if any mutation is accepted or any control fails.
"""
import copy, json, os, sys
sys.dont_write_bytecode = True

HERE = os.path.dirname(os.path.abspath(__file__))
SCHEMA_DIR = os.path.dirname(HERE)
REPO = os.path.dirname(SCHEMA_DIR)
sys.path.insert(0, SCHEMA_DIR)
sys.path.insert(0, os.path.join(REPO, "extraction"))
import semantic_validate as SV  # noqa: E402
import wrapper_gate as WG       # noqa: E402

def load(rel):
    with open(os.path.join(REPO, rel)) as f:
        return json.load(f)

def codes(spec):
    out = set()
    if SV.validate_schema(spec):
        out.add("SCHEMA")
    e, _ = SV.validate(spec)
    out |= {c for c, _ in e}
    return out

PASSED, FAILED = [], []
def expect_reject(name, spec, expected):
    got = codes(spec)
    hit = got & set(expected)
    (PASSED if hit else FAILED).append(name)
    print(f"{'ok  ' if hit else 'MISS'}  reject  {name:58} expected {sorted(expected)} got {sorted(got)[:6]}")

def expect_pass(name, spec):
    se = SV.validate_schema(spec)
    e, w = SV.validate(spec)
    ok = not se and not e
    (PASSED if ok else FAILED).append(name)
    print(f"{'ok  ' if ok else 'FAIL'}  control {name:58} schema_errors={len(se)} semantic_errors={len(e)} warnings={len(w)}" + ("" if ok else f"  {se[:2]} {e[:3]}"))

# ---- generic synthesis of a generation-safe control per template --------------------------------
CTX = SV.ctx()
CONTRACTS, TEMPLATES = CTX["contracts"], CTX["templates"]
WORDS = ["quillon", "marrowby", "sablefen", "otterkin", "vellum", "brisket", "cindral", "tamsin", "orrery", "plinth"]
_n = [0]
def text(maxw):
    _n[0] += 1
    k = max(1, min(3, maxw))
    return " ".join(WORDS[(_n[0] + i) % len(WORDS)] for i in range(k)).capitalize()

DEFS = load("schema/pagespec.schema.json")["definitions"]
def synth(schema, contract_variant_req=()):
    if "$ref" in schema:
        name = schema["$ref"].split("/")[-1]
        if name == "media":
            roles = schema.get("x-assetRoles") or ["illustration.generated-abstract"]
            role = next(r for r in roles if SV.PINNED_AVAILABILITY[r] == "generation-safe")
            return {"assetRole": role, "assetRef": "generate:sample artwork", "alt": "Sample image"}
        if name == "cta": return {"label": "Open sample", "href": "https://brand.example/start", "variant": "primary"}
        if name == "link": return {"label": "Sample link", "href": "https://brand.example/more"}
        if name == "url": return "https://brand.example/page"
        if name == "person": return {"name": "Rowan Vale", "role": "Sample role", "fictional": True}
        if name == "icon": return DEFS["icon"]["enum"][0]
    if "oneOf" in schema:
        return synth(schema["oneOf"][0])
    t = schema.get("type")
    if "enum" in schema: return schema["enum"][0]
    if t == "string": return text(schema.get("maxWords", 3))
    if t == "boolean": return True
    if t == "array": return [synth(schema["items"]) for _ in range(schema.get("minItems", 0))]
    if t == "object":
        req = list(schema.get("required", [])) + [f for f in contract_variant_req if f not in schema.get("required", [])]
        return {k: synth(schema["properties"][k]) for k in req}
    raise ValueError(schema)

def make_node(sid, variant, i):
    c = CONTRACTS[sid]
    vreq = c.get("variantRequirements", {}).get(variant, [])
    nd = {"id": f"n{i}", "type": sid}
    if variant: nd["variant"] = variant
    nd["content"] = synth(c["content"], vreq)
    nd["motion"] = {"patterns": [c["motion"]["allowedPatterns"][0]], "reducedMotionFallback": c["motion"]["reducedMotionFallback"]}
    return nd

def synth_page(tid):
    t = TEMPLATES[tid]
    nodes = []
    for tn in t["nodes"]:
        if "section" in tn:
            if tn["required"]:
                v = (tn.get("variants") or CONTRACTS[tn["section"]].get("variants") or [None])[0]
                nodes.append(make_node(tn["section"], v, len(nodes)))
        else:
            picked = 0
            for sid in tn["allowedSections"]:
                if picked >= tn["minItems"]: break
                v = (tn.get("allowedVariants", {}).get(sid) or CONTRACTS[sid].get("variants") or [None])[0]
                nodes.append(make_node(sid, v, len(nodes))); picked += 1
    mark = {"assetRole": "brand.placeholder-mark", "assetRef": "generate:neutral glyph", "alt": "Sample brand"}
    return {"pageSpecVersion": "1.2.0", "mode": "generated", "template": tid, "route": "/" if tid == "home" else f"/sample-{tid}",
            "brand": {"name": "Sample brand", "mark": mark, "fictional": True}, "meta": {"title": "Sample page", "description": "Synthesized control page."}, "nodes": nodes}

# ---- controls ----------------------------------------------------------------------------------
EX = {}
for p in sorted(os.listdir(os.path.join(REPO, "schema/examples"))):
    EX[p.split(".")[0]] = load(f"schema/examples/{p}")
EX["reference-home"] = load("schema/example.pagespec.json")
print("== controls")
for k, s in EX.items():
    expect_pass(f"example:{k}", s)
for tid in TEMPLATES:
    expect_pass(f"synth-generated:{tid}", synth_page(tid))

GH, GP, GD, RH = EX["generated-home"], EX["generated-program-landing"], EX["generated-app-detail"], EX["reference-home"]
def m(base, fn):
    s = copy.deepcopy(base); fn(s); return s
def node(s, t):
    return next(n for n in s["nodes"] if n["type"] == t)

print("== schema layer")
expect_reject("wrong enum: mode=draft", m(GH, lambda s: s.update(mode="draft")), ["SCHEMA"])
expect_reject("missing required field: meta", m(GH, lambda s: s.pop("meta")), ["SCHEMA"])
expect_reject("invented section type alias", m(GH, lambda s: s["nodes"][1].update(type="hero.invented")), ["SCHEMA", "SECTION_UNKNOWN"])
expect_reject("missing reducedMotionFallback", m(GH, lambda s: s["nodes"][1]["motion"].pop("reducedMotionFallback")), ["SCHEMA", "MOTION_MISSING_FALLBACK"])
expect_reject("invented motion field", m(GH, lambda s: s["nodes"][1]["motion"].update(inventedAnimation="spin")), ["SCHEMA", "MOTION_UNKNOWN_FIELD"])
expect_reject("wrong reducedMotionFallback value", m(GH, lambda s: s["nodes"][1]["motion"].update(reducedMotionFallback="hidden")), ["SCHEMA", "MOTION_FALLBACK_MISMATCH"])
expect_reject("motion pattern not allowed for section", m(GH, lambda s: s["nodes"][1]["motion"]["patterns"].append("ambient-streaks")), ["SCHEMA", "MOTION_PATTERN_NOT_ALLOWED"])
expect_reject("invented assetRole", m(GH, lambda s: node(s, "hero.product-window")["content"]["productVisual"].update(assetRole="image")), ["SCHEMA", "ASSET_ROLE_UNKNOWN"])
expect_reject("extra content property", m(GH, lambda s: node(s, "hero.product-window")["content"].update(sparkle="x")), ["SCHEMA"])
expect_reject("pageSpecVersion drift", m(GH, lambda s: s.update(pageSpecVersion="0.9.0")), ["SCHEMA"])
expect_reject("asset role not allowed for field", m(GH, lambda s: node(s, "social-proof.logo-wall")["content"]["logos"][0].update(assetRole="person.fictional-portrait")), ["SCHEMA", "ASSET_ROLE_NOT_ALLOWED_FOR_FIELD"])

print("== structure (template cross-reference + graph)")
expect_reject("declared template contradicts nodes (home nodes, template=pricing)", m(GH, lambda s: s.update(template="pricing")), ["TEMPLATE_MISSING_REQUIRED", "TEMPLATE_ORDER", "TEMPLATE_UNEXPECTED_NODE"])
expect_reject("required template node removed (platform showcase)", m(GH, lambda s: s["nodes"].remove(node(s, "features.platform-showcase"))), ["TEMPLATE_MISSING_REQUIRED"])
expect_reject("duplicate one-per-page hero", m(GH, lambda s: s["nodes"].insert(2, dict(copy.deepcopy(s["nodes"][1]), id="hero-2"))), ["ONE_HERO", "TEMPLATE_REPEAT_NOT_ALLOWED", "ONE_PER_PAGE"])
expect_reject("fixed-position sections reordered", m(GH, lambda s: s["nodes"].__setitem__(slice(2, 4), [s["nodes"][3], s["nodes"][2]])), ["TEMPLATE_ORDER", "TEMPLATE_MISSING_REQUIRED"])
expect_reject("footer not last", m(GH, lambda s: s["nodes"].append(s["nodes"].pop(-2))), ["SHELL_POSITION", "TEMPLATE_ORDER"])
expect_reject("home-only hero on another route", m(GH, lambda s: s.update(route="/landing")), ["HOME_ROUTE_ONLY"])
expect_reject("variant not allowed by template (logo grid on home)", m(GH, lambda s: node(s, "social-proof.logo-wall").update(variant="grid")), ["TEMPLATE_VARIANT_NOT_ALLOWED"])
expect_reject("variant-required field missing (expert-quotes without quotes)", m(GP, lambda s: node(s, "hero.page-centered")["content"].pop("quotes")), ["VARIANT_FIELDS"])
def curtain(s):
    q = {"id": "quote", "type": "testimonial.quote", "variant": "scroll-curtain", "content": {"quote": "Sample words for a quote.", "person": {"name": "Rowan Vale", "role": "Sample role", "fictional": True}}, "motion": {"patterns": ["word-reveal-scroll"], "reducedMotionFallback": CONTRACTS["testimonial.quote"]["motion"]["reducedMotionFallback"]}}
    s["nodes"].insert(4, q)
expect_reject("curtain quote without the dark stack", m(GH, curtain), ["CURTAIN_NEEDS_DARK_STACK"])
def devp(s):
    d = make_node("features.developer-platform", None, 99); d["id"] = "dev"
    s["nodes"].insert(4, d)
expect_reject("developer band without the context horizon", m(GH, devp), ["DARK_STACK_ORDER"])
expect_reject("runtime overlay placed as a node", m(GH, lambda s: s["nodes"].insert(2, dict(make_node("overlay.search-dialog", None, 98), id="dlg"))), ["OVERLAY_NOT_A_NODE"])
expect_reject("program body region below minimum", m(GP, lambda s: [s["nodes"].remove(node(s, t)) for t in ("features.step-list", "conversion.application-form")]), ["TEMPLATE_REGION_COUNT"])
expect_reject("reference page on a route its template does not serve", m(RH, lambda s: s.update(route="/pricing")), ["ROUTE_TEMPLATE_MISMATCH"])
def grp(s):
    s["nodes"] = [n for n in s["nodes"] if n["type"] != "pricing.comparison-header"]
    g = make_node("pricing.comparison-group", None, 97); g["id"] = "grp"
    s["nodes"].insert(len(s["nodes"]) - 1, g)
expect_reject("comparison group without its header", m(synth_page("pricing"), grp), ["GROUP_NEEDS_HEADER", "TEMPLATE_ORDER"])
def chap(s):
    i = next(i for i, n in enumerate(s["nodes"]) if n["type"] == "content.chapter-header")
    s["nodes"].insert(i, s["nodes"].pop(i + 1))
expect_reject("long-form prose before any chapter header", m(synth_page("architecture"), chap), ["CHAPTER_OPENS_BODY"])
expect_reject("duplicate node id", m(GH, lambda s: s["nodes"][2].update(id=s["nodes"][1]["id"])), ["NODE_ID_DUPLICATE"])

print("== runtime word budgets")
expect_reject("maxWords overflow: hero headline", m(GH, lambda s: node(s, "hero.product-window")["content"].update(headline="One two three four five six seven eight")), ["MAX_WORDS"])
expect_reject("maxWords overflow: nested FAQ answer", m(GP, lambda s: node(s, "faq.accordion")["content"]["items"][0].update(answer=" ".join(["word"] * 60))), ["MAX_WORDS"])
expect_reject("maxWords overflow: CTA label", m(GH, lambda s: node(s, "conversion.final-cta")["content"]["primaryCta"].update(label="Please book a long product walkthrough today")), ["MAX_WORDS"])

print("== generated-mode leakage (R2)")
expect_reject("source brand in copy", m(GH, lambda s: node(s, "hero.product-window")["content"].update(headline="Attio for crews")), ["GENERATED_MODE_BRAND"])
expect_reject("reference clone brand as page brand", m(GH, lambda s: s["brand"].update(name="Corvale")), ["GENERATED_MODE_BRAND"])
expect_reject("brand not marked fictional", m(GH, lambda s: s["brand"].update(fictional=False)), ["GENERATED_MODE_BRAND"])
expect_reject("source logo/wordmark asset role", m(GH, lambda s: s["brand"]["mark"].update(assetRole="brand.source-wordmark")), ["GENERATED_MODE_ASSET"])
expect_reject("reference company identity in alt text", m(GH, lambda s: node(s, "social-proof.logo-wall")["content"]["logos"][0].update(alt="Pellora logo")), ["GENERATED_MODE_BRAND"])
expect_reject("store mark + store URL", m(GH, lambda s: node(s, "conversion.final-cta")["content"]["primaryCta"].update(label="Get it on Google Play", href="https://play.google.com/store/apps/details")), ["GENERATED_MODE_STORE", "GENERATED_MODE_URL"])
expect_reject("store badge asset", m(GH, lambda s: node(s, "hero.product-window")["content"]["sideWindows"][0].update(assetRole="store.source-badge")), ["GENERATED_MODE_STORE", "GENERATED_MODE_ASSET", "SCHEMA"])
expect_reject("real review rating claim", m(GH, lambda s: node(s, "hero.product-window")["content"].update(subhead="Rated 4.9 out of 5 by crews on G2.")), ["GENERATED_MODE_RATING"])
expect_reject("real review asset", m(GH, lambda s: node(s, "hero.product-window")["content"]["sideWindows"][0].update(assetRole="rating.source-review")), ["GENERATED_MODE_RATING", "GENERATED_MODE_ASSET", "SCHEMA"])
expect_reject("reference person identity", m(GP, lambda s: node(s, "hero.page-centered")["content"]["quotes"][0]["person"].update(name="Mara Okonkwo")), ["GENERATED_MODE_PERSON"])
expect_reject("person not marked fictional", m(GP, lambda s: node(s, "hero.page-centered")["content"]["quotes"][0]["person"].update(fictional=False)), ["GENERATED_MODE_PERSON"])
expect_reject("real person photo asset", m(GH, lambda s: node(s, "hero.product-window")["content"]["sideWindows"][0].update(assetRole="person.source-photo")), ["GENERATED_MODE_PERSON", "GENERATED_MODE_ASSET", "SCHEMA"])
expect_reject("source domain URL", m(GH, lambda s: node(s, "hero.product-window")["content"]["primaryCta"].update(href="https://attio.com/pricing")), ["GENERATED_MODE_URL"])
expect_reject("non-placeholder domain", m(GH, lambda s: node(s, "hero.product-window")["content"]["primaryCta"].update(href="https://tarnwick.com/demo")), ["GENERATED_MODE_URL"])
expect_reject("third-party slug crawled from the source", m(GD, lambda s: node(s, "listing.related-apps")["content"]["apps"][0].update(href="/apps/slack")), ["GENERATED_MODE_URL"])
expect_reject("source-brand slug from a clone route", m(GH, lambda s: s["nodes"][-1]["content"]["columns"][0]["links"][0].update(href="/help/reference/attio-101")), ["GENERATED_MODE_URL"])
expect_reject("reference copy reused verbatim", m(GH, lambda s: node(s, "hero.product-window")["content"].update(subhead="A flexible workspace for modern teams to organize records, automate busy work, see what matters.")), ["GENERATED_MODE_COPY"])
expect_reject("original-site copy phrase", m(GH, lambda s: node(s, "social-proof.scale-stats")["content"]["heading"].update(lead="Powered by Universal Context.")), ["GENERATED_MODE_COPY"])
expect_reject("source CTA", m(GH, lambda s: node(s, "hero.product-window")["content"]["primaryCta"].update(label="Try Attio")), ["GENERATED_MODE_CTA"])
expect_reject("proprietary/reference media reuse (ref: assetRef)", m(GH, lambda s: node(s, "hero.product-window")["content"].update(productVisual={"assetRole": "product.reference-mock", "assetRef": "ref:src/components/Hero.jsx#main-window", "alt": "Board"})), ["GENERATED_MODE_ASSET"])
expect_reject("ref: assetRef behind a generation-safe role", m(GH, lambda s: node(s, "hero.product-window")["content"]["productVisual"].update(assetRef="ref:src/components/mock.jsx#Company")), ["GENERATED_MODE_ASSET"])

print("== new page families (editorial listing, changelog, help docs, long-form story): leakage + structure")
GE, GC, GHD, GA = EX["generated-editorial-listing"], EX["generated-changelog-year"], EX["generated-help-docs"], EX["generated-architecture"]
expect_reject("editorial row names the source brand", m(GE, lambda s: node(s, "editorial.article-index")["content"]["rows"][0].update(title="Why Attio ships every week")), ["GENERATED_MODE_BRAND"])
expect_reject("editorial featured author is a reference person", m(GE, lambda s: node(s, "hero.editorial-featured")["content"]["featured"]["author"].update(name="Mara Okonkwo")), ["GENERATED_MODE_PERSON"])
expect_reject("editorial featured author not fictional", m(GE, lambda s: node(s, "hero.editorial-featured")["content"]["featured"]["author"].update(fictional=False)), ["GENERATED_MODE_PERSON"])
expect_reject("editorial art uses reference-only artwork", m(GE, lambda s: node(s, "hero.editorial-featured")["content"]["featured"]["art"].update(assetRole="illustration.reference-art")), ["GENERATED_MODE_ASSET"])
expect_reject("editorial row links to the source domain", m(GE, lambda s: node(s, "editorial.article-index")["content"]["rows"][0].update(href="https://attio.com/blog/post")), ["GENERATED_MODE_URL"])
expect_reject("editorial art reuses a source file (ref: assetRef)", m(GE, lambda s: node(s, "hero.editorial-featured")["content"]["featured"]["art"].update(assetRef="ref:src/components/blog/BlogArt.jsx")), ["GENERATED_MODE_ASSET"])
expect_reject("changelog entry copies the source's phrasing", m(GC, lambda s: node(s, "editorial.changelog-entries")["content"]["entries"][0].update(excerpt="Powered by Universal Context for every workspace.")), ["GENERATED_MODE_COPY"])
expect_reject("changelog tag outside the closed enum", m(GC, lambda s: node(s, "editorial.changelog-entries")["content"]["entries"][0].update(tags=["Breaking"])), ["SCHEMA"])
expect_reject("changelog intro names the source brand", m(GC, lambda s: node(s, "hero.changelog-intro")["content"].update(title="Corvale ship notes")), ["GENERATED_MODE_BRAND"])
expect_reject("help card links to the source's reference slug", m(GHD, lambda s: node(s, "content.resource-cards")["content"]["cards"][0].update(href="/help/reference/attio-101")), ["GENERATED_MODE_URL"])
expect_reject("help card icon uses a third-party app mark", m(GHD, lambda s: node(s, "content.resource-cards")["content"]["cards"][0]["iconMedia"].update(assetRole="logo.third-party-app")), ["SCHEMA", "ASSET_ROLE_NOT_ALLOWED_FOR_FIELD", "GENERATED_MODE_ASSET"])
expect_reject("help opener reuses the source's heading", m(GHD, lambda s: node(s, "hero.help-search")["content"].update(title="How can we help?")), ["GENERATED_MODE_COPY"])
expect_reject("help lesson reuses the source's lesson copy", m(GHD, lambda s: node(s, "listing.lesson-list")["content"]["lessons"][0].update(description="Take a quick tour of the main screens.")), ["GENERATED_MODE_COPY"])
expect_reject("help sidebar placed after the opener", m(GHD, lambda s: s["nodes"].insert(3, s["nodes"].pop(1))), ["HERO_FIRST", "TEMPLATE_ORDER", "TEMPLATE_MISSING_REQUIRED"])
expect_reject("story hero copies the source's typed phrase", m(GA, lambda s: node(s, "hero.scroll-typewriter")["content"]["phrases"][0].update(line1="Every team keeps", line2="its own notes.")), ["GENERATED_MODE_COPY"])
expect_reject("story scene reuses reference artwork", m(GA, lambda s: node(s, "content.scroll-scene")["content"]["field"].update(assetRole="illustration.reference-art")), ["GENERATED_MODE_ASSET"])
expect_reject("story closing link names the source brand", m(GA, lambda s: node(s, "conversion.closing-stage")["content"]["links"][0].update(label="Try Corvale")), ["GENERATED_MODE_CTA", "GENERATED_MODE_BRAND"])
expect_reject("story logo band uses source customer marks", m(GA, lambda s: node(s, "social-proof.logo-wall")["content"]["logos"][0].update(assetRole="logo.source-customer")), ["SCHEMA", "GENERATED_MODE_ASSET", "ASSET_ROLE_NOT_ALLOWED_FOR_FIELD"])
expect_reject("story closing stage removed", m(GA, lambda s: s["nodes"].remove(node(s, "conversion.closing-stage"))), ["TEMPLATE_MISSING_REQUIRED"])
expect_reject("story lit statement used three times", m(GA, lambda s: [s["nodes"].insert(5, dict(copy.deepcopy(node(s, "content.lit-statement")), id=f"extra-lit-{i}")) for i in range(2)]), ["ONE_PER_PAGE", "TEMPLATE_REGION_COUNT", "NO_CONSECUTIVE_SAME_SECTION"])
expect_reject("reference route not served by the changelog template", m(RH, lambda s: s.update(template="changelog-year", route="/changelog/2026")), ["TEMPLATE_MISSING_REQUIRED", "TEMPLATE_UNEXPECTED_NODE", "TEMPLATE_ORDER"])
expect_reject("editorial index above its row maximum", m(GE, lambda s: node(s, "editorial.article-index")["content"]["rows"].extend([dict(node(s, "editorial.article-index")["content"]["rows"][0]) for _ in range(40)])), ["SCHEMA"])

print("== platform families (platform-feature, developer-platform): leakage + structure")
GPF, GDV, RPF = EX["generated-platform-feature"], EX["generated-developer-platform"], EX["reference-platform-feature"]
expect_reject("platform hero reuses a live platform headline", m(GPF, lambda s: node(s, "hero.platform-feature")["content"].update(headline="Never take notes again.")), ["GENERATED_MODE_COPY"])
expect_reject("platform links heading reuses the live 'plugs in' line", m(GPF, lambda s: node(s, "navigation.platform-links")["content"]["heading"].update(lead="Tarnwick plugs in. You take off.")), ["GENERATED_MODE_COPY"])
expect_reject("platform quote names a real customer", m(GPF, lambda s: node(s, "testimonial.quote")["content"]["person"].update(name="Margaret Shen")), ["GENERATED_MODE_PERSON"])
expect_reject("platform quote names a reference clone person", m(GPF, lambda s: node(s, "testimonial.quote")["content"]["person"].update(name="Nadia Brooks")), ["GENERATED_MODE_PERSON"])
expect_reject("platform hero art uses the clone's reference mock", m(GPF, lambda s: node(s, "hero.platform-feature")["content"].update(artwork={"assetRole": "product.reference-mock", "assetRef": "ref:src/components/platform/legacy.jsx#HeroData", "alt": "Board"})), ["GENERATED_MODE_ASSET"])
expect_reject("platform hero art claims a source screenshot", m(GPF, lambda s: node(s, "hero.platform-feature")["content"]["artwork"].update(assetRole="product.source-screenshot")), ["SCHEMA", "ASSET_ROLE_NOT_ALLOWED_FOR_FIELD", "GENERATED_MODE_ASSET"])
expect_reject("platform page names the clone's product term", m(GPF, lambda s: node(s, "features.split-accordion")["content"]["heading"].update(lead="Powered by Unified Knowledge.")), ["GENERATED_MODE_COPY"])
expect_reject("platform links point at the source domain", m(GPF, lambda s: node(s, "navigation.platform-links")["content"]["links"][0].update(href="https://attio.com/platform/ask")), ["GENERATED_MODE_URL"])
expect_reject("platform final CTA without its dome variant", m(GPF, lambda s: node(s, "conversion.final-cta").update(variant="streak-band")), ["TEMPLATE_VARIANT_NOT_ALLOWED"])
expect_reject("platform hero missing its variant-required cards", m(GPF, lambda s: node(s, "hero.platform-feature")["content"].pop("cards")), ["VARIANT_FIELDS"])
expect_reject("platform body below its 4-block minimum", m(GPF, lambda s: [s["nodes"].remove(node(s, t)) for t in ("features.media-card-grid", "testimonial.quote", "social-proof.stat-highlight", "features.text-columns")]), ["TEMPLATE_REGION_COUNT"])
expect_reject("platform final CTA removed", m(GPF, lambda s: s["nodes"].remove(node(s, "conversion.final-cta"))), ["TEMPLATE_MISSING_REQUIRED"])
expect_reject("platform links placed before the body", m(GPF, lambda s: s["nodes"].insert(2, s["nodes"].pop(next(i for i, n in enumerate(s["nodes"]) if n["type"] == "navigation.platform-links")))), ["TEMPLATE_ORDER", "TEMPLATE_UNEXPECTED_NODE", "TEMPLATE_REGION_COUNT", "TEMPLATE_MISSING_REQUIRED"])
expect_reject("second platform hero", m(GPF, lambda s: s["nodes"].insert(3, dict(copy.deepcopy(node(s, "hero.platform-feature")), id="hero-2"))), ["ONE_HERO", "ONE_PER_PAGE", "TEMPLATE_UNEXPECTED_NODE", "TEMPLATE_ORDER"])
expect_reject("card grid used four times", m(GPF, lambda s: [s["nodes"].insert(4, dict(copy.deepcopy(node(s, "features.media-card-grid")), id=f"grid-x{i}", variant=v)) for i, v in enumerate(("legacy-media", "legacy-icon", "v2-six"))]), ["ONE_PER_PAGE", "TEMPLATE_REGION_COUNT"])
expect_reject("developer body uses a platform-only section", m(GDV, lambda s: s["nodes"].insert(3, dict(copy.deepcopy(node(GPF, "features.split-accordion")), id="split-x"))), ["TEMPLATE_UNEXPECTED_NODE", "TEMPLATE_ORDER"])
expect_reject("developer page without its own closing CTA", m(GDV, lambda s: s["nodes"].remove(node(s, "conversion.developer-cta"))), ["TEMPLATE_MISSING_REQUIRED"])
expect_reject("developer quote uses the light scroll-lit variant", m(GDV, lambda s: node(s, "testimonial.quote").update(variant="scroll-lit")), ["TEMPLATE_VARIANT_NOT_ALLOWED"])
expect_reject("developer quote strip names a reference person", m(GDV, lambda s: next(n for n in s["nodes"] if n.get("variant") == "cards-with-quote")["content"]["quote"]["person"].update(name="Priya Nandan")), ["GENERATED_MODE_PERSON"])
expect_reject("developer card section with quote variant but no quote", m(GDV, lambda s: next(n for n in s["nodes"] if n.get("variant") == "cards-with-quote")["content"].pop("quote")), ["VARIANT_FIELDS"])
expect_reject("reference platform page on a route its template does not serve", m(RPF, lambda s: s.update(route="/platform/developers")), ["ROUTE_TEMPLATE_MISMATCH"])
expect_reject("marquee motion swapped for a time loop", m(GPF, lambda s: s["nodes"].insert(4, dict(make_node("features.card-marquee", "v2", 96), id="mq", motion={"patterns": ["marquee-loop"], "reducedMotionFallback": "static-final-state"}))), ["SCHEMA", "MOTION_PATTERN_NOT_ALLOWED"])

print("== token policy (R10)")
def sty(t, **kw):
    return lambda s: node(s, t).setdefault("style", {}).update(**kw)
expect_reject("unknown token", m(GH, sty("social-proof.scale-stats", surface="color.brand.9000")), ["TOKEN_UNKNOWN"])
expect_reject("raw hex colour", m(GH, sty("social-proof.scale-stats", surface="#ff0000")), ["TOKEN_RAW_COLOR"])
expect_reject("raw rgb colour in copy", m(GH, lambda s: node(s, "hero.product-window")["content"].update(headline="Crews in rgb(255,0,0)")), ["TOKEN_RAW_COLOR"])
expect_reject("arbitrary spacing (px)", m(GH, sty("social-proof.scale-stats", paddingTop="37px")), ["TOKEN_ARBITRARY_SPACING"])
expect_reject("spacing token outside section rhythm", m(GH, sty("social-proof.scale-stats", paddingBottom="space.4")), ["TOKEN_ARBITRARY_SPACING"])
expect_reject("unsupported font (catalogued, not approved)", m(GH, sty("social-proof.scale-stats", headingFont="font.mono")), ["TOKEN_UNSUPPORTED_FONT"])
expect_reject("unsupported font (not in catalog)", m(GH, sty("social-proof.scale-stats", headingFont="font.comic")), ["TOKEN_UNSUPPORTED_FONT"])
expect_reject("invalid theme/token combination", m(GH, sty("conversion.final-cta", surface="color.white.200")), ["TOKEN_THEME_MISMATCH"])
expect_reject("token not approved for PageSpecs", m(GH, sty("social-proof.scale-stats", surface="color.blue.500")), ["TOKEN_NOT_APPROVED"])
expect_reject("theme not allowed for section", m(GH, sty("conversion.final-cta", theme="light", surface="color.white.100")), ["THEME_NOT_ALLOWED_FOR_SECTION"])

print("== wrapper gate (R9)")
MV = load("extraction/measured-values.json")
def gate(mut):
    mv = copy.deepcopy(MV); mut(mv); return WG.gate(REPO, mv)
def page(mv, route):
    return next(p for p in mv["sectionHeights"]["pages"] if p["route"] == route)
def sec(mv, route, sid, inst=0):
    return next(s for s in page(mv, route)["sections"] if s["section"] == sid and s["instance"] == inst)
def expect_gate(name, mut, err=None, warn=None, match=None):
    e, w = gate(mut)
    ec, wc = {c for c, _ in e}, {c for c, _ in w}
    ok = (err in ec) if err else (not e and (warn in wc if warn else True))
    if ok and match:
        ok = any(match in msg for _, msg in (e if err else w))
    (PASSED if ok else FAILED).append(name)
    print(f"{'ok  ' if ok else 'MISS'}  gate    {name:58} errors={sorted(ec)} warnings={sorted(wc)}")
expect_gate("control: real measured heights", lambda mv: None, warn="HERO_TALL")
expect_gate("HERO 1900px warns only", lambda mv: sec(mv, "/", "hero.product-window").update(heightPx=1900), warn="HERO_TALL", match="/ hero.product-window")
expect_gate("HERO 3100px fails", lambda mv: sec(mv, "/", "hero.product-window").update(heightPx=3100), err="HERO_TOO_TALL")
expect_gate("whitelisted tall HERO still warns", lambda mv: None, warn="HERO_TALL", match="(whitelisted)")
expect_gate("tall HERO fails once its whitelist entry is removed", lambda mv: mv.update(wrapperWhitelist=[]), err="HERO_TOO_TALL")
expect_gate("section holding 65% of a page fails", lambda mv: sec(mv, "/startups", "features.cell-grid").update(heightPx=0.65 * page(mv, "/startups")["docHeightPx"]), err="SECTION_DOMINATES_PAGE")
expect_gate("section holding 55% of a page warns", lambda mv: sec(mv, "/startups", "features.cell-grid").update(heightPx=0.55 * page(mv, "/startups")["docHeightPx"]), warn="SECTION_LARGE_SHARE", match="/startups features.cell-grid")
expect_gate("whitelist entry missing justification", lambda mv: mv["wrapperWhitelist"][0].pop("justification"), err="WHITELIST_INVALID")
expect_gate("whitelist justification under 30 chars", lambda mv: mv["wrapperWhitelist"][0].update(justification="tall but fine"), err="WHITELIST_INVALID")
expect_gate("agent reviewer without attestation", lambda mv: mv["wrapperWhitelist"][0].update(reviewedBy="extraction agent"), err="WHITELIST_INVALID")
expect_gate("stale whitelist (cap below measured)", lambda mv: mv["wrapperWhitelist"][0].update(maxHeightPx=4000), err="WHITELIST_STALE")
expect_gate("stale whitelist: changelog list cap below its measured height", lambda mv: next(w for w in mv["wrapperWhitelist"] if w["section"] == "editorial.changelog-entries").update(maxHeightPx=3000), err="WHITELIST_STALE")
expect_gate("whitelist for a blog index that no longer matches a measurement", lambda mv: next(w for w in mv["wrapperWhitelist"] if w["section"] == "editorial.article-index").update(route="/engineering/missing"), err="WHITELIST_STALE")
expect_gate("architecture hero over 3000px fails without its whitelist", lambda mv: mv.update(wrapperWhitelist=[w for w in mv["wrapperWhitelist"] if w["section"] != "hero.scroll-typewriter"]), err="HERO_TOO_TALL")
expect_gate("dominant list on a 3-section page fails without a whitelist", lambda mv: sec(mv, "/engineering/blog", "editorial.article-index").update(heightPx=0.7 * page(mv, "/engineering/blog")["docHeightPx"]), err="SECTION_DOMINATES_PAGE")
expect_gate("missing measurement for a mounted route", lambda mv: mv["sectionHeights"]["pages"].remove(page(mv, "/pricing")), err="MISSING_MEASUREMENT")
expect_gate("measured at the wrong viewport", lambda mv: mv["sectionHeights"].update(viewportWidth=1280), err="WRONG_VIEWPORT")

print(f"\nadversarial: {len(PASSED)} passed, {len(FAILED)} failed")
if FAILED:
    print("FAILED:", FAILED)
sys.exit(1 if FAILED else 0)
