const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}


// renderowanie produktów

let Products = products;
const productsSection = document.querySelector("#product-container");

const renderProducts = (items) => {
    for(let i = 0; i < items.length; i++) {
        const newProduct = document.createElement('div');
        newProduct.className = `product ${items[i].sale ? "on-sale" : ""}`;
        
        newProduct.innerHTML = 
        `
        <img src="${items[i].image}" alt="product image">
        <div class="description">
            <span>${items[i].brand}</span>
            <h5>${items[i].name}</h5>
            <div class="star"></div>
            <div class="prices-box">
            <h4 class="normal-price">${items[i].price.toFixed(2)}</h4>
            <h4 class="price-sale">${(items[i].price - items[i].saleAmount)}</h4>
            </div>        
        </div>
        <a href="#"><i class="fa-solid fa-shopping-cart cart"></i></a>
        </div>
        <p class="product-item-sale-info">Sale!</p>
        `;
// renderowanie gwiazdek oceny
        const star = newProduct.querySelector('.star');


        for (let j = 0; j < items[i].rate; j++) {
            const starIcon = document.createElement('i');
            starIcon.className = 'fas fa-star';
            star.appendChild(starIcon);
        };
 
        productsSection.appendChild(newProduct);
    }
};

document.onload = renderProducts(Products);
// document.addEventListener('DOMContentLoaded', function() {
//     renderProducts(Products);
// });


const searchBarInput = document.querySelector('.search-bar-input');

searchBarInput.addEventListener('input', (e) => {
    const search = e.target.value;
    const foundProducts = Products.filter((product) =>{
        if(product.name.toLowerCase().includes(search.toLowerCase()))
        {
            return product;
        } else if (product.brand.toLowerCase().includes(search.toLowerCase()))
        {
            return product;
        }
    });

    const emptyState = document.querySelector('.empty-state');

    foundProducts.length === 0 ? emptyState.classList.add('active') : emptyState.classList.remove('active');
    
    productsSection.innerHTML = '';

    renderProducts(foundProducts);
});