const { parentPort, workerData } = require('worker_threads');

function executeScript (script) {

    // Implement the logic to execute the script
    console.log(`\n (6) SettingsGeneralFileWatcherservice.js -------------------------------`)
    console.debug(' > executing: executeScript:   ' + script)

    const message = `Executed script with payload: ${script}`;

    console.debug(' > executeScript returns:     ', message);
    console.log(' -------------------------------------------------------------------------------------------------------')
    
    return message;
}

const result = executeScript(workerData);

console.debug('executeScript (workerData):', result);

parentPort.postMessage(result);
