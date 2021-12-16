// console.log("START");

// i7-10510U CPU => 4 cores => 8 threads
// console.log("Number of logical processors available: ", navigator.hardwareConcurrency); // 8 for i7-10510U CPU

const calcBtn1 = document.getElementById("calc-btn1");
const calcBtn2 = document.getElementById("calc-btn2");
const numInput1 = document.getElementById("num-input1");
const numInput2 = document.getElementById("num-input2");
const calcStatus1 = document.getElementById("calc_status1");
const calcStatus2 = document.getElementById("calc_status2");
const calcBothBtn = document.getElementById("calc-both-btn");
// One worker instance => one thread => no more parallel computation within the thread / worker
const dedicatedWebWorkerV1 = new Worker("./web.workers/dedicatedWebWorker.js", {
    name: "FibonacciWorker1",
    // type: "module"
});

const dedicatedWebWorkerV2 = new Worker("./web.workers/dedicatedWebWorker.js", {
    name: "FibonacciWorker2",
    // type: "module"
});

dedicatedWebWorkerV1.onmessage = function (event) {
    const [inputValue, n] = event.data;
    calcStatus1.innerText = `#${inputValue}: ${n}`;
    console.log(`First: #${inputValue}: ${n}`);
    numInput1.value = "";
}

dedicatedWebWorkerV2.onmessage = function (event) {
    const [inputValue, n] = event.data;
    calcStatus2.innerText = `#${inputValue}: ${n}`;
    console.log(`Second: #${inputValue}: ${n}`);
    numInput2.value = "";
}

dedicatedWebWorkerV1.onerror = function (error) {
    calcStatus1.innerText = error.message;
    console.error(error.message);
    numInput1.value = "";
}

dedicatedWebWorkerV2.onerror = function (error) {
    calcStatus2.innerText = error.message;
    console.error(error.message);
    numInput2.value = "";
}

function runCalc1() {
    const inputValue = parseInt(numInput1.value);
    if (!isNaN(inputValue)) {
        calcStatus1.innerText = "Processing...";
        console.log("First: Processing...");
        dedicatedWebWorkerV1.postMessage(inputValue);
        return;
    }
    calcStatus1.innerText = "NaN";
    console.log("First: NaN");
    numInput1.value = "";
}

function runCalc2() {
    const inputValue = parseInt(numInput2.value);
    if (!isNaN(inputValue)) {
        calcStatus2.innerText = "Processing...";
        console.log("Second: Processing...");
        dedicatedWebWorkerV2.postMessage(inputValue);
        return;
    }
    calcStatus2.innerText = "NaN";
    console.log("Second: NaN");
    numInput2.value = "";
}

calcBtn1.addEventListener("click", runCalc1);
calcBtn2.addEventListener("click", runCalc2);

function runBothCalc() {
    calcBtn1.click();
    calcBtn2.click();
}

calcBothBtn.addEventListener("click", runBothCalc)

// console.log("END");
