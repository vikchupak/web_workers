// self.addEventListener('connect', function connectListener(event) {...})

// OR

// onconnect = connectListener(event) {...}

const connections = [];

const crossWindowState = {
    counter: 0,
};

// console.log(self);

onconnect = function(event) {
    const port = event.ports[0];
    connections.push(port);

    // to automatically sync new tabs
    port.postMessage(crossWindowState);

    // port.addEventListener('message', function messageListener(event) {...});
    // port.start();

    // OR

    // port.onmessage = function messageListener(event) {...};

    port.onmessage = function (event) {
        const { actionType } = event.data;

        console.log("connections: ", connections);

        switch (actionType) {
            case 'INCREMENT':
                crossWindowState.counter++;
                break;
            case 'DECREMENT':
                crossWindowState.counter--;
                break;
            case 'REMOVE_PORT':
                connections.splice(connections.indexOf(port), 1);
                break;
            default:
                throw new Error("No such actionType!");
        }

        connections.forEach((connection) => {
            connection.postMessage(crossWindowState);
        })
    }
}
