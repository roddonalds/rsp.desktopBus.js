const store = require('./store.js');

console.log(store())

var EventBus = require('../src/index.js').default;

// Server-side EventBus extension to manage services
function EventBusServer(interface) {

    console.debug('EventBusServer constructor called with interface:', interface);

    if (!interface) {
        console.error('Interface name not defined');
        throw new Error(`Interface name not defined`);
    }

    if (store.interfaces.includes(interface)) {
        console.error(`Interface ${interface} already exists`);
        throw new Error(`Interface ${interface} already exists`);
    }

    EventBus.call(this);

    this.name = interface;
    this.jobs = {};
    this.methods = {};

    store.interfaces.push(this);

    console.debug('Interface added to global interfaces:', store.interfaces);
}

// Inherit EventBus prototype
EventBusServer.prototype = Object.create(EventBus.prototype);
EventBusServer.prototype.constructor = EventBusServer;

// Register a service with methods
EventBusServer.prototype.job = function (jobName, callback) {

    console.debug('job method called with arguments:', { jobName, callback });

    if (!jobName) {
        console.error(`Job name not provided`);
        throw new Error(`Job ${jobName} not found`);
    }

    if (!callback) {
        console.error(`Callback for job ${jobName} not defined`);
        throw new Error(`Callback for job ${jobName} not defined`);
    }

    if (this.jobs[jobName]) {
        console.error(`Job ${jobName} already exists`);
        throw new Error(`Job ${jobName} already exists`);
    }

    this.jobs[jobName] = callback;

    console.debug('Job registered:', { jobName, callback });
};

EventBusServer.prototype.do = function (methodName, callback) {
    console.debug('do method called with arguments:', { methodName, callback });

    if (!methodName) {
        console.error(`Method name not defined`);
        throw new Error(`Method name not defined`);
    }

    if (!callback) {
        console.error(`Callback for ${methodName} not defined`);
        throw new Error(`Callback for ${methodName} not defined`);
    }

    if (this.methods[methodName]) {
        console.error(`Method ${methodName} already exists`);
        throw new Error(`Method ${methodName} already exists`);
    }

    this.methods[methodName] = () => {
        console.log(`Executing method ${methodName}`);
        callback();
    };
    console.debug('Method registered:', { methodName, callback });
};

module.exports = EventBusServer;
