import { getNthFibonacciNumberRecursion } from "../utils/get-nth-fibonacci-number-recursion.js";

onmessage = function (event) {
    const inputValue = event.data;
    const n = getNthFibonacciNumberRecursion(event.data);
    postMessage([inputValue, n])
};
