// --- Завдання 1 ---
console.log("=== Завдання 1 ===");
function sumOrMinus(...args) {
    if (args.length === 0) return 0;
    
    if (args.length % 2 === 0) {
        return args.reduce((sum, num) => sum + num, 0);
    } else {
        let result = args[args.length - 1];
        for (let i = args.length - 2; i >= 0; i--) {
            result -= args[i];
        }
        return result;
    }
}

console.log("sumOrMinus(1, 2, 3) =", sumOrMinus(1, 2, 3));       // 0
console.log("sumOrMinus(2, 5, 8, 4) =", sumOrMinus(2, 5, 8, 4)); // 19
console.log("sumOrMinus(8, 1, 2) =", sumOrMinus(8, 1, 2));       // -7


// --- Завдання 2 ---
console.log("\n=== Завдання 2 ===");
function factorialRecursion(n) {
    if (n < 0) return undefined;
    if (n === 0 || n === 1) return 1;
    return n * factorialRecursion(n - 1);
}

console.log("factorialRecursion(0) =", factorialRecursion(0)); // 1
console.log("factorialRecursion(5) =", factorialRecursion(5)); // 120
console.log("factorialRecursion(7) =", factorialRecursion(7)); // 5040


// --- Завдання 3 ---
console.log("\n=== Завдання 3 ===");
let numberOfRecusrionCalls = 0;
let numberOfMemoCalls = 0;

function fibonachiRecursion(numberInRow) {
    numberOfRecusrionCalls++;

    if (numberInRow <= 1) {
        return 1;
    }

    return fibonachiRecursion(numberInRow - 1) + fibonachiRecursion(numberInRow - 2);
}

function createFibonachiMemo() {
    const cache = {};

    return function fibonachiMemo(numberInRow) {
        numberOfMemoCalls++;

        if (numberInRow in cache) {
            return cache[numberInRow];
        }

        if (numberInRow <= 1) {
            return 1;
        }

        cache[numberInRow] = fibonachiMemo(numberInRow - 1) + fibonachiMemo(numberInRow - 2);
        return cache[numberInRow];
    };
}

const fibonachiMemo = createFibonachiMemo();

console.log("Рекурсія:", fibonachiRecursion(5), "| Кількість викликів:", numberOfRecusrionCalls);
console.log("Мемоїзація:", fibonachiMemo(5), "| Кількість викликів:", numberOfMemoCalls);
