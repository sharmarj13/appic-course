import fs from 'fs';
import path from 'path';

function fixLocation(dir) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      fixLocation(dirPath);
    } else if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
      let content = fs.readFileSync(dirPath, 'utf8');
      if (content.includes('useActionModal') && !content.includes('"use client"')) {
        content = `"use client";\n${content}`;
        fs.writeFileSync(dirPath, content, 'utf8');
        console.log('Added use client to', dirPath);
      }
    }
  });
}
fixLocation('src');
