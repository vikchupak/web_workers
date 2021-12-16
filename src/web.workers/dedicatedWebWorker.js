// import { getNthFibonacciNumberRecursion } from "../utils/get-nth-fibonacci-number-recursion.js";
// import { getNthFibonacciNumberLoop } from "../utils/get-nth-fibonacci-number-loop.js";
// For module type workers, but for some reason it doesn't work in Firefox
// SyntaxError: import declarations may only appear at top level of a module
importScripts("../utils/get-nth-fibonacci-number-recursion.js");
importScripts("../utils/get-nth-fibonacci-number-loop.js");

onmessage = function (event) {
    console.log("Worker is running");
    // console.log("self: ", self);
    const inputValue = event.data;
    const n = getNthFibonacciNumberRecursion(event.data);
    postMessage([inputValue, n]);

    // To "kill" the web worker from inside the worker
    // close();
};
