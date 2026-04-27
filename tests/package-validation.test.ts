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
  pi?: { prompts?: string[]; skills?: string[] };
};

assert.equal(pkg.name, "@aefree/pi-extras");
assert.equal(pkg.private, true);
assert.equal(pkg.license, "MIT");
assert.equal(pkg.repository?.url, "git+ssh://git@github.com/aefreedman/pi-extras.git");
assert(pkg.bugs?.url?.includes("aefreedman/pi-extras"), "Expected pi-extras bugs URL.");
assert(pkg.homepage?.includes("aefreedman/pi-extras"), "Expected pi-extras homepage URL.");
assert(pkg.pi?.prompts?.includes("./prompts"), "Expected prompts directory registration.");
assert(pkg.pi?.skills?.includes("./skills"), "Expected skills directory registration.");
assert(existsSync(new URL("LICENSE", root)), "Expected LICENSE file.");
assert(existsSync(new URL("README.md", root)), "Expected README file.");
assert(existsSync(new URL("prompts/continue.md", root)), "Expected /continue prompt.");
assert(existsSync(new URL("skills/streamlining-skills/SKILL.md", root)), "Expected streamlining-skills skill.");

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
