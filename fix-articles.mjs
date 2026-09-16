import fs from 'fs';
import path from 'path';

const articlesDir = path.join(process.cwd(), 'app', 'content', 'articles');

if (!fs.existsSync(articlesDir)) {
  console.error('Directory not found:', articlesDir);
  process.exit(1);
}

const files = fs.readdirSync(articlesDir).filter(f => /\.mdx?$/.test(f));

files.forEach((file) => {
  const filePath = path.join(articlesDir, file);
  let rawContent = fs.readFileSync(filePath, 'utf8');

  // 1. Clean ChatGPT citation artifacts
  rawContent = rawContent.replace(/:contentReference\[oaicite:\d+\]/g, '');

  // 2. Separate Frontmatter metadata (between --- and ---)
  const parts = rawContent.split(/^---$/m);
  let frontmatter = '';
  let body = rawContent;

  if (parts.length >= 3) {
    frontmatter = `---\n${parts[1].trim()}\n---\n\n`;
    body = parts.slice(2).join('---');
  }

  // 3. Force-break merged single-line strings
  body = body
    // Force newline before section headers (## and ###)
    .replace(/\s*(##+\s+)/g, '\n\n$1')
    // Replace all double pipes || with actual line breaks
    .replace(/\|[ \t]*\|/g, '|\n|')
    // Ensure newline when a table cell is immediately followed by another row cell
    .replace(/\|[ \t]*([A-Za-z0-9$%\-.,\s()]+)\|[ \t]*(?=\|[ \t]*[A-Za-z0-9$%\-.,\s()]+)/g, '|$1|\n|');

  // 4. Reconstruct table structures line by line
  const lines = body.split('\n');
  const cleanedLines = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (!line) continue;

    // Check if line is a table header or table row
    if (line.startsWith('|')) {
      // Ensure row ends with a trailing pipe
      if (!line.endsWith('|')) line += ' |';

      // If previous line was not part of a table, a new table starts here
      const prevLine = cleanedLines[cleanedLines.length - 1] || '';
      if (!prevLine.startsWith('|')) {
        cleanedLines.push(''); // Empty space BEFORE table
        cleanedLines.push(line);

        // Auto-inject missing delimiter (| --- | --- |)
        const colCount = (line.match(/\|/g) || []).length - 1;
        if (colCount > 0) {
          const divider = '| ' + Array(colCount).fill('---').join(' | ') + ' |';
          cleanedLines.push(divider);
        }
        continue;
      }
    } else {
      // If previous line was a table row and current is not, insert blank space AFTER table
      const prevLine = cleanedLines[cleanedLines.length - 1] || '';
      if (prevLine.startsWith('|')) {
        cleanedLines.push('');
      }
    }

    cleanedLines.push(line);
  }

  const finalContent = frontmatter + cleanedLines.join('\n\n').replace(/\n{3,}/g, '\n\n');

  fs.writeFileSync(filePath, finalContent, 'utf8');
  console.log(`✅ Hard-rebuilt tables in: ${file}`);
});

console.log('🚀 All articles completely reconstructed!');