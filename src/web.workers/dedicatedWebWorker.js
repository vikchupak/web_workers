// import { getNthFibonacciNumberRecursion } from "../utils/get-nth-fibonacci-number-recursion.js";
// import { getNthFibonacciNumberLoop } from "../utils/get-nth-fibonacci-number-loop.js";
// For module type workers, but for some reason it doesn't work in Firefox
// SyntaxError: import declarations may only appear at top level of a module
importScripts("../utils/get-nth-fibonacci-number-recursion.js");
importScripts("../utils/get-nth-fibonacci-number-loop.js");

onmessage = async function (event) {
  console.log("Worker is running");
  // console.log("self: ", self); // The same for this
  const inputValue = event.data;
  const n = getNthFibonacciNumberRecursion(event.data);
  postMessage([inputValue, n]);

  // ReferenceError: document is not defined at onmessage
  // const a = document.querySelector(".page_container");

  // fetch is accessible from inside workers
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const posts = await response.json();

  console.log(posts);

  // To "kill" the web worker from inside the worker
  // close();
};
