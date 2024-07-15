const os = require('os'),
      path = require('path'),
      DesktopSocket = require('../../src/index.js');

let HOME = os.homedir();

const socketServer = new DesktopSocket.Server({
    name: 'ExampleSocketServer',
    address: 'rsp.desktop.socket.io',
    services:  path.join(__dirname, 'services'),
    description: [
        'An example socket server instance that',
        '',
        ' ',
        '  '
    ]
});

socketServer.service({
    name: 'SettingGeneralFileWatcher',
    data: path.join(__dirname, 'services'),
    script: path.join(HOME, '.config', 'rsp.dsocket', 'general.json')
})


/*socketServer.service('DesktopUserFilesWatcher',
  path.join(__dirname, 'services', 'DesktopUserFilesWatcher.service.js'), {
    DesktopUserFilesDirectoryPath: path.resolve(HOME, '.local/share/applications')
  });

socketServer.service('DesktopSystemFilesWatcher',
  path.join(__dirname, 'services', 'DesktopSystemFilesWatcher.service.js'), {
    DesktopSystemFilesDirectoryPath: path.resolve('/usr/share/applications')
  });
*/
/*socketServer.service('SettingGeneralFileWatcher',
  path.join(__dirname, 'services', 'SettingGeneralFileWatcher.service.js'),
    path.resolve(HOME, '.config', 'rsp.dsocket', 'general.json')) */


/*
socketServer.service('SettingInterfacesFileWatcher', 'Handle setting files',
  path.join(__dirname, 'services', 'SettingInterfacesFileWatcher.service.js'), {
    SettingInterfacesFilePath: path.resolve(HOME, '.config', 'rsp.dsocket', 'storage', 'interfaces.json')
  }); */

// end of console.debug
// module.exports = socketServer;