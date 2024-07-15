import { iconFind } from './iconFind.mjs';
import settingsOverset from './testSettings/interfaces.mjs';

export default function parseDesktopFile (content) {

  let app = {};
  let lines = content.split('\n');

  lines.forEach((line) => {
    
    if (line.startsWith('Name=')) {

      app.name = line.replace('Name=', '').trim();

    } else if (line.startsWith('Version=')) {

      app.version = line.replace('Version=', '').trim();

    } else if (line.startsWith('Author=')) {

      app.author = line.replace('Author=', '').trim();

    } else if (line.startsWith('Exec=')) {

      app.exec = line.replace('Exec=', '').trim();

    } else if (line.startsWith('Categories=')) {

      app.categories = line.replace('Categories=', '').trim().split(';');

    } else if (line.startsWith('Comment=')) {

      app.comment = line.replace('Comment=', '').trim()

    } else if (line.startsWith('MimeType=')) {

      app.mimetype = line.replace('MimeType=', '').trim().split(';');

    } else if (line.startsWith('Type=')) {

      app.type = line.replace('Type=', '').trim();

    } else if (line.startsWith('Icon=')) {

      const iconName = line.replace('Icon=', '').trim();

      app.icon = iconFind(iconName);

    }

    if (!app.mimetype) {
      app.mimetype = [];
    }

    if (!app.version) {
      app.version = '100f';
    }

    if (!app.author) {
      app.author = 'unknown';
    }

    app.author = app.author.replaceAll(' ', '')
    app.id = (app.name + '-' + app.author).replaceAll(' ', '');

    app.fav = false;
    app.priv = false;
    app.hidden = false;

    const appOverset = settingsOverset.settings.find(overset => overset.id === app.id);

    if (appOverset) {
        console.log('App overset detected: ' + appOverset)
        Object.assign(app, appOverset);
    }

  });

  return app;

}