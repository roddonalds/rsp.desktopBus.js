import fs from 'fs';
import path from 'path';
import { parseDesktopFile } from './parseDesktopFile.mjs';

const desktopUserFilesDirectory = `/home/${USER}/.local/share/applications`;
const desktopSystemFilesDirectory = '/usr/share/applications';
const USER = process.env.USER;

export default function getApps () {
  
  const systemApps = main('system', desktopSystemFilesDirectory);
  const userApps = main('user', desktopUserFilesDirectory);

  let allApps = [ 
    ...systemApps, 
    ...userApps 
  ];

  return allApps;
}

function main (wide, entriesDir) {

  const apps = [];

  try {

    const files = fs.readdirSync(entriesDir, 'utf8');;

    files.forEach(file => {

      if (path.extname(file) === '.desktop') {

        const filePath = path.join(entriesDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const app = parseDesktopFile(content);

        apps.push({ ...app, wide });
        
      }

    });

  } catch (err) {
    console.error(`Error reading ${wide}-specific applications:`, err);
  }

  return apps;
  
}
