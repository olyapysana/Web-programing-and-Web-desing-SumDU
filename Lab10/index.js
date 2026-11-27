const BASE_URL = "https://dummyjson.com";

const categoriesListEl = document.getElementById("categories-list");
const productsGridEl = document.getElementById("products-grid");
const productsTitleEl = document.getElementById("products-title");
const productsCountEl = document.getElementById("products-count");
const seeAllBtnEl = document.getElementById("see-all-btn");
const statusTextEl = document.getElementById("status-text");

function setStatus(message) {
    if (statusTextEl) {
        statusTextEl.textContent = message;
    }
}

function setActiveCategoryButton(slugOrNull) {
    const buttons = categoriesListEl.querySelectorAll(".category-btn");
    buttons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.slug === slugOrNull);
    });

    if (seeAllBtnEl) {
        seeAllBtnEl.classList.toggle("active", slugOrNull === null);
    }
}

function renderCategories(categories) {
    categoriesListEl.innerHTML = "";

    categories.forEach((item) => {
        const slug = typeof item === "string" ? item : item.slug;
        const name = typeof item === "string" ? item.replace(/-/g, " ") : item.name;

        const li = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.className = "category-btn";
        button.dataset.slug = slug;
        button.textContent = name;

        button.addEventListener("click", async () => {
            await fetchProductsByCategory(slug, name);
        });

        li.appendChild(button);
        categoriesListEl.appendChild(li);
    });
}

function renderProducts(products, titleText) {
    productsTitleEl.textContent = titleText;
    productsCountEl.textContent = `Знайдено: ${products.length}`;
    productsGridEl.innerHTML = "";

    if (!products || products.length === 0) {
        productsGridEl.innerHTML = `<p class="empty-state">Товарів не знайдено.</p>`;
        return;
    }

    products.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";

        const thumbnail = product.thumbnail || (product.images && product.images[0]) || "";

        card.innerHTML = `
            <img src="${thumbnail}" alt="${product.title}" loading="lazy">
            <div>
                <div class="product-category">${product.category || ""}</div>
                <h3 class="product-title">${product.title}</h3>
            </div>
            <p class="product-description">${product.description || ""}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price}</span>
                <span class="product-rating">★ ${product.rating ?? "—"}</span>
            </div>
        `;

        productsGridEl.appendChild(card);
    });
}

async function fetchCategories() {
    try {
        setStatus("Завантаження категорій...");
        const res = await fetch(`${BASE_URL}/products/categories`);
        if (!res.ok) {
            throw new Error(`Помилка завантаження категорій: ${res.status}`);
        }

        const categories = await res.json();
        console.log("Categories:", categories);
        renderCategories(categories);
        return categories;
    } catch (error) {
        console.error(error);
        setStatus("Не вдалося завантажити категорії.");
        categoriesListEl.innerHTML = `<li class="empty-state">Помилка завантаження категорій</li>`;
    }
}

async function fetchProducts(limit = 0) {
    try {
        setStatus("Завантаження всіх товарів...");
        const url = `${BASE_URL}/products?limit=${limit}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Помилка завантаження товарів: ${res.status}`);
        }

        const data = await res.json();
        console.log("All products:", data);

        setActiveCategoryButton(null);
        renderProducts(data.products, "Усі товари");
        setStatus("Дані успішно завантажено");
        return data.products;
    } catch (error) {
        console.error(error);
        setStatus("Помилка під час завантаження товарів.");
        productsGridEl.innerHTML = `<p class="empty-state">Не вдалося завантажити товари.</p>`;
    }
}

async function fetchProductsByCategory(categorySlug, categoryLabel = categorySlug) {
    try {
        setStatus(`Завантаження категорії "${categoryLabel}"...`);
        const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(categorySlug)}`);
        if (!res.ok) {
            throw new Error(`Помилка завантаження категорії ${categorySlug}: ${res.status}`);
        }

        const data = await res.json();
        console.log(`Products in ${categorySlug}:`, data);

        setActiveCategoryButton(categorySlug);
        renderProducts(data.products, `Категорія: ${categoryLabel}`);
        setStatus(`Відображено категорію "${categoryLabel}"`);
        return data.products;
    } catch (error) {
        console.error(error);
        setStatus("Помилка під час завантаження товарів категорії.");
        productsGridEl.innerHTML = `<p class="empty-state">Не вдалося завантажити товари цієї категорії.</p>`;
    }
}

async function fetchProductById(id) {
    try {
        const res = await fetch(`${BASE_URL}/products/${id}`);
        if (!res.ok) {
            throw new Error(`Помилка завантаження товару з id=${id}: ${res.status}`);
        }

        const product = await res.json();
        console.log(`Product #${id}:`, product);
        return product;
    } catch (error) {
        console.error(error);
    }
}

if (seeAllBtnEl) {
    seeAllBtnEl.addEventListener("click", () => {
        fetchProducts(0);
    });
}

async function initApp() {
    await Promise.all([
        fetchCategories(),
        fetchProducts(0)
    ]);
}

initApp();
