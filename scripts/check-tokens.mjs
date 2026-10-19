import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import process from 'node:process';

const projectRoot = resolve(import.meta.dirname, '..');
const sourceRoot = join(projectRoot, 'src');
const pagesRoot = join(sourceRoot, 'pages');
const tokenSource = join(sourceRoot, 'styles', 'tokens.css');
const navigationSource = join(sourceRoot, 'config', 'navigation.tsx');
const supportedExtensions = new Set(['.css', '.ts', '.tsx']);

const rules = [
  {
    name: 'raw color',
    pattern: /#[0-9a-fA-F]{3,8}\b/g,
    message: 'Use a semantic color variable from src/styles/tokens.css.',
  },
  {
    name: 'raw CSS scale value',
    extensions: new Set(['.css']),
    pattern:
      /^\s*(?:margin(?:-(?:top|right|bottom|left))?|padding(?:-(?:top|right|bottom|left))?|gap|row-gap|column-gap|font-size|border-radius)\s*:\s*[^;]*\b\d+(?:\.\d+)?px\b/gm,
    message: 'Use a spacing, typography, or radius token instead of a raw px value.',
  },
  {
    name: 'raw inline scale value',
    extensions: new Set(['.ts', '.tsx']),
    pattern:
      /\b(?:margin|marginTop|marginRight|marginBottom|marginLeft|padding|paddingTop|paddingRight|paddingBottom|paddingLeft|gap|rowGap|columnGap|fontSize|borderRadius)\s*:\s*['"]?\d+(?:\.\d+)?(?:px)?['"]?/g,
    message: 'Use a semantic token instead of a raw inline scale value.',
  },
  {
    name: 'protected component selector override',
    extensions: new Set(['.css']),
    include: (file) => file.startsWith(pagesRoot),
    pattern: /\.(?:list-(?:filter-field|filter-label|filter-help|data-table|scroll-indicator|scroll-thumb|multiline-cell|status(?:-[a-z]+)?|pagination|page-button|page-size)|edit-(?:toolbar-select|status-tabs|tree(?:-panel)?|form-section|section-form|footer-actions|action)|complex-modal(?:-[a-z-]+)?)\b/g,
    message: 'Do not override protected list, edit, or complex-modal component selectors from page CSS; extend the component or its tokens instead.',
  },
];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? collectFiles(path) : [path];
    }),
  );
  return files.flat();
}

function locationFor(source, index) {
  const before = source.slice(0, index);
  const line = before.split('\n').length;
  const lastNewline = before.lastIndexOf('\n');
  const column = index - lastNewline;
  return { line, column };
}

const files = (await collectFiles(sourceRoot)).filter(
  (file) => supportedExtensions.has(extname(file)) && file !== tokenSource,
);
const violations = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const rule of rules) {
    if (rule.extensions && !rule.extensions.has(extname(file))) continue;
    if (rule.include && !rule.include(file)) continue;
    rule.pattern.lastIndex = 0;
    for (const match of source.matchAll(rule.pattern)) {
      const { line, column } = locationFor(source, match.index ?? 0);
      violations.push({
        file: relative(projectRoot, file),
        line,
        column,
        rule: rule.name,
        sample: match[0].trim(),
        message: rule.message,
      });
    }
  }
}

const navigation = await readFile(navigationSource, 'utf8');
const navigationIcons = [...navigation.matchAll(/^\s+icon:\s+(Icon[A-Za-z0-9]+),$/gm)];
const firstNavigationIcon = new Map();

for (const match of navigationIcons) {
  const icon = match[1];
  const index = match.index ?? 0;
  const previous = firstNavigationIcon.get(icon);
  if (previous !== undefined) {
    const { line, column } = locationFor(navigation, index);
    violations.push({
      file: relative(projectRoot, navigationSource),
      line,
      column,
      rule: 'duplicate primary navigation icon',
      sample: `icon: ${icon}`,
      message: `Primary navigation icons must be unique. ${icon} was first used on line ${previous}.`,
    });
  } else {
    firstNavigationIcon.set(icon, locationFor(navigation, index).line);
  }
}

if (violations.length > 0) {
  console.error('\nToken policy violations:\n');
  for (const violation of violations) {
    console.error(
      `${violation.file}:${violation.line}:${violation.column}  ${violation.rule}\n` +
        `  ${violation.sample}\n  ${violation.message}\n`,
    );
  }
  process.exit(1);
}

console.log(`Token policy passed (${files.length} source files checked).`);
