// My intent is to create a dbus like api with node.js.
// I have the code API designed of Server and Client instances but I dont write the source code.
// I will provie you with 2 files.
// - first is socketServerInstance.js class from class DesktopSocket.Server();
// - second is socketClientInstance.js class from class DesktopSocket.Client()
// ... with maestry, abstract this into full and functional source code; 
// write the services.js file sample
// *** no need to cache the connections inside an array;
const os = require('os'),
      path = require('path'),
      DesktopSocket = require('../../src/index.js');

let HOME = os.homedir();

// internally creates and websocker server.
// over the address rsp.desktop.socket.io and port 7777 for both client and server.
const socketServer = new DesktopSocket.Server({
    // socket server name
    name: 'AppServerSocket',
    // socket server worker's source services scripts path
    // inside of it all files must correspond to a defined service before .start() is calledcast
    // ex: socketServer.service({
    // service name: 'DesktopFilesWatcher'
    // ..so it's path on services/ directory if "DesktopFilesWatcher.service.js"
    // *** it can be a path of a file or a path of a directory
    // ... 
    script:  path.join(__dirname, 'services'),
    // a description for the server
    description: ['A socket server instance', 'Composed of a single service' ]
})

socketServer.service({
    // service's name
    name: 'DesktopFilesWatcher',
    // payload property can be of any type if your inner resource resolves it
    // it inserts tho the service the necessary data for it to do its work
    // in this case, this service/worker will listen for changes on ./applications files changes
    // that is why it needs the appsDirectoryPath payload.
    load: { appsDirectoryPath: path.resolve('./applications') },
    // handles events emmited from inside the service worker inside the socketServer instance;
    event: (signal, data) {
      // signal() is a method to be called to the service/worker's client instance
      // ...to the respective clientInstance (with is an desktop that handles 
      // ...the signals/events emmited from serverInstance)
      // data is the data from the worker disposed in order to me middlewared and sended
      // send back to the respective client instance // 
      // commonly an desktop application process runs the client ...or local webpages
      //  console.debug('data/payload from rsp.dsocket.io.DesktopFilesWatcher.service', data);
      signal(data) // this will run the clients like ths socketClient.listen((signal, data) => {  // apply front-end/client logic here   })
    }
})

socketServer.start();

// Please, wait for me to send the next file, the socketClientInstance!!!
// ok?