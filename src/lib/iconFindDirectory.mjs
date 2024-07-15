import fs from 'fs';
import path from 'path';

export default function findIconInDir(dir, iconName, extensions) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const result = findIconInDir(fullPath, iconName, extensions);
      if (result) return result;
    } else if (
      stat.isFile() &&
      extensions.includes(path.extname(fullPath)) &&
      path.basename(fullPath, path.extname(fullPath)) === iconName
    ) {
      return fullPath;
    }
  }

  return null;
}