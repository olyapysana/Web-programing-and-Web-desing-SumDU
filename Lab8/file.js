// =========================================================================
// ЗАВДАННЯ 1: Функціональні ТАБИ на сторінці HTML засобами DOM API
// (Тематика курсової: Магазин портативної електроніки)
// =========================================================================

const tabsData = {
    1: {
        title: "Смартфони та флагманські пристрої",
        description: "Найсучасніші смартфони з потужними процесорами, професійними камерами та яскравими AMOLED-дисплеями для щоденного використання та ігор.",
        items: [
            "Підтримка мереж 5G та швидка зарядка",
            "Висока автономність та ємні акумулятори",
            "Офіційна гарантія виробника від 12 місяців"
        ],
        image: "img/tab1.jpg",
        bgColor: "#f8fafc"
    },
    2: {
        title: "Бездротові навушники та аудіо",
        description: "Якісний звук, активне шумозаглушення (ANC) та ергономічний дизайн для комфортного прослуховування музики в будь-яких умовах.",
        items: [
            "Глибокий бас та кристально чисті високі частоти",
            "До 30 годин автономної роботи з кейсом",
            "Зручне сенсорне керування та захист від вологи"
        ],
        image: "img/tab2.jpg",
        bgColor: "#f0f9ff"
    },
    3: {
        title: "Смарт-годинники та фітнес-трекери",
        description: "Стежте за своїм здоров'ям, спортивними досягненнями та залишайтеся на зв'язку завдяки розумним гаджетам на зап'ясті.",
        items: [
            "Цілодобовий моніторинг пульсу, рівня кисню в крові та сну",
            "Десятків спортивних режимів для тренувань",
            "Стильні змінні ремінці та металеві корпуси"
        ],
        image: "img/tab3.jpg",
        bgColor: "#f0fdf4"
    },
    4: {
        title: "Планшети для роботи та творчості",
        description: "Мобільні та продуктивні пристрої з великими екранами для перегляду контенту, малювання, навчання та мобільного офісу.",
        items: [
            "Підтримка стилусів та клавіатур",
            "Потужні чипсети для роботи з важкими програмами",
            "Легкий та тонкий алюмінієвий корпус"
        ],
        image: "img/tab4.jpg",
        bgColor: "#fefce8"
    },
    5: {
        title: "Портативні акумулятори та аксесуари",
        description: "Корисні доповнення для вашої електроніки: павербанки, швидкі зарядні пристрої, кабелі та надійні захисні чохли.",
        items: [
            "Технології швидкої зарядки Power Delivery та Quick Charge",
            "Захист від перегріву та стрибків напруги",
            "Компактні розміри для подорожей"
        ],
        image: "img/tab5.jpg",
        bgColor: "#fdf4ff"
    }
};

function info_for_tab(tabNumber) {
    const contentBlock = document.getElementById("tab-content-area");
    const data = tabsData[tabNumber];

    if (!contentBlock || !data) return;

    for (let i = 1; i <= 5; i++) {
        const headerCell = document.getElementById("tab-btn-" + i);
        if (headerCell) {
            headerCell.classList.remove("active-tab");
        }
    }

    const activeHeader = document.getElementById("tab-btn-" + tabNumber);
    if (activeHeader) {
        activeHeader.classList.add("active-tab");
    }

    const listHtml = data.items.map(item => `<li>${item}</li>`).join("");

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
// ЗАВДАННЯ 2 та 3: Слайдер (Варіант 12 — Електроніка)
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
// ЗАВДАННЯ 4: Валідація форми підбору гаджета в магазині
// =========================================================================

function updatePriceLabel(val) {
    document.getElementById("priceValue").innerText = val + " грн";
}

function resetHouseForm() {
    const errorIds = [
        "err-lastName", "err-firstName", "err-houseEmail",
        "err-phone", "err-address", "err-housingType"
    ];
    errorIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = "";
    });
    const successEl = document.getElementById("houseFormSuccess");
    if (successEl) successEl.innerHTML = "";
    const priceVal = document.getElementById("priceValue");
    if (priceVal) priceVal.innerText = "15000 грн";
}

function validateHouseForm() {
    const errorIds = [
        "err-lastName", "err-firstName", "err-houseEmail",
        "err-phone", "err-address", "err-housingType"
    ];
    errorIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = "";
    });
    const successEl = document.getElementById("houseFormSuccess");
    if (successEl) successEl.innerHTML = "";

    let isValid = true;

    const lastName = document.forms["houseForm"]["lastName"].value.trim();
    const firstName = document.forms["houseForm"]["name"].value.trim();
    const email = document.forms["houseForm"]["email"].value.trim();
    const phone = document.forms["houseForm"]["phone"].value.trim();
    const address = document.forms["houseForm"]["address"].value.trim();
    const housingTypes = document.forms["houseForm"]["housingType"];

    if (lastName.length === 0) {
        document.getElementById("err-lastName").innerHTML = "*дане поле обов’язкове для заповнення";
        isValid = false;
    } else if (lastName.length < 2) {
        document.getElementById("err-lastName").innerHTML = "*прізвище має містити щонайменше 2 символи";
        isValid = false;
    }

    if (firstName.length === 0) {
        document.getElementById("err-firstName").innerHTML = "*дане поле обов’язкове для заповнення";
        isValid = false;
    }

    const at = email.indexOf("@");
    const dot = email.lastIndexOf(".");
    if (email.length === 0) {
        document.getElementById("err-houseEmail").innerHTML = "*дане поле обов’язкове для заповнення";
        isValid = false;
    } else if (at < 1 || dot < at + 2 || dot + 2 >= email.length) {
        document.getElementById("err-houseEmail").innerHTML = "*email введено не вірно";
        isValid = false;
    }

    const phoneRegex = /^\+380\d{9}$/;
    if (phone.length === 0) {
        document.getElementById("err-phone").innerHTML = "*вкажіть номер телефону";
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        document.getElementById("err-phone").innerHTML = "*формат номера: +380XXXXXXXXX";
        isValid = false;
    }

    if (address.length === 0) {
        document.getElementById("err-address").innerHTML = "*вкажіть відділення Нової Пошти або місто";
        isValid = false;
    }

    let typeSelected = false;
    for (let i = 0; i < housingTypes.length; i++) {
        if (housingTypes[i].checked) {
            typeSelected = true;
            break;
        }
    }
    if (!typeSelected) {
        document.getElementById("err-housingType").innerHTML = "*оберіть категорію товару";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("houseFormSuccess").innerHTML = "Замовлення на гаджет успішно оформлено! Очікуйте дзвінка менеджера.";
    }

    return false;
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
        document.getElementById("regSuccess").innerHTML = "Реєстрація покупця успішна!";
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
        document.getElementById("loginSuccess").innerHTML = "Авторизація покупця успішна!";
    }

    return false;
}

document.addEventListener("DOMContentLoaded", function () {
    info_for_tab(1);
    showSlides(slideIndex);
});
