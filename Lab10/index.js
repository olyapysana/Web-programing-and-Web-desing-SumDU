const API_BASE = 'https://dummyjson.com';

const categoriesListEl = document.getElementById('categories-list');
const productsGridEl = document.getElementById('products-grid');
const productsHeadingEl = document.getElementById('products-heading');
const productsCountEl = document.getElementById('products-count');
const statusTextEl = document.getElementById('status-text');
const seeAllBtnEl = document.getElementById('see-all-btn');

const modalEl = document.getElementById('product-modal');
const modalBodyEl = document.getElementById('modal-body');
const closeModalBtnEl = document.getElementById('close-modal-btn');

let activeCategorySlug = null;

function setStatus(message, isError = false) {
    statusTextEl.textContent = message;
    statusTextEl.classList.toggle('error', isError);
}

function setActiveCategoryUI(slug) {
    activeCategorySlug = slug;
    const buttons = categoriesListEl.querySelectorAll('.category-btn');
    buttons.forEach((btn) => {
        btn.classList.toggle('active', slug !== null && btn.dataset.slug === slug);
    });
    seeAllBtnEl.classList.toggle('active', slug === null);
}

function renderCategories(categories) {
    categoriesListEl.innerHTML = '';

    categories.forEach((category) => {
        const slug = typeof category === 'string' ? category : category.slug;
        const name = typeof category === 'string' ? category : category.name;

        const li = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'category-btn';
        button.dataset.slug = slug;
        button.textContent = name;

        button.addEventListener('click', () => {
            fetchProductsByCategory(slug, name);
        });

        li.appendChild(button);
        categoriesListEl.appendChild(li);
    });

    setActiveCategoryUI(activeCategorySlug);
}

function renderProducts(products, titleText) {
    productsHeadingEl.textContent = titleText;
    productsCountEl.textContent = `Знайдено: ${products.length}`;
    productsGridEl.innerHTML = '';

    if (!products.length) {
        productsGridEl.innerHTML = '<p class="empty-state">У цій категорії товарів немає.</p>';
        return;
    }

    products.forEach((product) => {
        const card = document.createElement('article');
        card.className = 'product-card';

        const img = document.createElement('img');
        img.className = 'product-image';
        img.src = product.thumbnail;
        img.alt = product.title;
        img.loading = 'lazy';

        const body = document.createElement('div');
        body.className = 'product-body';

        const categoryLabel = document.createElement('span');
        categoryLabel.className = 'product-category';
        categoryLabel.textContent = product.category;

        const title = document.createElement('h3');
        title.className = 'product-title';
        title.textContent = product.title;

        const description = document.createElement('p');
        description.className = 'product-description';
        description.textContent = product.description;

        const footer = document.createElement('div');
        footer.className = 'product-footer';

        const price = document.createElement('span');
        price.className = 'product-price';
        price.textContent = `$${product.price}`;

        const rating = document.createElement('span');
        rating.className = 'product-rating';
        rating.textContent = `★ ${product.rating}`;

        footer.append(price, rating);
        body.append(categoryLabel, title, description, footer);
        card.append(img, body);

        card.addEventListener('click', () => {
            fetchProductById(product.id);
        });

        productsGridEl.appendChild(card);
    });
}

function openProductModal(product) {
    modalBodyEl.innerHTML = `
        <div class="modal-grid">
            <img src="${product.thumbnail}" alt="${product.title}" class="modal-image">
            <div class="modal-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.title}</h3>
                <p class="modal-brand">Бренд: <strong>${product.brand || 'Не вказано'}</strong></p>
                <p class="modal-desc">${product.description}</p>
                <div class="modal-meta">
                    <span class="product-price">$${product.price}</span>
                    <span class="product-rating">★ ${product.rating}</span>
                    <span>Наявність: ${product.stock} шт.</span>
                </div>
            </div>
        </div>
    `;
    modalEl.classList.remove('hidden');
}

function closeProductModal() {
    modalEl.classList.add('hidden');
}

async function fetchProducts() {
    try {
        setStatus('Завантаження усіх товарів...');
        const res = await fetch(`${API_BASE}/products?limit=100`);
        if (!res.ok) {
            throw new Error(`Помилка HTTP: ${res.status}`);
        }
        const data = await res.json();
        const products = Array.isArray(data) ? data : data.products;

        console.log('All products:', data);
        setActiveCategoryUI(null);
        renderProducts(products, 'Усі товари');
        setStatus('Готово');
        return products;
    } catch (error) {
        console.error('Помилка під час завантаження товарів:', error);
        setStatus('Не вдалося завантажити товари', true);
    }
}

async function fetchProductById(id) {
    try {
        setStatus(`Завантаження товару #${id}...`);
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) {
            throw new Error(`Помилка HTTP: ${res.status}`);
        }
        const product = await res.json();

        console.log('Product by id:', product);
        openProductModal(product);
        setStatus('Готово');
        return product;
    } catch (error) {
        console.error(`Помилка під час завантаження товару ${id}:`, error);
        setStatus('Не вдалося завантажити деталі товару', true);
    }
}

async function fetchCategories() {
    try {
        setStatus('Завантаження категорій...');
        const res = await fetch(`${API_BASE}/products/categories`);
        if (!res.ok) {
            throw new Error(`Помилка HTTP: ${res.status}`);
        }
        const categories = await res.json();

        console.log('Categories:', categories);
        renderCategories(categories);
        setStatus('Готово');
        return categories;
    } catch (error) {
        console.error('Помилка під час завантаження категорій:', error);
        setStatus('Не вдалося завантажити категорії', true);
    }
}

async function fetchProductsByCategory(slug, categoryName) {
    try {
        setStatus(`Завантаження категорії "${categoryName}"...`);
        const res = await fetch(`${API_BASE}/products/category/${encodeURIComponent(slug)}`);
        if (!res.ok) {
            throw new Error(`Помилка HTTP: ${res.status}`);
        }
        const data = await res.json();
        const products = Array.isArray(data) ? data : data.products;

        console.log(`Products in category ${slug}:`, data);
        setActiveCategoryUI(slug);
        renderProducts(products, `Категорія: ${categoryName}`);
        setStatus('Готово');
        return products;
    } catch (error) {
        console.error(`Помилка під час завантаження категорії ${slug}:`, error);
        setStatus('Не вдалося завантажити товари категорії', true);
    }
}

seeAllBtnEl.addEventListener('click', () => {
    fetchProducts();
});

closeModalBtnEl.addEventListener('click', closeProductModal);

modalEl.addEventListener('click', (event) => {
    if (event.target === modalEl) {
        closeProductModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modalEl.classList.contains('hidden')) {
        closeProductModal();
    }
});

Promise.all([fetchCategories(), fetchProducts()]);
