// console.log("START");

const calcBtn = document.getElementById("calc-btn");
const numInput = document.getElementById("num-input");
const calcStatus = document.getElementById("calc_status");
const dedicatedWebWorker = new Worker("./web.workers/dedicatedWebWorker.js", {type: "module"});

dedicatedWebWorker.onmessage = function (event) {
    const [inputValue, n] = event.data;
    calcStatus.innerText = `#${inputValue}: ${n}`; // *** 2 ***
    console.log(`#${inputValue}: ${n}`);
    numInput.value = "";
}

dedicatedWebWorker.onerror = function (error) {
    calcStatus.innerText = `Error: ${error.message}`;
    console.log(`Error: ${error.message}`);
    numInput.value = "";
}

function runCalc() {
    const inputValue = parseInt(numInput.value);
    if (!isNaN(inputValue)) {
        calcStatus.innerText = "Processing..."; // *** 1 ***
        console.log("Processing...");
        dedicatedWebWorker.postMessage(inputValue);
        return;
    }
    calcStatus.innerText = "NaN";
    console.log("NaN");
    numInput.value = "";
}

calcBtn.addEventListener("click", runCalc);

// console.log("END");
