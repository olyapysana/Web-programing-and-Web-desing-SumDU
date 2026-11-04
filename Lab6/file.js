// --- ЗАВДАННЯ 1: Опитування щодо жанрів книг ---
const books = [
    { title: "Гаррі Поттер", genre: "фентезі" },
    { title: "Шерлок Холмс", genre: "детектив" },
    { title: "Мартін Іден", genre: "роман" }
];

let isReady = confirm("Бажаєте пройти опитування щодо жанрів книг (3 питання)?");

if (isReady) {
    let correctAnswersCount = 0;

    for (let i = 0; i < books.length; i++) {
        let currentBook = books[i];
        let userInput = prompt(`Питання ${i + 1} з 3:\nВкажіть жанр для книги "${currentBook.title}":`);

        if (userInput === null || userInput.trim() === "") {
            alert(`Ви не ввели відповідь для книги "${currentBook.title}". Питання пропущено.`);
            continue;
        }

        let formattedInput = userInput.trim().toLowerCase();

        if (formattedInput === currentBook.genre) {
            alert(`Вірно! Жанр книги "${currentBook.title}" — справді ${currentBook.genre}.`);
            correctAnswersCount++;
        } else {
            alert(`Невірно! Для книги "${currentBook.title}" правильний жанр — ${currentBook.genre}. (Ви вказали: "${userInput.trim()}")`);
        }
    }

    alert(`Опитування завершено! Ваш результат: ${correctAnswersCount} з ${books.length} правильних відповідей.`);
    
    // Виводимо результати опитування в кінець сторінки або у відповідний блок
    document.write(`<h3>Результати опитування:</h3>`);
    document.write(`<p>Ви відповіли правильно на <strong>${correctAnswersCount}</strong> з <strong>${books.length}</strong> питань.</p>`);
} else {
    alert("Ви відмовилися від проходження опитування.");
    document.write("<p>Опитування скасовано користувачем.</p>");
}


// --- ЗАВДАННЯ 2: Випадкова кількість блоків (від 6 до 10) ---
let blocksCount = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
let blocksContainer = document.querySelector(".container-blocks");

for (let i = 0; i < blocksCount; i++) {
    let block = document.createElement("div");
    block.className = "dynamic-block";
    block.title = "Блок №" + (i + 1);
    blocksContainer.appendChild(block);
}


// --- ЗАВДАННЯ 3 Таблиця товарів із розрахунком суми ---
const products = [
    { code: "101", name: "Хліб", price: 40, quantity: 4 },
    { code: "102", name: "Ковбаса", price: 120, quantity: 6 },
    { code: "103", name: "Сир", price: 85, quantity: 3 },
    { code: "104", name: "Помідор", price: 24, quantity: 5 },
    { code: "105", name: "Майонез", price: 70, quantity: 2 }
];

let grandTotal = 0;
let tableContainer = document.querySelector(".table-container");

let tableHTML = '<table class="goods-table">';
tableHTML += '<tr><th>Код</th><th>Найменування товару</th><th>Ціна за од. (грн)</th><th>Кількість</th><th>Сума (грн)</th></tr>';

for (let i = 0; i < products.length; i++) {
    let item = products[i];
    let itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;

    tableHTML += '<tr>';
    tableHTML += '<td>' + item.code + '</td>';
    tableHTML += '<td class="text-left">' + item.name + '</td>';
    tableHTML += '<td>' + item.price + '</td>';
    tableHTML += '<td>' + item.quantity + '</td>';
    tableHTML += '<td><strong>' + itemTotal + '</strong></td>';
    tableHTML += '</tr>';
}

tableHTML += '<tr class="total-row">';
tableHTML += '<td colspan="4" class="text-right">Всього до сплати:</td>';
tableHTML += '<td>' + grandTotal + ' грн</td>';
tableHTML += '</tr>';

tableHTML += '</table>';

tableContainer.innerHTML = tableHTML;
