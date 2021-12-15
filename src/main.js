import { getNthFibonacciNumberRecursion } from "./utils/get-nth-fibonacci-number-recursion.js";
// import { getNthFibonacciNumberLoop } from "./utils/get-nth-fibonacci-number-loop.js";

// console.log("START");

const calcBtn = document.getElementById("calc-btn");
const numInput = document.getElementById("num-input");
const calcStatus = document.getElementById("calc_status");

calcBtn.addEventListener("click", runCalc);

function runCalc() {
    const inputValue = parseInt(numInput.value);
    if (!isNaN(inputValue)) {
        calcStatus.innerText = "Processing..."; // *** 1 ***
        console.log("Processing...");
       // const n = getNthFibonacciNumberLoop(inputValue);
       const n = getNthFibonacciNumberRecursion(inputValue);
       calcStatus.innerText = `#${inputValue}: ${n}`; // *** 2 ***
       console.log(`#${inputValue}: ${n}`);
       numInput.value = "";
       return
    }
    calcStatus.innerText = "NaN";
    console.log("NaN");
    numInput.value = "";
}

// console.log("END");
