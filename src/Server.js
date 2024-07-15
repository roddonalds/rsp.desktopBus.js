const WebSocket = require('ws');
const { Worker } = require('worker_threads');

function Server(appName) {

    this.port = 7777;
    this.services = {};
    this.appName = appName;
    this.prefix = `rsp.dsocket.io/${appName}`;
    this.wss = new WebSocket.Server({ port: this.port });

    this.wss.on('connection', (ws) => {

        this.connections.push({ ws, prefix: this.prefix });

        ws.on('message', (message) => {
            /// exxaminar this. aqui
            // examinar message aqui
            console.debug('this', this);
            console.debug('message:', message)

            const data = JSON.parse(message);
            const { action, prefix, signal, payload } = data;
            
            if (this.signals[signal]) {
                this.signals[signal](payload, ws);
            }
        });

        ws.on('close', () => {
            this.connections = this.connections.filter(connection => connection.ws !== ws);
            Object.keys(this.services).forEach((key) => {
                this.services[key] = this.services[key].filter(workerWs => workerWs !== ws);
            });
        });
    });
}

Server.prototype.emit = function(signal, payload) {

    console.log('Running dserver.emit()')

    const addr = `${this.prefix}.${signal}`;

    console.debug('addr',  addr);

    this.connections.forEach((connection) => {
        connection.ws.send(JSON.stringify({ signal: addr, payload }));
    });
}

Server.prototype.service = function(options) {

    const name = options.name;
    const data = options.data;
    const script = options.script;

    console.debug(`Registering a service: ${name}`);
    console.debug(`On script path: ${script}`);
    console.debug('service:', name);

    this.services[name] = new Worker(script, { workerData: data });
    this.services[name].on('message', (result) => {

    });

    this.services[name].on('error', (error) => {
        this.emit(`${name}Error`, error.message);
    });

    this.services[name].on('exit', (code) => {
        if (code !== 0) {
            this.emit(`${name}Error`, `Worker stopped with exit code ${code}`);
        }
    });
}

module.exports = Server;
