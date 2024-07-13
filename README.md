# A wrapper API for management of desktop interprocess communications.

Made for rsp (OS) - my Operational System Project

## Classes (Prototypes)

### - Server

  Class for running instances of a Desktop Bus Server. 

  Accesible thoughout: 
    - "rsp.desktopBus|Server.js" as npm module (node.js) 

### - Client

  Class for stablish connections from the client-side (monstly from electron.js runtimes)

  Accesible thoughout: 
    - "rsp.desktopBus|Client.js" as npm module (node.js) 

### - Manager

  Class auto instantied and initialized (from on the system's initd system)
  Exposes methods and options to manage all the running Desktip Bus Servers
  
  Accesible thoughout: 
    - "rsp.desktopBus man" as CLI sub-command
    - "rsp.desktopBus|Manager.js" as npm module (node.js) 

@rsp @rspos @rspproject 