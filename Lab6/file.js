<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Лабораторна робота №6 — Варіант 12</title>
</head>
<body>
    <h1>Лабораторна робота №6</h1>
    <h2>Варіант 12: Опитування щодо жанрів книг</h2>

    <script>
        // Масив об'єктів із оновленим списком книг та їх жанрами
        const books = [
            { title: "Гаррі Поттер", genre: "фентезі" },
            { title: "Шерлок Холмс", genre: "детектив" },
            { title: "Мартін Іден", genre: "роман" }
        ];

        // 1. За допомогою confirm() запитуємо згоду користувача
        let isReady = confirm("Бажаєте пройти опитування щодо жанрів книг (3 питання)?");

        if (isReady) {
            let correctAnswersCount = 0;

            // Цикл для 3 питань
            for (let i = 0; i < books.length; i++) {
                let currentBook = books[i];

                // 2. Отримуємо відповідь через prompt()
                let userInput = prompt(`Питання ${i + 1} з 3:\nВкажіть жанр для книги "${currentBook.title}":`);

                // Перевірка на скасування або порожній ввід
                if (userInput === null || userInput.trim() === "") {
                    alert(`Ви не ввели відповідь для книги "${currentBook.title}". Питання пропущено.`);
                    continue;
                }

                // Нормалізація введених даних (видалення пробілів та приведення до нижнього регістру)
                let formattedInput = userInput.trim().toLowerCase();

                // 3. Перевірка правильності відповіді та виведення через alert()
                if (formattedInput === currentBook.genre) {
                    alert(`Вірно! Жанр книги "${currentBook.title}" — справді ${currentBook.genre}.`);
                    correctAnswersCount++;
                } else {
                    alert(`Невірно! Для книги "${currentBook.title}" правильний жанр — ${currentBook.genre}. (Ви вказали: "${userInput.trim()}")`);
                }
            }

            // Виведення підсумкового результату
            alert(`Опитування завершено! Ваш результат: ${correctAnswersCount} з ${books.length} правильних відповідей.`);

            document.write(`<h3>Результати опитування:</h3>`);
            document.write(`<p>Ви відповіли правильно на <strong>${correctAnswersCount}</strong> з <strong>${books.length}</strong> питань.</p>`);

        } else {
            alert("Ви відмовилися від проходження опитування.");
            document.write("<p>Опитування скасовано користувачем.</p>");
        }
    </script>
</body>
</html>
