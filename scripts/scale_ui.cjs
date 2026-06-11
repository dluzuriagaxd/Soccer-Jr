const fs = require('fs');

const path = './src/components/tools/SoccerSimulator.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace arbitrary small text with proper responsive / larger Tailwind classes
const replacements = [
  [/\btext-\[8px\]\b/g, 'text-xs md:text-sm'],
  [/\btext-\[9px\]\b/g, 'text-sm md:text-base'],
  [/\btext-\[10px\]\b/g, 'text-base md:text-lg'],
  [/\btext-\[11px\]\b/g, 'text-base md:text-lg'],
  [/\btext-xs\b/g, 'text-base md:text-lg'],
  [/\btext-sm\b/g, 'text-lg md:text-xl'],
  
  // Increase panel widths so larger text fits
  [/\bw-72\b/g, 'w-80 md:w-96'],
  [/\bw-64\b/g, 'w-72 md:w-80'],
  
  // Increase paddings slightly for breathing room
  [/\bp-3\b/g, 'p-4 md:p-5'],
];

for (const [regex, replacement] of replacements) {
  content = content.replace(regex, replacement);
}

fs.writeFileSync(path, content);
console.log('Updated SoccerSimulator.jsx typography and sizing cleanly.');
