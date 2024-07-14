const WebSocket = require('ws');
const { Worker } = require('worker_threads');

function Server (appName) {
    
    this.port = 7777;
    this.appName = appName;
    this.prefix = `rsp.dsocket.io/${appName}`;
    this.wss = new WebSocket.Server({ port: this.port});

    this.workers = {};
    this.signals = {};
    this.connections = [];

    this.wss.on('connection', (ws) => {

        this.connections.push({
            ws,
            prefix: this.prefix
        });

        ws.on('message', (message) => {
           
            const data = JSON.parse(message);
            const { action, prefix, signal, payload } = data;
            
        });

        ws.on('close', () => {
            this.workers.forEach((clients, prefix) => {
                this.workers.set(prefix, clients.filter(client => client !== ws));
            });
        });
    });
}

Server.prototype.emit = function (signal, payload) {
    
    const addr = `${this.prefix}.${signal}`;

    this.workers.forEach((clients) => {
        clients.forEach((client) => {
            client.send(JSON.stringify({ signal: addr, payload }));
        });
    });
}

Server.prototype.worker = function (name, scriptPath, data) {

    console.debug(`Registering a worker: ${name}`)
    console.debug(`On script path: ${scriptPath}`)
    console.debug('worker:', this.workers[name]);

    this.workers[name] = new Worker(scriptPath, {  name, ...data  })

};

Server.prototype.signal = function (name, description, handler) {

    console.log('name', name)
    console.log('description', description)
    console.log('handler', handler)

    this.signals[name] = handler;

    // Assuming you have a method to handle signals
};

Server.prototype.execute = function (signal, handler) {

    const worker = new Worker('./workers/worker.js', { my: 'payload', da: 'ta' });
    
    worker.on('message', result => {
        ws.send(JSON.stringify({ signal: 'executionResult', payload: result }));
    });
    
    worker.on('error', error => {
        ws.send(JSON.stringify({ signal: 'executionError', payload: error.message }));
    });
    
    worker.on('exit', code => {
        if (code !== 0) {
            ws.send(JSON.stringify({ signal: 'executionError', payload: `Worker stopped with exit code ${code}` }));
        }
    });
 
}

module.exports = Server;
