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

class Shoe extends Product {
    constructor(name, amount, image) {
        super(name, 'shoe', amount, image);
    }
}

class Grocerie extends Product {
    constructor(name, amount, image) {
        super(name, 'grocerie', amount, image);
    }
}

function productFactory(item) {
    if (item.category === 'shoe') {
        return new Shoe(item.name, item.amount, item.image);
    }
    if (item.category === 'grocerie') {
        return new Grocerie(item.name, item.amount, item.image);
    }
    throw new Error(`Невідома категорія: ${item.category}`);
}

class Basket {
    products = [];

    add(product) {
        const addedTime = new Date().toLocaleTimeString('uk-UA', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const entry = {
            product: product,
            addedAt: addedTime
        };

        this.products.push(entry);
        product.addToBasket();
        this.renderAddedItem(entry);
    }

    renderAddedItem(entry) {
        const basketList = document.getElementById('basket-list');
        const basketCounter = document.getElementById('basket-counter');

        const emptyPlaceholder = basketList.querySelector('.cart-empty');
        if (emptyPlaceholder) {
            emptyPlaceholder.remove();
        }

        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <img src="${entry.product.image}" alt="${entry.product.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${entry.product.name}</div>
                <div class="cart-item-meta">Час додавання: <strong>${entry.addedAt}</strong> • ${entry.product.category}</div>
            </div>
        `;

        basketList.appendChild(li);
        basketCounter.textContent = `${this.products.length} од.`;
    }
}

class Store {
    products = [];

    constructor() {
        this.basket = new Basket();
    }

    fillStoreWithProducts(data) {
        this.products = data.map(item => productFactory(item));
        this.renderProducts();
    }

    addToBasket(index) {
        const product = this.products[index];

        if (!product || product.amount <= 0) {
            return;
        }

        product.amount -= 1;

        const singleUnit = productFactory({
            name: product.name,
            category: product.category,
            amount: 1,
            image: product.image
        });

        this.basket.add(singleUnit);
        this.renderProducts();
    }

    renderProducts() {
        const container = document.getElementById('products-container');
        container.innerHTML = '';

        this.products.forEach((product, index) => {
            const isEmpty = product.amount <= 0;

            const card = document.createElement('article');
            card.className = 'gadget-card';
            card.innerHTML = `
                <img class="gadget-img" src="${product.image}" alt="${product.name}">
                <div class="gadget-body">
                    <span class="tag ${product.category}">${product.category}</span>
                    <h3 class="gadget-name">${product.name}</h3>
                    <p class="gadget-stock ${isEmpty ? 'out' : ''}">
                        Залишок: <strong>${product.amount} шт.</strong>
                    </p>
                    <button class="btn-buy" ${isEmpty ? 'disabled' : ''}>
                        ${isEmpty ? 'Закінчився' : 'У кошик'}
                    </button>
                </div>
            `;

            const btn = card.querySelector('.btn-buy');
            btn.addEventListener('click', () => this.addToBasket(index));

            container.appendChild(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const store = new Store();

    fetch('products.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('Не вдалося завантажити products.json');
            }
            return res.json();
        })
        .then(data => store.fillStoreWithProducts(data))
        .catch(err => {
            console.error(err);
            document.getElementById('products-container').innerHTML =
                `<p style="color: #f87171;">Помилка завантаження products.json. Запустіть сторінку через локальний сервер (наприклад, Live Server).</p>`;
        });
});
