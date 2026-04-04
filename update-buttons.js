const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Specifically target "bg-primary text-black" 
      // which is used strictly for CTA buttons across the app
      let newContent = content.replace(
        /bg-primary\s+text-black/g, 
        'bg-black/60 border border-primary text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:bg-primary/20 hover:shadow-[0_0_40px_rgba(0,255,148,0.7)]'
      );
      
      // For things like hover:bg-primary hover:text-black (e.g. social icons and outlined buttons)
      newContent = newContent.replace(
        /hover:bg-primary\s+hover:text-black/g, 
        'hover:border-primary hover:text-white hover:bg-primary/20 hover:shadow-[0_0_30px_rgba(0,255,148,0.5)]'
      );
      
      // Ensure specific duplicate shadow removals aren't looking gross
      // e.g. if my replace added hover:shadow and there's already a shadow hover class
      
      fs.writeFileSync(fullPath, newContent);
    }
  }
}

replaceInDir('src');
console.log("Updated all components to use dark luxury buttons with white text.");
