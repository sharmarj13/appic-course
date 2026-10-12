import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir(SRC_DIR, (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it uses client hooks or motion
    if ((content.includes('useState') || content.includes('useEffect') || content.includes('useRef') || content.includes('motion/')) && !content.includes('"use client"')) {
      content = `"use client";\n${content}`;
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Added "use client" to: ${filePath}`);
    }
  }
});
