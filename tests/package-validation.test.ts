import { existsSync, readdirSync, readFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const root = new URL("../", import.meta.url);
const pkg = JSON.parse(readFileSync(new URL("package.json", root), "utf8")) as {
  name?: string;
  private?: boolean;
  license?: string;
  repository?: { url?: string };
  bugs?: { url?: string };
  homepage?: string;
  pi?: { extensions?: string[]; prompts?: string[]; skills?: string[] };
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

assert.equal(pkg.name, "@aefree/pi-extras");
assert.equal(pkg.private, true);
assert.equal(pkg.license, "MIT");
assert.equal(pkg.repository?.url, "git+ssh://git@github.com/aefreedman/pi-extras.git");
assert(pkg.bugs?.url?.includes("aefreedman/pi-extras"), "Expected pi-extras bugs URL.");
assert(pkg.homepage?.includes("aefreedman/pi-extras"), "Expected pi-extras homepage URL.");
assert(pkg.pi?.extensions?.includes("./index.ts"), "Expected extension registration.");
assert(pkg.pi?.prompts?.includes("./prompts"), "Expected prompts directory registration.");
assert(pkg.pi?.skills?.includes("./skills"), "Expected skills directory registration.");
assert(existsSync(new URL("LICENSE", root)), "Expected LICENSE file.");
assert(existsSync(new URL("README.md", root)), "Expected README file.");
assert(pkg.dependencies?.typebox, "Expected runtime typebox dependency for extension schemas.");
assert(pkg.peerDependencies?.["@mariozechner/pi-coding-agent"] === "*", "Expected Pi coding-agent peer dependency.");
const extensionText = readFileSync(new URL("index.ts", root), "utf8");
assert(extensionText.includes("pi_analyze_session"), "Expected session analysis tool registration.");
assert(extensionText.includes("namespaceForTool"), "Expected tool namespace grouping.");
assert(extensionText.includes("Session files:"), "Expected aggregate session output.");
assert(existsSync(new URL("prompts/continue.md", root)), "Expected /continue prompt.");
assert(existsSync(new URL("prompts/analyze-session.md", root)), "Expected /analyze-session prompt.");
assert(existsSync(new URL("prompts/closeout-card.md", root)), "Expected /closeout-card prompt.");
assert(existsSync(new URL("skills/streamlining-skills/SKILL.md", root)), "Expected streamlining-skills skill.");

const analyzeSessionText = readFileSync(new URL("prompts/analyze-session.md", root), "utf8");
assert(analyzeSessionText.includes("tool-call counts"), "Expected analyze-session prompt to collect tool-call counts.");
assert(analyzeSessionText.includes("improving existing packages"), "Expected analyze-session prompt to prioritize existing-package improvements.");

const closeoutCardText = readFileSync(new URL("prompts/closeout-card.md", root), "utf8");
assert(closeoutCardText.includes("codecks_card_list_resolvables"), "Expected closeout-card prompt to avoid duplicate review threads.");
assert(closeoutCardText.includes("plastic_mergeToBranch"), "Expected closeout-card prompt to prefer Plastic merge helper.");
assert(closeoutCardText.includes("Plastic parent branch") && closeoutCardText.includes("Do not assume `/dev`"), "Expected closeout-card prompt to default to the Plastic parent branch.");

const skillText = readFileSync(new URL("skills/streamlining-skills/SKILL.md", root), "utf8");
assert(skillText.includes("name: streamlining-skills"), "Expected skill frontmatter name.");
assert(!skillText.includes("../_shared/"), "Expected no missing shared-reference paths in streamlining skill.");

const referenceDir = new URL("skills/streamlining-skills/references/", root);
for (const expected of ["attribution.md", "checklist.md", "frontmatter.md", "ref-splitting.md", "section-normalization.md"]) {
  assert(existsSync(new URL(expected, referenceDir)), `Expected streamlining reference ${expected}`);
}

for (const entry of readdirSync(new URL("prompts/", root), { withFileTypes: true })) {
  assert(entry.isFile() && entry.name.endsWith(".md"), `Unexpected prompt entry: ${entry.name}`);
}

console.log("pi-extras package validation tests passed");
