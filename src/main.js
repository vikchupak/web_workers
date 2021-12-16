// console.log("START");

// i7-10510U CPU => 4 cores => 8 threads
// console.log("Number of logical processors available: ", navigator.hardwareConcurrency); // 8 for i7-10510U CPU

const calcBtn = document.getElementById("calc-btn");
const numInput = document.getElementById("num-input");
const calcStatus = document.getElementById("calc_status");
// One worker instance => one thread => no more parallel computation within the thread / worker
const dedicatedWebWorkerV1 = new Worker("./web.workers/dedicatedWebWorker.js", {
    name: "FibonacciWorker1",
    // type: "module"
});

dedicatedWebWorkerV1.onmessage = function (event) {
    const [inputValue, n] = event.data;
    calcStatus.innerText = `#${inputValue}: ${n}`; // *** 2 ***
    console.log(`#${inputValue}: ${n}`);
    numInput.value = "";
}

dedicatedWebWorkerV1.onerror = function (error) {
    calcStatus.innerText = error.message;
    console.error(error.message);
    numInput.value = "";
}

function runCalc() {
    const inputValue = parseInt(numInput.value);
    if (!isNaN(inputValue)) {
        calcStatus.innerText = "Processing..."; // *** 1 ***
        console.log("Processing...");
        dedicatedWebWorkerV1.postMessage(inputValue);
        // dedicatedWebWorkerV2.postMessage(inputValue);
        return;
    }
    calcStatus.innerText = "NaN";
    console.log("NaN");
    numInput.value = "";
}

calcBtn.addEventListener("click", runCalc);

// console.log("END");
