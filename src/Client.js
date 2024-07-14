const WebSocket = require('ws');

function Client(appName, appWindow) {
    
    this.port = 7777;
    this.appName = appName;
    this.appWindow = appWindow;
    this.uri = `http://rsp.dsocket.io:${this.port}`;
    this.url = `${this.uri}/${this.appName}`;
    this.prefix = `rsp.dsocket.io/${appName}`;
    this.ws = new WebSocket(this.uri);

    this.ws.onopen = () => {
        this.ws.send(JSON.stringify({ action: 'register', prefix: this.prefix }));
    };

    this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { signal, payload } = data;
        this.appWindow.dispatchEvent(new CustomEvent(signal, { detail: payload }));
    };
}

Client.prototype.emit = function (signal, payload) {
    const addr = `${this.prefix}.${signal}`;
    this.ws.send(JSON.stringify({ action: 'emit', prefix: this.prefix, signal: addr, payload }));
};

Client.prototype.execute = function (payload) {
    this.ws.send(JSON.stringify({ action: 'execute', prefix: this.prefix, payload }));
};

Client.prototype.listen = function (signal, handler) {
    this.appWindow.webContents.on(signal, (event) => {
        handler(event.detail);
    });
};

module.exports = Client;
