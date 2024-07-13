const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');

const rspDesktopBus = require('../../index.js');

var dbusClient;
var mainWindow;

app.on('ready', () => {
  
  createWindow()

 // Expose the EventBus client to the renderer process

  dbusClient = new rspDesktopBus.Client(
                        'io.rsp.desktop.bus', 
                            'MyTestService',
                                mainWindow, 
                                    ipcMain);

  dbusClient.connectIPC.main(ipcMain);

  //mainWindow.webContents.on('did-finish-load', () => {
    //mainWindow.webContents.send('dbus-client');
  //});

  //ipcMain.handle('event-bus-call', async (event, { methodName, args }) => {
    //return await dbusClient.callMethod(methodName, ...args);
  //});

  //ipcMain.on('event-bus-onSignal', (event, { signalNames, callback }) => {
    //dbusClient.onSignal(signalNames, callback);
  //});

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: true,
      nodeIntegration: true
    }
  
  });
}

exports.dbusClient = dbusClient;