var EventBus = require('../src/index.js').default;

// Client-side EventBus extension for interacting with the server
function EventBusClient(busName, serviceName) {

  EventBus.call(this);

  this.connectIPC.renderer((ipcRenderer) => {

    this.ipcRenderer = ipcRenderer;
    this.busName = busName;
    this.serviceName = serviceName;

    this.ipcRenderer.on(`${this.busName}-signal`, (event, { serviceName, signalName, args }) => {
      if (serviceName === this.serviceName) {
        this.emit(`${serviceName}.${signalName}`, null, ...args);
      }
    });

    this.ipcRenderer.on(`${this.busName}-response`, (event, { serviceName, methodName, response, error }) => {
      if (serviceName === this.serviceName) {
        this.emit(`${serviceName}.${methodName}-response`, null, response, error);
      }
    });

  });


}

// Inherit EventBus prototype
EventBusClient.prototype = Object.create(EventBus.prototype);
EventBusClient.prototype.constructor = EventBusClient;

// Call a method on the server
EventBusClient.prototype.callMethod = function (methodName, ...args) {
  return new Promise((resolve, reject) => {
    const callback = (event, response, error) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(response);
      }
      this.off(`${this.serviceName}.${methodName}-response`, callback);
    };

    this.on(`${this.serviceName}.${methodName}-response`, callback);
    this.ipcRenderer.send(`${this.busName}-call`, { serviceName: this.serviceName, methodName, args });
  });
};

// Listen to multiple signals from the server
EventBusClient.prototype.onSignal = function (signalNames, callback) {
  signalNames.forEach(signalName => {
    this.on(`${this.serviceName}.${signalName}`, callback);
  });
};

// Connect method to set up event handling and IPC communication
EventBusClient.prototype.connectIPC = {

    main: (ipcMain) => {
      
      if (!ipcMain) {
        throw new Error('IPC Main is not available.');
      }
      
      ipcMain.on(`${this.busName}-call`, (event, { serviceName, methodName, args }) => {
        if (serviceName === this.serviceName) {
          this.callMethod(methodName, ...args)
            .then(response => {
              event.sender.send(`${this.busName}-response`, { serviceName, methodName, response });
            })
            .catch(error => {
              event.sender.send(`${this.busName}-response`, { serviceName, methodName, error: error.message });
            });
        }
      });

    }, 

    renderer: (ipcRenderer) => {

      if (!ipcRenderer) {
        throw new Error('IPC Renderer is not available.');
      }

      this.ipcRenderer.on('event-bus-initialized', () => {
        console.log('Event Bus initialized and ready for use.');
      });

      let win = {}

      win.rsp = {
      
        eventBus: {
          on: (signalName, callback) => {
            this.on(signalName, callback);
          },
          call: async (methodName, ...args) => {
            return await this.callMethod(methodName, ...args);
          }
        }

      };

      return win.rsp;

    } 

};

module.exports = EventBusClient;
