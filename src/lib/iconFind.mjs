import fs from 'fs';
import path from 'path';
import { iconFindInDirectory } from './iconFindInDirectory.mjs';

export default function findIcon(iconName, iconFindInDir = iconFindInDirectory) {

  const extensions = [
  '.png', 
  '.ico', 
  '.svg', 
  '.xpm'
  ];

  const baseDirs = [
    '/etc/xdg',
    '/etc/xfce4',
    `/home/${process.env.USER}/.local/bin/.icons`,
    '/usr/share/icons',
    '/usr/share/pixmaps',
    '/usr/share/desktop-base',
    '/usr/share/themes',
    '/usr/share/images',
    '/usr/share/xml/',
    '/usr/share/mime/',
    '/usr/share/Thunar/',
    '/usr/share/xfce4/',
    '/usr/share/plymouth/',
    '/usr/share/gnome-shell/',
    '/usr/share/color/',
    '/usr/share/colord',
    '/usr/share/xfce4'
  ];

  for (const baseDir of baseDirs) {
    const iconPath = iconFindInDir(baseDir, iconName, extensions);
    if (iconPath) {
      const ext = path.extname(iconPath);
      let iconData;
      if (ext === '.svg') {
        iconData = fs.readFileSync(iconPath, 'utf8');
        return `data:image/svg+xml;base64,${Buffer.from(iconData).toString('base64')}`;
      } else {
        iconData = fs.readFileSync(iconPath);
        return `data:image/${ext.slice(1)};base64,${iconData.toString('base64')}`;
      }
    }
  }

  return null;
  
}
