// ==========================================
// ЗАВДАННЯ 1 (Введення чисел через кому в одне віконце)
// ==========================================
function operation(arr) {
    let manipulation = "";
    let result = 0;

    if (arr.length % 2 === 0) {
        manipulation = "сумування";
        for (let i = 0; i < arr.length; i++) {
            result += arr[i];
        }
    } else {
        manipulation = "віднімання (від останнього до першого)";
        result = arr[arr.length - 1];
        for (let j = arr.length - 2; j >= 0; j--) {
            result -= arr[j];
        }
    }
    return { name: manipulation, res: result };
}

function runTask1() {
    let input = prompt("Завдання 1\nВведіть числа через кому (наприклад: 2, 5, 8, 4):");
    let container = document.getElementById("resultTask1");

    if (!input || input.trim() === "") {
        return;
    }

    // Розбиваємо рядок за комою та перетворюємо на числа
    let arr = input.split(",").map(item => parseFloat(item.trim().replace(",", ".")));

    // Перевіряємо, чи всі елементи є числами
    if (arr.some(isNaN)) {
        alert("Помилка: одне або кілька значень не є числами!");
        container.innerHTML = "<b>Помилка:</b> Некоректне введення даних.";
        return;
    }

    if (arr.length < 2) {
        alert("Потрібно ввести щонайменше 2 числа!");
        container.innerHTML = "<b>Помилка:</b> Введено менше 2 чисел.";
        return;
    }

    let calc = operation(arr);
    container.innerHTML = `
        <b>Введені числа:</b> ${arr.join(", ")}<br>
        <b>Операція:</b> ${calc.name}<br>
        <b>Результат:</b> ${calc.res}
    `;
}


// ==========================================
// ЗАВДАННЯ 2 (Факторіал через рекурсію)
// ==========================================
function factorialRecursion(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorialRecursion(n - 1);
}

function runTask2() {
    let inputString = prompt("Завдання 2\nВведіть ціле невід'ємне число для факторіалу:");
    let container = document.getElementById("resultTask2");

    if (inputString === null || inputString === "") {
        return;
    }

    let n = parseInt(inputString.trim());

    if (isNaN(n) || n < 0) {
        alert("Увага: введено некоректне або від'ємне число!");
        container.innerHTML = "<b>Помилка:</b> Введіть невід'ємне ціле число.";
        return;
    }

    let result = factorialRecursion(n);
    container.innerHTML = `
        <b>Введене число:</b> ${n}<br>
        <b>Факторіал:</b> ${result}
    `;
}


// ==========================================
// ЗАВДАННЯ 3 (Числа Фібоначчі: рекурсія проти мемоїзації)
// ==========================================
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

    return function fib(numberInRow) {
        numberOfMemoCalls++;
        if (numberInRow <= 1) {
            return 1;
        }
        if (cache[numberInRow] !== undefined) {
            return cache[numberInRow];
        }
        cache[numberInRow] = fib(numberInRow - 1) + fib(numberInRow - 2);
        return cache[numberInRow];
    };
}

function runTask3() {
    let inputString = prompt("Завдання 3\nВведіть номер числа Фібоначчі (наприклад, 5 або 10):");
    let container = document.getElementById("resultTask3");

    if (inputString === null || inputString === "") {
        return;
    }

    let number = parseInt(inputString.trim());

    if (isNaN(number) || number < 0) {
        alert("Увага: введено некоректне число!");
        container.innerHTML = "<b>Помилка:</b> Введіть додатне ціле число.";
        return;
    }

    // Скидаємо лічильники викликів перед запуском
    numberOfRecusrionCalls = 0;
    numberOfMemoCalls = 0;

    let resRec = fibonachiRecursion(number);
    
    const fibonachiMemo = createFibonachiMemo();
    let resMemo = fibonachiMemo(number);

    container.innerHTML = `
        <b>Номер числа:</b> ${number}<br>
        <b>Звичайна рекурсія:</b> результат = ${resRec} | Кількість викликів = ${numberOfRecusrionCalls}<br>
        <b>Мемоїзація:</b> результат = ${resMemo} | Кількість викликів = ${numberOfMemoCalls}
    `;
}
