const categoryList = document.querySelector(".categories")
const productList = document.querySelector(".products")
const basketList = document.querySelector(".list")

export function renderCategories(categories){
    categories.slice(0, 5).forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        categoryDiv.innerHTML = `
            <img src="${category.image}">
            <span>${category.name}</span>
        `;
        categoryList.appendChild(categoryDiv);
    });
}


export function renderProducts(products){
    const filteredProducts = products.filter((product, index) => index < 40);
    filteredProducts.forEach((product) => {
        const productCard = document.createElement("div")
        productCard.className ="product"
        productCard.innerHTML = `
        <img src="${product.images[0]}">
        <p>${product.title}</p>
        <p>${product.category.name}</p>
        <div class="product-info">
            <p>${product.price}$</p>
            <button id="add-btn" data-id=${product.id}>Spete Ekle</button>
        </div>
        `
        productList.appendChild(productCard)
    });
}

export function renderBasketItem(product){
    const baskeTitem = document.createElement("div")
    baskeTitem.classList.add("list-item")
    baskeTitem.innerHTML = `
    <img src=${product.images[0]} alt="">
    <h2>${product.title}</h2>
    <h2>${product.price}</h2>
    <p>${product.amount}</p>
    <button id="del-button" data-id=${product.id}>Sil</button>
    `
    basketList.appendChild(baskeTitem);
}


