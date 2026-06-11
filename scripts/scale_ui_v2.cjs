const fs = require('fs');
const path = './src/components/tools/SoccerSimulator.jsx';
let content = fs.readFileSync(path, 'utf8');

// The bracket notation characters cause issues with \b.
// We just use a simpler regex that replaces the exact class strings globally.
const classReplacements = {
  'text-[8px]': 'text-sm md:text-base font-bold',
  'text-[9px]': 'text-base md:text-lg font-bold',
  'text-[10px]': 'text-lg md:text-xl font-bold',
  'text-[11px]': 'text-lg md:text-xl font-bold',
  'text-xs': 'text-lg md:text-xl font-bold',
  
  // Contrast fixes: upgrade low opacities to high opacities or white/slate colors
  'text-white/20': 'text-slate-300 font-medium',
  'text-white/30': 'text-slate-200 font-bold',
  'text-white/40': 'text-slate-100 font-bold',
  'text-white/50': 'text-white font-bold',
  'text-white/60': 'text-white font-bold',
  
  'bg-white/5': 'bg-slate-800',
  'border-white/5': 'border-slate-600 border-2',
  'border-white/10': 'border-slate-500 border-2'
};

for (const [oldClass, newClass] of Object.entries(classReplacements)) {
  // Use string replace with split/join to replace all occurrences reliably without regex gotchas
  content = content.split(oldClass).join(newClass);
}

// Increase the layout sizes so the huge text fits
content = content.split('w-72 md:w-80').join('w-[400px]');
content = content.split('w-80 md:w-96').join('w-[450px]');
content = content.split('w-64').join('w-[380px]');

fs.writeFileSync(path, content);
console.log('Successfully applied professional typography and contrast overrides.');
