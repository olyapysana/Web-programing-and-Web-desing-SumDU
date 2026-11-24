// Батьківський клас Product
class Product {
    constructor(name, category, amount, image) {
        this.name = name;
        this.category = category;
        this.amount = amount;
        this.image = image;
    }

    addToBasket() {
        console.log(`Product with name ${this.name} has been added to the basket`);
    }
}

// 3 дочірні класи для категорій «Портативна електроніка»
class AudioDevice extends Product {
    constructor(name, amount, image) {
        super(name, "audio", amount, image);
    }
}

class PowerDevice extends Product {
    constructor(name, amount, image) {
        super(name, "power", amount, image);
    }
}

class PortableGadget extends Product {
    constructor(name, amount, image) {
        super(name, "gadgets", amount, image);
    }
}

// Функція створює об'єкт відповідного класу
function productFactory(item) {
    if (item.category === "audio") {
        return new AudioDevice(item.name, item.amount, item.image);
    } else if (item.category === "power") {
        return new PowerDevice(item.name, item.amount, item.image);
    } else if (item.category === "gadgets") {
        return new PortableGadget(item.name, item.amount, item.image);
    }

    throw new Error(`Невідома категорія товару: ${item.category}`);
}

// Клас Кошик
class Basket {
    constructor() {
        this.products = [];
    }

    add(product) {
        // Фіксуємо час додавання товару
        let now = new Date();
        let timeString = now.toLocaleTimeString("uk-UA");

        // Створюємо запис для кошика
        let basketItem = {
            product: { ...product },
            addedTime: timeString
        };

        this.products.push(basketItem);
        product.addToBasket();

        // Виводимо вміст кошика на вебсторінку
        this.renderBasket();
    }

    renderBasket() {
        let basketList = document.getElementById("basket-list");
        let basketCount = document.getElementById("basket-count");
        basketList.innerHTML = "";

        if (this.products.length === 0) {
            basketList.innerHTML = "<p class='empty-msg'>Кошик порожній. Додайте товари з каталогу.</p>";
            basketCount.innerHTML = "0";
            return;
        }

        for (let i = 0; i < this.products.length; i++) {
            let item = this.products[i];
            basketList.innerHTML += `
                <div class="basket-item">
                    <div>
                        <strong>${i + 1}. ${item.product.name}</strong><br>
                        <small>Категорія: ${item.product.category}</small>
                    </div>
                    <div class="basket-time">Додано о: ${item.addedTime}</div>
                </div>
            `;
        }

        basketCount.innerHTML = this.products.length;
    }
}

// Головний клас Store
class Store {
    constructor() {
        this.products = [];
        this.basket = new Basket();
    }

    // Заповнюємо магазин товарами через productFactory
    fillStoreWithProducts(jsonData) {
        for (let i = 0; i < jsonData.length; i++) {
            let productObj = productFactory(jsonData[i]);
            this.products.push(productObj);
        }
        this.renderStore();
    }

    // Додавання товару в кошик зі зменшенням кількості в магазині
    addProductToBasket(index) {
        let selectedProduct = this.products[index];

        // Не можна додати більше товарів, ніж є в магазині
        if (selectedProduct.amount > 0) {
            selectedProduct.amount -= 1;
            this.basket.add(selectedProduct);
            this.renderStore(); // Оновлюємо залишок на картці товару
        } else {
            alert(`Товар «${selectedProduct.name}» закінчився на складі!`);
        }
    }

    // Виведення товарів магазину на сторінку
    renderStore() {
        let catalogContainer = document.getElementById("catalog-container");
        catalogContainer.innerHTML = "";

        for (let i = 0; i < this.products.length; i++) {
            let p = this.products[i];
            let disabledAttr = p.amount === 0 ? "disabled" : "";
            let btnText = p.amount === 0 ? "Немає в наявності" : "Додати у кошик";

            catalogContainer.innerHTML += `
                <div class="product-card">
                    <span class="badge">${p.category}</span>
                    <img src="${p.image}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p class="amount">В наявності: <strong>${p.amount} шт.</strong></p>
                    <button onclick="store.addProductToBasket(${i})" ${disabledAttr}>${btnText}</button>
                </div>
            `;
        }
    }
}

// Створення об'єкта магазину
const store = new Store();

// Завантаження даних з JSON при завантаженні сторінки
window.onload = async function () {
    try {
        const response = await fetch("products.json");
        const productsData = await response.json();

        store.fillStoreWithProducts(productsData);
    } catch (error) {
        console.error("Помилка завантаження товарів:", error);
    }
};
