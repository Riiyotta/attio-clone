#!/usr/bin/env python3
"""Prove that verify_all.py catches drift: copy the repo to an OS temp dir, inject one defect per case,
run the copy's own verify_all.py, and require a non-zero exit with the expected check FAILing.

    python3 extraction/prove_drift.py [--scratch DIR]

When the clone's source tree sits next to this repo (repo/..), the scratch parent gets read-only symlinks
to it so citation, token-source and route-table drift can be proven too; standalone, those cases are
reported as SKIP (the checks themselves degrade to WARN without a sibling). Scratch copies live in the OS temp
dir, or under --scratch DIR when given; nothing is ever written outside that directory. Exit 1 if any case goes undetected or the unmutated copy fails.
"""
import json, os, re, shutil, subprocess, sys, tempfile
sys.dont_write_bytecode = True

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_ROOT = os.path.dirname(REPO)
SIBLING = os.path.isfile(os.path.join(SRC_ROOT, "src", "App.jsx"))

def jl(root, rel):
    with open(os.path.join(root, rel)) as f:
        return json.load(f)
def jw(root, rel, d):
    with open(os.path.join(root, rel), "w") as f:
        json.dump(d, f, indent=2)
def edit(root, rel, old, new, count=1):
    p = os.path.join(root, rel); t = open(p).read()
    if old not in t:
        raise RuntimeError(f"mutation anchor not found in {rel}: {old[:50]}")
    open(p, "w").write(t.replace(old, new, count))

def m_phantom(r):
    d = jl(r, "tokens/llm/component-allowlist.json"); d["sections"].append({"id": "features.phantom", "category": "FEATURES", "retrievalEligible": True}); jw(r, "tokens/llm/component-allowlist.json", d)
def m_orphan(r):
    d = jl(r, "tokens/llm/component-allowlist.json"); d["sections"] = [s for s in d["sections"] if s["id"] != "faq.accordion"]; jw(r, "tokens/llm/component-allowlist.json", d)
def m_cite_range(r):
    d = jl(r, "sections/faq.accordion.json"); d["source"]["lines"] = "99990-99999"; d["source"]["citation"] = d["source"]["file"] + ":99990-99999"; jw(r, "sections/faq.accordion.json", d)
def m_cite_wrongline(r):
    d = jl(r, "sections/faq.accordion.json"); s, e = map(int, d["source"]["lines"].split("-")); d["source"]["lines"] = f"{s + 3}-{e}"; d["source"]["citation"] = f"{d['source']['file']}:{s + 3}-{e}"; jw(r, "sections/faq.accordion.json", d)
def m_cite_string(r):
    d = jl(r, "sections/faq.accordion.json"); d["source"]["citation"] = d["source"]["file"] + ":1-2"; jw(r, "sections/faq.accordion.json", d)
def m_count(r):
    d = jl(r, "registry.manifest.json"); d["counts"]["sections"] += 1; jw(r, "registry.manifest.json", d)
def m_readme(r):
    p = os.path.join(r, "README.md"); t = open(p).read(); t = re.sub(r"\| templates \| (\d+) \|", lambda m: f"| templates | {int(m.group(1)) + 3} |", t); open(p, "w").write(t)
def m_alver(r):
    d = jl(r, "registry.manifest.json"); d["allowlistVersion"] = "9.9.9"; jw(r, "registry.manifest.json", d)
def m_avail(r):
    d = jl(r, "assets/asset-roles.json")
    for x in d["roles"]:
        if x["id"] == "brand.source-wordmark": x["availability"] = "generation-safe"
    jw(r, "assets/asset-roles.json", d)
def m_unpin(r):
    edit(r, "schema/semantic_validate.py", '    "brand.source-wordmark": "blocked-for-generation",\n', "")
def m_policy(r):
    d = jl(r, "assets/asset-roles.json")
    for x in d["roles"]:
        if x["id"] == "person.source-photo": x["generationPolicy"] = "may-generate-new"
    jw(r, "assets/asset-roles.json", d)
def m_flip_overlay(r):
    d = jl(r, "sections/overlay.search-dialog.json"); d["retrievalEligible"] = True; d.pop("retrievalIneligibleReason", None); jw(r, "sections/overlay.search-dialog.json", d)
    a = jl(r, "tokens/llm/component-allowlist.json")
    for s in a["sections"]:
        if s["id"] == "overlay.search-dialog": s["retrievalEligible"] = True
    jw(r, "tokens/llm/component-allowlist.json", a)
def m_content_ineligible(r):
    d = jl(r, "sections/faq.accordion.json"); d["retrievalEligible"] = False; d["retrievalIneligibleReason"] = "Marked ineligible to test that a content section cannot be hidden."; jw(r, "sections/faq.accordion.json", d)
    a = jl(r, "tokens/llm/component-allowlist.json")
    for s in a["sections"]:
        if s["id"] == "faq.accordion": s["retrievalEligible"] = False
    jw(r, "tokens/llm/component-allowlist.json", a)
def m_catalog(r):
    d = jl(r, "tokens/llm/token-catalog.json"); d["tokens"]["color.black.100"]["value"] = "#123456"; jw(r, "tokens/llm/token-catalog.json", d)
def m_token_source(r):
    for rel in ("tokens/00-foundation/color.json",):
        d = jl(r, rel); d["tokens"]["color.traffic.red"]["value"] = "#ff0001"; jw(r, rel, d)
    d = jl(r, "tokens/llm/token-catalog.json"); d["tokens"]["color.traffic.red"]["value"] = "#ff0001"; jw(r, "tokens/llm/token-catalog.json", d)
def m_policy_key(r):
    d = jl(r, "tokens/llm/token-policy.json"); d["rawValueRestrictions"]["typography"] = "no raw fonts"; jw(r, "tokens/llm/token-policy.json", d)
def m_graph(r):
    d = jl(r, "compatibility/graph.json"); d["rules"] = [x for x in d["rules"] if x["id"] != "ONE_HERO"]; jw(r, "compatibility/graph.json", d)
def m_route(r):
    d = jl(r, "templates/routes.json"); d["routes"] = [x for x in d["routes"] if x["route"] != "/careers"]; jw(r, "templates/routes.json", d)
    t = jl(r, "templates/templates.json"); t["templates"]["careers"]["routes"] = []; jw(r, "templates/templates.json", t)
def m_wl_just(r):
    d = jl(r, "extraction/measured-values.json"); d["wrapperWhitelist"][0].pop("justification"); jw(r, "extraction/measured-values.json", d)
def m_viewport(r):
    d = jl(r, "extraction/measured-values.json"); d["sectionHeights"]["viewportWidth"] = 1280; jw(r, "extraction/measured-values.json", d)
def m_abspath(r):
    with open(os.path.join(r, "CHANGELOG.md"), "a") as f:
        f.write("\nbuilt from " + "/Us" + "ers/someone/project\n")
def m_entry(r):
    d = jl(r, "registry.manifest.json"); d["entryPoints"]["spec"] = "../CLONE_SPEC.md"; jw(r, "registry.manifest.json", d)
def m_example(r):
    d = jl(r, "schema/examples/generated-home.pagespec.json"); d["template"] = "pricing"; jw(r, "schema/examples/generated-home.pagespec.json", d)
def m_semantic_id(r):
    d = jl(r, "sections/faq.accordion.json"); d["source"]["id"] = d["semantic"]["id"]; jw(r, "sections/faq.accordion.json", d)
def m_maxwords(r):
    d = jl(r, "sections/faq.accordion.json"); d["content"]["properties"]["title"].pop("maxWords"); jw(r, "sections/faq.accordion.json", d)

def m_unpin_verify(r):
    edit(r, "extraction/verify_all.py", '    "brand.source-wordmark": "blocked-for-generation", "brand.reference-wordmark": "reference-only",\n', '    "brand.reference-wordmark": "reference-only",\n')
def m_unpin_retrieval_verify(r):
    edit(r, "extraction/verify_all.py", 'RETRIEVAL_INELIGIBLE = {"overlay.search-dialog", "overlay.gallery-lightbox", "overlay.mobile-nav-drawer"}', 'RETRIEVAL_INELIGIBLE = {"overlay.search-dialog", "overlay.gallery-lightbox"}')
def m_gen_leak(r):
    d = jl(r, "schema/examples/generated-editorial-listing.pagespec.json"); d["nodes"][1]["content"]["featured"]["title"] = "Why Attio keeps shipping"; jw(r, "schema/examples/generated-editorial-listing.pagespec.json", d)
def m_gen_missing(r):
    os.remove(os.path.join(r, "schema/examples/generated-architecture.pagespec.json"))
    d = jl(r, "registry.manifest.json"); d["entryPoints"]["generatedExamples"] = [x for x in d["entryPoints"]["generatedExamples"] if "architecture" not in x]; jw(r, "registry.manifest.json", d)
def m_gen_unlisted(r):
    d = jl(r, "registry.manifest.json"); d["entryPoints"]["generatedExamples"] = [x for x in d["entryPoints"]["generatedExamples"] if "help-docs" not in x]; jw(r, "registry.manifest.json", d)
def m_measure_dropped(r):
    d = jl(r, "extraction/measured-values.json"); d["sectionHeights"]["pages"] = [p for p in d["sectionHeights"]["pages"] if p["route"] != "/engineering/blog"]; jw(r, "extraction/measured-values.json", d)
def m_hero_tall(r):
    d = jl(r, "extraction/measured-values.json")
    d["wrapperWhitelist"] = [w for w in d["wrapperWhitelist"] if w["section"] != "hero.scroll-typewriter"]; jw(r, "extraction/measured-values.json", d)
def m_wl_stale(r):
    d = jl(r, "extraction/measured-values.json")
    for w in d["wrapperWhitelist"]:
        if w["section"] == "editorial.changelog-entries": w["maxHeightPx"] = 3000
    jw(r, "extraction/measured-values.json", d)
def m_wl_agent(r):
    d = jl(r, "extraction/measured-values.json"); d["wrapperWhitelist"][0]["reviewedBy"] = "design-repo extraction agent"; jw(r, "extraction/measured-values.json", d)
def m_threshold(r):
    edit(r, "extraction/wrapper_gate.py", "HERO_FAIL_PX = 3000", "HERO_FAIL_PX = 30000")
def m_rule_off(r):
    edit(r, "schema/semantic_validate.py", 'add("GENERATED_MODE_URL", f"{path}: \'{s}\' is not on a reserved placeholder domain (.example/.invalid)")', "pass")
def m_rule_off_chapter(r):
    edit(r, "schema/semantic_validate.py", 'errs.append(("CHAPTER_OPENS_BODY"', 'warns.append(("CHAPTER_OPENS_BODY"')
def m_evidence_shift(r):
    d = jl(r, "tokens/00-foundation/color.json"); d["tokens"]["color.platform.card-border"]["evidence"] = "tailwind.config.cjs:200-200"; jw(r, "tokens/00-foundation/color.json", d)
def m_token_missing(r):
    for rel in ("tokens/00-foundation/color.json", "tokens/llm/token-catalog.json"):
        d = jl(r, rel); d["tokens"].pop("color.platform.card-border"); 
        if "total" in d: d["total"] -= 1; d["counts"]["color"] -= 1
        jw(r, rel, d)
def m_type_missing(r):
    d = jl(r, "tokens/00-foundation/typography.json"); d["fontSize"].pop("type.xs"); jw(r, "tokens/00-foundation/typography.json", d)
    c = jl(r, "tokens/llm/token-catalog.json"); c["tokens"].pop("type.xs"); c["total"] -= 1; c["counts"]["fontSize"] -= 1; jw(r, "tokens/llm/token-catalog.json", c)
def m_route_twice(r):
    d = jl(r, "templates/routes.json"); d["routes"].append(dict(d["routes"][0])); jw(r, "templates/routes.json", d)
def m_route_wrong_tpl(r):
    d = jl(r, "templates/routes.json")
    for x in d["routes"]:
        if x["route"] == "/blog": x["template"] = "pricing"
    jw(r, "templates/routes.json", d)
def m_route_evidence(r):
    d = jl(r, "templates/routes.json")
    for x in d["routes"]:
        if x["route"] == "/blog": x["evidence"] = "src/App.jsx:36-36"
    jw(r, "templates/routes.json", d)
def m_tpl_unknown_section(r):
    d = jl(r, "templates/templates.json"); d["templates"]["help-docs"]["nodes"].append({"section": "listing.ghost", "required": False, "repeatable": False}); jw(r, "templates/templates.json", d)
def m_pending_mounted(r):
    d = jl(r, "templates/pending-routes.json"); d["routes"].append({"route": "/blog", "intendedTemplate": "x", "futureIntentSource": "x", "status": "pending-not-mounted"}); jw(r, "templates/pending-routes.json", d)
def m_schema_enum(r):
    d = jl(r, "schema/pagespec.schema.json"); d["definitions"]["node"]["properties"]["type"]["enum"].remove("content.scroll-scene"); jw(r, "schema/pagespec.schema.json", d)
def m_motion_new(r):
    d = jl(r, "tokens/00-foundation/motion-patterns.json"); d["patterns"] = [p for p in d["patterns"] if p["id"] != "scroll-typewriter"]; jw(r, "tokens/00-foundation/motion-patterns.json", d)
def m_runtime_new(r):
    d = jl(r, "sections/navigation.docs-sidebar.json"); d["title"] = "Docs drawer"; jw(r, "sections/navigation.docs-sidebar.json", d)
def m_adversarial_gone(r):
    os.remove(os.path.join(r, "schema/tests/adversarial_test.py"))
def m_malformed_cite(r):
    d = jl(r, "sections/faq.accordion.json"); d["source"]["lines"] = 54; jw(r, "sections/faq.accordion.json", d)

def m_midbuild_stale(r):
    d = jl(r, "registry.manifest.json"); d["sourceProject"]["midBuild"] = True; jw(r, "registry.manifest.json", d)
def m_platform_pending(r):
    d = jl(r, "templates/routes.json"); d["routes"] = [x for x in d["routes"] if x["route"] != "/platform/ask"]; jw(r, "templates/routes.json", d)
    t = jl(r, "templates/templates.json"); t["templates"]["platform-feature"]["routes"].remove("/platform/ask"); jw(r, "templates/templates.json", t)
    p = jl(r, "templates/pending-routes.json"); p["routes"] = [{"route": "/platform/ask", "status": "pending-not-mounted"}]; jw(r, "templates/pending-routes.json", p)
def m_platform_unmeasured(r):
    d = jl(r, "extraction/measured-values.json")
    for pg in d["sectionHeights"]["pages"]:
        pg["sections"] = [s for s in pg["sections"] if s["section"] != "features.assistant-intel"]
    jw(r, "extraction/measured-values.json", d)
def m_platform_template_drift(r):
    t = jl(r, "templates/templates.json"); t["templates"]["platform-feature"]["nodes"][2]["allowedSections"].remove("features.split-accordion"); jw(r, "templates/templates.json", t)

CASES = [  # (name, mutation, expected failing check, needs sibling source)
    ("phantom allowlist entry", m_phantom, "allowlist-parity", False),
    ("orphan contract (allowlist entry removed)", m_orphan, "allowlist-parity", False),
    ("allowlistVersion drift", m_alver, "allowlist-parity", False),
    ("citation out of range", m_cite_range, "citations", True),
    ("citation in range but wrong line", m_cite_wrongline, "citations", True),
    ("citation string disagrees with lines", m_cite_string, "citations", True),
    ("manifest count hand-bumped", m_count, "manifest-counts", False),
    ("README count stale", m_readme, "readme-counts", False),
    ("registry availability loosened", m_avail, "asset-pins", False),
    ("pin removed from the semantic validator", m_unpin, "asset-pins", False),
    ("pinned policy changed to another valid value", m_policy, "asset-pins", False),
    ("overlay flipped eligible in contract + allowlist together", m_flip_overlay, "contracts", False),
    ("content section marked ineligible", m_content_ineligible, "contracts", False),
    ("token catalog value drift", m_catalog, "tokens", False),
    ("foundation + catalog drift from the real token file", m_token_source, "tokens-vs-source", True),
    ("token policy key not a catalog type", m_policy_key, "tokens", False),
    ("graph rule removed (validator still has it)", m_graph, "graph-parity", False),
    ("mounted route dropped from routes.json", m_route, "routes", True),
    ("whitelist entry loses its justification", m_wl_just, "wrapper-gate", False),
    ("heights recorded at the wrong viewport", m_viewport, "wrapper-gate", False),
    ("absolute machine path in a doc", m_abspath, "no-absolute-paths", False),
    ("entryPoint outside the package", m_entry, "self-containment", False),
    ("example declares the wrong template", m_example, "semantic-examples", False),
    ("source.id equals semantic.id", m_semantic_id, "contracts", False),
    ("text field without maxWords", m_maxwords, "contracts", False),
    ("verify_all pin removed (source wordmark)", m_unpin_verify, "asset-pins", False),
    ("verify_all retrieval pin removed (mobile drawer)", m_unpin_retrieval_verify, "contracts", False),
    ("generated example leaks the source brand", m_gen_leak, "semantic-examples", False),
    ("template family loses its generated example", m_gen_missing, "generated-examples", False),
    ("generated example not listed in the manifest", m_gen_unlisted, "generated-examples", False),
    ("route's measured heights dropped", m_measure_dropped, "wrapper-gate", False),
    ("whitelist removed from a pinned scroll hero (>3000px)", m_hero_tall, "wrapper-gate", False),
    ("whitelist cap below the measured height", m_wl_stale, "wrapper-gate", False),
    ("agent reviewer without the attestation phrase", m_wl_agent, "wrapper-gate", False),
    ("gate threshold loosened in code (caught by the adversarial run)", m_threshold, "adversarial", False),
    ("generated-mode URL rule disabled in the validator", m_rule_off, "adversarial", False),
    ("CHAPTER_OPENS_BODY downgraded to a warning", m_rule_off_chapter, "adversarial", False),
    ("adversarial suite deleted", m_adversarial_gone, "self-containment", False),
    ("token evidence line shifted off its source key", m_evidence_shift, "tokens-vs-source", True),
    ("source colour missing from the repo (platform card border)", m_token_missing, "tokens-vs-source", True),
    ("source type role missing from the repo", m_type_missing, "tokens-vs-source", True),
    ("route mapped twice", m_route_twice, "routes", False),
    ("mounted route moved to the wrong template", m_route_wrong_tpl, "routes", False),
    ("route evidence points at another route's line", m_route_evidence, "routes", True),
    ("template references a section with no contract", m_tpl_unknown_section, "routes", False),
    ("mounted route also listed as pending", m_pending_mounted, "routes", False),
    ("schema node enum loses a new section", m_schema_enum, "allowlist-parity", False),
    ("motion pattern used by a new section removed", m_motion_new, "contracts", False),
    ("runtime-looking section not pinned ineligible", m_runtime_new, "contracts", False),
    ("citation object with a non-string lines field", m_malformed_cite, "citations", True),
    ("manifest keeps midBuild=true with no pending routes", m_midbuild_stale, "manifest-counts", False),
    ("mounted platform route moved back to pending", m_platform_pending, "routes", True),
    ("platform section never measured", m_platform_unmeasured, "wrapper-gate", False),
    ("platform template drops a section its examples use", m_platform_template_drift, "semantic-examples", False),
]

def run(root):
    p = subprocess.run([sys.executable, "-B", os.path.join(root, "design-repo", "extraction", "verify_all.py")], capture_output=True, text=True, timeout=600)
    return p.returncode, p.stdout + p.stderr

def scratch_parent():
    if "--scratch" in sys.argv:
        d = os.path.abspath(sys.argv[sys.argv.index("--scratch") + 1])
        os.makedirs(d, exist_ok=True)
        return d
    return None

def fresh(tmp):
    root = tempfile.mkdtemp(dir=tmp)
    shutil.copytree(REPO, os.path.join(root, "design-repo"), ignore=shutil.ignore_patterns("__pycache__", "*.zip", ".DS_Store"))
    if SIBLING:
        for name in ("src", "tailwind.config.cjs", "package.json"):
            if os.path.exists(os.path.join(SRC_ROOT, name)):
                os.symlink(os.path.join(SRC_ROOT, name), os.path.join(root, name))
    return root

def main():
    tmp = tempfile.mkdtemp(prefix="drift-", dir=scratch_parent())
    bad = 0
    try:
        code, out = run(fresh(tmp))
        print(f"{'ok  ' if code == 0 else 'FAIL'}  baseline copy passes verify_all (exit {code})")
        bad += code != 0
        for name, fn, check, needs in CASES:
            if needs and not SIBLING:
                print(f"SKIP  {name:58} (needs the sibling source tree)")
                continue
            root = fresh(tmp)
            fn(os.path.join(root, "design-repo"))
            code, out = run(root)
            hit = code != 0 and re.search(rf"^FAIL\s+{re.escape(check)}\b", out, re.M)
            print(f"{'ok  ' if hit else 'MISS'}  {name:58} -> {check} {'FAIL' if hit else 'not detected'} (exit {code})")
            bad += not hit
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    print(f"\nprove_drift: {len(CASES)} cases, {bad} undetected" + ("" if SIBLING else " (standalone: sibling-dependent cases skipped)"))
    return 1 if bad else 0

if __name__ == "__main__":
    sys.exit(main())
