// =========================================================================
// ЗАВДАННЯ 1: Функціональні ТАБИ на сторінці HTML засобами DOM API
// =========================================================================

const tabsData = {
    1: {
        title: "Веб-дизайн та прототипування інтерфейсів",
        description: "Розробка візуальної концепції вебсайту, побудова каркасних моделей (wireframes) та адаптивних макетів із урахуванням принципів UX.",
        items: [
            "Проєктування модульних сіток та композиції",
            "Підбір типографіки та гармонійної колірної палітри",
            "Адаптація під мобільні та десктопні екрани"
        ],
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
        bgColor: "#f8fafc"
    },
    2: {
        title: "Frontend-розробка на JavaScript та DOM API",
        description: "Створення інтерактивних елементів сторінки, динамічна зміна структури HTML-документа та керування стилями CSS у реальному часі.",
        items: [
            "Пошук та модифікація вузлів через getElementById та querySelector",
            "Обробка подій користувача (click, submit, input)",
            "Реалізація слайдерів, вкладок та модальних вікон"
        ],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
        bgColor: "#f0f9ff"
    },
    3: {
        title: "Серверна логіка та RESTful API",
        description: "Забезпечення надійного обміну даними між клієнтською частиною та сервером, автентифікація користувачів і захист запитів.",
        items: [
            "Проєктування архітектури маршрутів та контролерів",
            "Валідація вхідних даних на стороні сервера",
            "Інтеграція зовнішніх платіжних та поштових сервісів"
        ],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        bgColor: "#f0fdf4"
    },
    4: {
        title: "Проєктування та оптимізація баз даних",
        description: "Створення нормалізованих реляційних схем даних, написання ефективних SQL-запитів та резервне копіювання інформації.",
        items: [
            "Побудова ER-діаграм та зв'язків між сутностями",
            "Індексування таблиць для прискорення вибірки",
            "Забезпечення цілісності транзакцій"
        ],
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80",
        bgColor: "#fefce8"
    },
    5: {
        title: "Забезпечення якості та тестування (QA)",
        description: "Комплексна перевірка функціоналу вебдодатків, тестування валідації форм та виявлення помилок до публікації проєкту.",
        items: [
            "Функціональне та регресійне тестування інтерфейсу",
            "Перевірка граничних значень у полях введення",
            "Тестування швидкодії та кросбраузерності"
        ],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
        bgColor: "#fdf4ff"
    }
};

function info_for_tab(tabNumber) {
    const contentBlock = document.getElementById("tab-content-area");
    const data = tabsData[tabNumber];

    if (!contentBlock || !data) return;

    // Знімаємо активний клас з усіх заголовків табів
    for (let i = 1; i <= 5; i++) {
        const headerCell = document.getElementById("tab-btn-" + i);
        if (headerCell) {
            headerCell.classList.remove("active-tab");
        }
    }

    // Додаємо активний клас поточному табу
    const activeHeader = document.getElementById("tab-btn-" + tabNumber);
    if (activeHeader) {
        activeHeader.classList.add("active-tab");
    }

    // Формуємо список переваг
    const listHtml = data.items.map(item => `<li>${item}</li>`).join("");

    // Змінюємо внутрішній HTML та фоновий колір через DOM API
    contentBlock.style.backgroundColor = data.bgColor;
    contentBlock.innerHTML = `
        <div class="tab-content-layout">
            <img src="${data.image}" alt="${data.title}">
            <div class="tab-text-block">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <ul>${listHtml}</ul>
            </div>
        </div>
    `;
}


// =========================================================================
// ЗАВДАННЯ 2 та 3: Слайдер (Варіант 12)
// =========================================================================

let slideIndex = 1;

function plusSlide() {
    showSlides(slideIndex += 1);
}

function minusSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide-item");
    const bars = document.getElementsByClassName("slider-bar-item");

    if (slides.length === 0) return;

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < bars.length; i++) {
        bars[i].className = bars[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "flex";
    if (bars[slideIndex - 1]) {
        bars[slideIndex - 1].className += " active";
    }
}


// =========================================================================
// ЗАВДАННЯ 4: Валідація форми підбору будинку (за зразком рис. 5.3)
// =========================================================================

function updatePriceLabel(val) {
    document.getElementById("priceValue").innerText = val + "$";
}

function resetHouseForm() {
    const errorIds = [
        "err-lastName", "err-firstName", "err-houseEmail",
        "err-phone", "err-address", "err-housingType"
    ];
    errorIds.forEach(id => {
        document.getElementById(id).innerHTML = "";
    });
    document.getElementById("houseFormSuccess").innerHTML = "";
    document.getElementById("priceValue").innerText = "3500$";
}

function validateHouseForm() {
    // Очищаємо попередні повідомлення
    const errorIds = [
        "err-lastName", "err-firstName", "err-houseEmail",
        "err-phone", "err-address", "err-housingType"
    ];
    errorIds.forEach(id => {
        document.getElementById(id).innerHTML = "";
    });
    document.getElementById("houseFormSuccess").innerHTML = "";

    let isValid = true;

    const lastName = document.forms["houseForm"]["lastName"].value.trim();
    const firstName = document.forms["houseForm"]["name"].value.trim();
    const email = document.forms["houseForm"]["email"].value.trim();
    const phone = document.forms["houseForm"]["phone"].value.trim();
    const address = document.forms["houseForm"]["address"].value.trim();
    const housingTypes = document.forms["houseForm"]["housingType"];

    // Перевірка прізвища
    if (lastName.length === 0) {
        document.getElementById("err-lastName").innerHTML = "*дане поле обов’язкове для заповнення";
        isValid = false;
    } else if (lastName.length < 2) {
        document.getElementById("err-lastName").innerHTML = "*прізвище має містити щонайменше 2 символи";
        isValid = false;
    }

    // Перевірка імені
    if (firstName.length === 0) {
        document.getElementById("err-firstName").innerHTML = "*дане поле обов’язкове для заповнення";
        isValid = false;
    }

    // Перевірка email (перевірка @ і крапки та формату)
    const at = email.indexOf("@");
    const dot = email.lastIndexOf(".");
    if (email.length === 0) {
        document.getElementById("err-houseEmail").innerHTML = "*дане поле обов’язкове для заповнення";
        isValid = false;
    } else if (at < 1 || dot < at + 2 || dot + 2 >= email.length) {
        document.getElementById("err-houseEmail").innerHTML = "*email введено не вірно";
        isValid = false;
    }

    // Перевірка номера телефону
    const phoneRegex = /^\+380\d{9}$/;
    if (phone.length === 0) {
        document.getElementById("err-phone").innerHTML = "*вкажіть номер телефону";
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        document.getElementById("err-phone").innerHTML = "*формат номера: +380XXXXXXXXX";
        isValid = false;
    }

    // Перевірка адреси
    if (address.length === 0) {
        document.getElementById("err-address").innerHTML = "*вкажіть бажану адресу або район";
        isValid = false;
    }

    // Перевірка вибору типу житла (radio)
    let typeSelected = false;
    for (let i = 0; i < housingTypes.length; i++) {
        if (housingTypes[i].checked) {
            typeSelected = true;
            break;
        }
    }
    if (!typeSelected) {
        document.getElementById("err-housingType").innerHTML = "*оберіть тип житла";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("houseFormSuccess").innerHTML = "Заявку на підбір житла успішно перевірено та відправлено!";
    }

    return false; // Запобігаємо перезавантаженню сторінки для демонстрації результату
}


// =========================================================================
// ЗАВДАННЯ 5: Валідація форм реєстрації та авторизації
// =========================================================================

function validateRegisterForm() {
    document.getElementById("err-regLogin").innerHTML = "";
    document.getElementById("err-regEmail").innerHTML = "";
    document.getElementById("err-regPassword").innerHTML = "";
    document.getElementById("err-regPasswordConfirm").innerHTML = "";
    document.getElementById("regSuccess").innerHTML = "";

    const login = document.getElementById("regLogin").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const passwordConfirm = document.getElementById("regPasswordConfirm").value;

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

    let isValid = true;

    if (login.length < 4) {
        document.getElementById("err-regLogin").innerHTML = "*логін повинен містити щонайменше 4 символи";
        isValid = false;
    }

    if (email === "") {
        document.getElementById("err-regEmail").innerHTML = "*поле Email обов'язкове для заповнення";
        isValid = false;
    } else if (!email.match(emailRegex)) {
        document.getElementById("err-regEmail").innerHTML = "*введіть коректну адресу електронної пошти";
        isValid = false;
    }

    if (password === "") {
        document.getElementById("err-regPassword").innerHTML = "*введіть пароль";
        isValid = false;
    } else if (!password.match(passwordRegex)) {
        document.getElementById("err-regPassword").innerHTML = "*пароль має містити мінімум 6 символів, літеру та цифру";
        isValid = false;
    }

    if (passwordConfirm !== password || passwordConfirm === "") {
        document.getElementById("err-regPasswordConfirm").innerHTML = "*паролі не співпадають";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("regSuccess").innerHTML = "Реєстрація успішна! Обліковий запис створено.";
    }

    return false;
}

function validateLoginForm() {
    document.getElementById("err-loginEmail").innerHTML = "";
    document.getElementById("err-loginPassword").innerHTML = "";
    document.getElementById("loginSuccess").innerHTML = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

    let isValid = true;

    if (email === "") {
        document.getElementById("err-loginEmail").innerHTML = "*поле Email має бути заповнене";
        isValid = false;
    } else if (!email.match(emailRegex)) {
        document.getElementById("err-loginEmail").innerHTML = "*введіть коректну адресу Email";
        isValid = false;
    }

    if (password === "") {
        document.getElementById("err-loginPassword").innerHTML = "*поле пароля має бути заповнене";
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById("err-loginPassword").innerHTML = "*пароль повинен містити не менше 6 символів";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("loginSuccess").innerHTML = "Авторизація пройшла успішно!";
    }

    return false;
}

// Ініціалізація першого табу та першого слайду після завантаження DOM
document.addEventListener("DOMContentLoaded", function () {
    info_for_tab(1);
    showSlides(slideIndex);
});
