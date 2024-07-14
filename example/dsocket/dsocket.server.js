const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const dsocket = require('../../index.js');
const packageJson = require('./package.json');

let mainWindow;
let dsocketClient;
// let desktopFiles; // cache usable for renderer.js 
// let settingFiles; // cache

console.debug('Electron modules:', { app, ipcMain, BrowserWindow });
console.debug('Path module:', path);
console.debug('dsocket module:', dsocket);
console.debug('Package JSON:', packageJson);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
}

app.on('ready', () => {

  createWindow();

  dsocketClient = new dsocket.Client(packageJson.name, mainWindow);

  dsocketClient.worker(
    'DesktopFilesWatche', 
        path.join(__dirname, 'dsocket.worker.js', {
            SettingGeneralFilePath: path.join(__dirname, 'settings.json',
            SettingsInterfacesFilePath: path.join(__dirname, 'interfaces.json',
            DesktopSystemFilesDirectoryPath: path.join(__dirname, 'system',
            DesktopUserFilesDirectoryPath: path.join(__dirname, 'user'
    })

    dsocketClient.worker(
    'DesktopFilesWatcher', 
        path.join(__dirname, 'dsocket.worker.js', {
            SettingGeneralFilePath: path.join(__dirname, 'settings.json',
            SettingsInterfacesFilePath: path.join(__dirname, 'interfaces.json',
            DesktopSystemFilesDirectoryPath: path.join(__dirname, 'system',
            DesktopUserFilesDirectoryPath: path.join(__dirname, 'user'
    })


  dsocketClient.listen('SettingFiles', (settings) => {
    console.log('SettingFiles signal received on main.js');
    console.debug('settings data:', settings);
    settingFiles = settings; // cache the settings if needed
  });

  dsocketClient.listen('DesktopFiles', (file) => {
    console.log('DesktopFiles signal received on main.js');
    console.debug('file data:', file);
    desktopFiles = file; // cache the desktop files if needed
  });

  // Uncomment if you need to handle any IPC events
  // ipcMain.handle('dsocket-client', () => {
  //   return { ...dsocketClient };
  // });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
