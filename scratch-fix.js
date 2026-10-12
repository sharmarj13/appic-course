import fs from 'fs';
import path from 'path';

function replaceInFile(filePath, search, replace) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(search, replace);
  fs.writeFileSync(filePath, content, 'utf8');
}

replaceInFile('src/app/layout.tsx', 'class="scroll-smooth"', 'className="scroll-smooth"');

function fixLocation(dir) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      fixLocation(dirPath);
    } else if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
      let content = fs.readFileSync(dirPath, 'utf8');
      if (content.includes('location.pathname')) {
        content = content.replace(/location\.pathname/g, 'location');
        fs.writeFileSync(dirPath, content, 'utf8');
      }
    }
  });
}
fixLocation('src');

const filesWithImages = [
  'src/components/home/FinalCTA.tsx',
  'src/components/home/Hero.tsx',
  'src/components/home/LearningJourney.tsx',
  'src/components/home/WhyAppicSkill.tsx',
  'src/data/blogs.ts',
  'src/data/courses.ts'
];

filesWithImages.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const imageImports = [...content.matchAll(/import\s+(\w+)\s+from\s+['"][^'"]+\.(png|jpe?g|svg|webp)['"]/g)].map(m => m[1]);
    
    imageImports.forEach(imgVar => {
      const regex = new RegExp(`(?<!import\\s+)${imgVar}\\b(?!\\.src)`, 'g');
      content = content.replace(regex, `${imgVar}.src`);
    });

    fs.writeFileSync(filePath, content, 'utf8');
  }
});
