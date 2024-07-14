# A wrapper API for management of desktop interprocess communications.

Made for rsp (OS) - my Operational System Project

## What is does

Service that run interfaces of IPC 
  ... between system events and desktop running applications
    - signaling (+ with or without data payload)
    - service daemon runner for signaling on their handlers 
      ,,,only!

  no methods - the signals payloads must be enough for the app client resolve themself
  no options - why..?!

## Classes (Prototypes)

### - Server

  Class for running instances of a Desktop Bus Server. 

  Accesible thoughout: 
    - "rsp.desktopBus|Server.js" as npm module (node.js) 

### - Client

  Class for stablish connections from the client-side (monstly from electron.js runtimes)

  Accesible thoughout: 
    - "rsp.desktopBus|Client.js" as npm module (node.js) 

  client.request('signal-name')
  
### - Manager

  Class auto instantied and initialized (from on the system's initd system)
  Exposes methods and options to manage all the running Desktip Bus Servers
  
  Accesible thoughout: 
    - "rsp.desktopBus man" as CLI sub-command
    - "rsp.desktopBus|Manager.js" as npm module (node.js) 

@rsp @rspos @rspproject 