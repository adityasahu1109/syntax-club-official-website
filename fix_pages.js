const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'Home.jsx');

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf-8');

  // Fix imports
  if (!content.includes('GridBackground')) {
    content = content.replace(/(import .*;\n)+/, match => `${match}import GridBackground from '../components/ui/GridBackground';\n`);
  }

  // Add GridBackground right after the return opening <div>
  if (!content.includes('<GridBackground />')) {
    content = content.replace(/return \(\n\s*<div[^>]*>/, match => `${match}\n      <div className="absolute inset-0 z-[-1] opacity-50"><GridBackground /></div>`);
    // Ensure the parent div has relative positioning
    content = content.replace(/return \(\n\s*<div (className="[^"]*)"/g, (match, p1) => {
      if (p1.includes('relative')) return match;
      return match.replace(p1, `className="relative ${p1.slice(11)}"`);
    });
  }

  // Fix text classes
  content = content.replace(/text-slate-900 dark:text-slate-100/g, 'text-white');
  content = content.replace(/text-slate-600 dark:text-slate-400/g, 'text-slate-400');
  content = content.replace(/text-slate-900 dark:text-slate-200/g, 'text-slate-200');
  content = content.replace(/dark:bg-slate-900\/50/g, 'bg-background-dark/50');
  content = content.replace(/dark:bg-white\/5/g, 'bg-white/5');
  content = content.replace(/dark:border-slate-800/g, 'border-white/10');
  content = content.replace(/bg-slate-100/g, 'bg-black/20');
  content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-[0-9]{3}/g, 'gradient-text');
  content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-blue-[0-9]{3} to-primary/g, 'gradient-text');

  // Specific h1 scaling (make it huge and responsive)
  content = content.replace(/className="text-white text-3xl md:text-5xl/g, 'className="text-white text-4xl sm:text-5xl md:text-7xl');
  content = content.replace(/className="text-white text-4xl md:text-5xl/g, 'className="text-white text-4xl sm:text-5xl md:text-7xl');
  content = content.replace(/className="text-white text-5xl font-black/g, 'className="text-white text-4xl flex-col sm:text-5xl md:text-7xl font-black');

  fs.writeFileSync(path.join(dir, file), content, 'utf-8');
});

console.log("Pages updated!");
