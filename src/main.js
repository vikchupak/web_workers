// console.log("START");

// Chrome and Firefox have many differences in implementing shared workers!

const incrBtn = document.getElementById("incr-btn");
const decrBtn = document.getElementById("decr-btn");

const stateBlock = document.getElementById("state_block");

const sharedWorker = new SharedWorker("./web.workers/sharedWebWorker.js", {
    name: "crossWindowSharedWebWorker",
    // type: "module"
});

// const sharedWorker = new SharedWorker(url, options)
// sharedWorker.port.start()
// sharedWorker.addEventListener('message', function listener(event) {...})

// OR

// const sharedWorker = new SharedWorker(url, options)
// sharedWorker.port.onmessage = function listener(event) {...}

sharedWorker.port.onmessage = function (event) {
    const crossWindowState = event.data;
    const jsonCrossWindowState = JSON.stringify(crossWindowState);

    stateBlock.innerText = jsonCrossWindowState;
}

// Works only in Firefox
sharedWorker.onerror = function (error) {
    const errorMessage = error.message;

    stateBlock.innerText = errorMessage;
    console.error(errorMessage);
    // Will close full sharedWorker, not just port
    // sharedWorker.port.close();
}

function increment() {
    sharedWorker.port.postMessage({ actionType: 'INCREMENT' });
}

function decrement() {
    sharedWorker.port.postMessage({ actionType: 'DECREMENT' });
}

incrBtn.addEventListener("click", increment);
decrBtn.addEventListener("click", decrement);

window.onbeforeunload = function removePort() {
    sharedWorker.port.postMessage( { actionType: 'REMOVE_PORT' });
}

// console.log("END");
