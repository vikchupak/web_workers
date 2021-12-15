export const getNthFibonacciNumberRecursion = (n) => {
    if (n <= 1) return n; // base case
    return getNthFibonacciNumberRecursion(n - 1) + getNthFibonacciNumberRecursion(n - 2);
};
