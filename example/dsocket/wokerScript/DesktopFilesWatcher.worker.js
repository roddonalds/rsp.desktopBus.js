const fs = require('fs');
const fsPromises = fs.promises;

const { parentPort, workerData } = require('worker_threads');

function executeScript (script) {

    

    // Implement the logic to execute the script
    return `Executed script with payload: ${script}`;

}

const result = executeScript(workerData);

console.debug('executeScript result (workerData):', result);

parentPort.postMessage(result);

module.exports = executeScript;

// -----------------------------------

/*module.exports = function (name, paths, signalize) {

  const ename = `${name}.dsocket.worker.${name}`;
  
  console.log('this initializing:', name);
  console.debug('ename:', ename);
  console.debug('paths:', paths);
  
  fs.watch(paths.SettingGeneralFilePath, async () => {

    const json = await fsPromises.readFile(paths.SettingGeneralFilePath);
    const data = JSON.parse(json);

    signalize('SettingGeneral', 'SettingGeneral JSON Changed', data);

  })

  fs.watch(paths.SettingsInterfacesFilePath, async () => {

    const json = await fsPromises.readFile(paths.SettingsInterfacesFilePath);
    const data = JSON.parse(json);

    signalize('SettingInterfaces', 'SettingInterfaces JSON Changed', data);

  })

  fs.watch(paths.DesktopSystemFilesDirectoryPath, async () => {

    const files = await fsPromises.readdir(paths.DesktopSystemFilesDirectoryPath);

    signalize('DesktopSystemFiles', 'DesktopSystemFiles JSON Changed', data);
  
  })

  fs.watch(paths.DesktopUserFilesDirectoryPath, async () => {
      
      const files = await fsPromises.readdir(paths.DesktopUserFilesDirectoryPath);
  
      signalize('DesktopUserFiles', 'DesktopUserFiles JSON Changed', data);  
  
    })

  console.log('dsocket worker initialized!');

}*/