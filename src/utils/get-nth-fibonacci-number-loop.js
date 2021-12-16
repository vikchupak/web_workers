const getNthFibonacciNumberLoop = (n) => {
    let first = 0;
    let second = 1;
    let sumOfPrevTwo;

    if (n <= 1) return n

    for (let i = 2; i <= n; i++) {
        sumOfPrevTwo = first + second;
        first = second;
        second = sumOfPrevTwo;
    }
    return sumOfPrevTwo
};
