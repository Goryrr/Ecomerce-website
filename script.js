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





// rendering products

let Products = products;
let categories = new Set();
const productsSection = document.querySelector("#product-container");

const renderProducts = (items) => {
    productsSection.innerHTML = '';

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
        </div class="addToBusketCart">
        <i class="fa-solid fa-shopping-cart cart"></i>
        </div>
        <p class="product-item-sale-info">Sale!</p>
        `;
// rendering rate by stars
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


const renderBrandsCategories = (items) => {
    for (let i=0; i<items.length; i++){
        categories.add(items[i].brand);
    }

    const categoriesItems = document.querySelector('.categories-items');

    categories = ['All brands',...categories];

    categories.forEach((brand, index) => {
        const newBrandCategory = document.createElement('button');
        newBrandCategory.innerHTML = brand;
        newBrandCategory.dataset.brand = brand;

        index === 0 ? newBrandCategory.classList.add('active') : '';
        
        categoriesItems.appendChild(newBrandCategory);
    })

}

document.onload = renderBrandsCategories(Products);

const categoriesButtons = document.querySelectorAll('.categories-items button');

categoriesButtons.forEach(btn => btn.addEventListener('click', (e) => {
   const brand = e.target.dataset.brand;
   Products = products;
    if (brand === 'All brands') {
        Products = products;
    } else {
        Products = Products.filter((item) => item.brand === brand);
    }
   
   renderProducts(Products);
})
);




const renderTypeCategories = (items) => {
    const TypeCategoriesSet = new Set();

    for (let i=0; i<items.length; i++){
        TypeCategoriesSet.add(items[i].category);
    }

    const TypeCategories = document.querySelector('.type-items');

    TypeCategoriesSet.forEach((category, index) => {
        const newTypeCategory = document.createElement('button');
        newTypeCategory.innerHTML = category;

        newTypeCategory.dataset.category = category;

        TypeCategories.appendChild(newTypeCategory);
    })
}

document.onload = renderTypeCategories(Products);

const brandsButtons = document.querySelectorAll('.type-items button');

brandsButtons.forEach(btn => btn.addEventListener('click', (e) => {
    const category = e.target.dataset.category;

    Products = products;
    
    Products = Products.filter((item) => item.category === category);
    renderProducts(Products);
}));



// toggle cart bar

let iconCart = document.querySelector('.iconCart');
let cartBar = document.querySelector('.cartBar');

let closeCartBar = document.querySelector('.closeCartBar');

// iconCart.addEventListener('click', () => {
//     if (cartBar.style.right == '-100%') {
//         cartBar.style.right = '0';
//     } else {
//             cartBar.style.right = '-100%';  
//     }
// })

iconCart.addEventListener('click', () => {
    const computedStyle = getComputedStyle(cartBar);
    const rightValue = computedStyle.getPropertyValue('right');

    if (rightValue === '0px' || rightValue === '0%') {
        cartBar.style.right = '-100%';
    } else {
        cartBar.style.right = '0';
    }
});

closeCartBar.addEventListener('click', () => {
    cartBar.style.right = '-100%';
})


// let listCart = [];

// // geting cookie data cart
// function checkCart(){
//     var cookieValue = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('listCart='));
//     if(cookieValue){
//         listCart = JSON.parse(cookieValue.split('=')[1]);
//     }
// };

// checkCart();

// function addCart($idProduct){
//     let productCopy = products;

//     // if product is not in the cart
//     if(!listCart[$idProduct]) {
//         let dataCartProduct = productCopy.filter(
//             products => products.id == $idProduct)[0];
//         //add data product in cart
//         listCart[$idProduct] = dataCartProduct;
//         listCart[$idProduct].quantity = 1;
//     } else {
//         listCart[$idProduct].quantity++;
//     }

//     // saving datas cart in cookies
//     let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
//     document.cookie = "listCart"+JSON.stringify(listCart)+"; "+timeSave+"; path=/;";

//     addCartToHTML();
// }


// // moje
// let add = document.querySelector('.cart');

// addCartToHTML();
// function addCartToHTML () {
//     // clear data default
//     let listCartHTML = document.querySelector('.listCart');
//     listCartHTML.innerHTML = '';

//     let totalHTML = document.querySelector('.totalQuantity');
//     let totalQuantity = 0;

//     if(listCart){
//         listCart.forEach(products => {
//             if(products){
//                 let newCart = document.createElement('div');
//                 newCart.classList.add('item');
//                 newCart.innerHTML = 
//                 `
//                 <img src="img/products/f1.jpg" alt="">
//                 <div class="itemContent">
//                     <div class="itemName">
//                         Product name
//                     </div>
//                     <div class="itemBrand">
//                         Item Brand
//                     </div>
//                     <div class="itemPrice">
//                         $450
//                     </div>
//                 </div>
//                 <div class="quantity">
//                     <button>-</button>
//                     <span class="value">0</span>
//                     <button>+</button>
//                 </div>
//                `;
//                listCartHTML.appendChild(newCart);
//                totalQuantity = totalQuantity + products.quantity;
//             }
//         })
//     }
// }

// add.addEventListener('click', (e) => {
//     addCartToHTML()
// })


// GPT

// // Function to add a product to the cart
// const addToCart = (product) => {
//     const listCart = document.querySelector('.listCart');

//     // Create a new cart item
//     const cartItem = document.createElement('div');
//     cartItem.className = 'item';

//     // Populate the cart item with product information
//     cartItem.innerHTML = `
//         <img src="${product.image}" alt="${product.name}">
//         <div class="itemContent">
//             <div class="itemName">${product.name}</div>
//             <div class="itemBrand">${product.brand}</div>
//             <div class="itemPrice">$${product.price.toFixed(2)}</div>
//         </div>
//         <div class="quantity">
//             <button>-</button>
//             <span class="value">0</span>
//             <button>+</button>
//         </div>
//     `;

//     // Append the cart item to the listCart
//     listCart.appendChild(cartItem);
// };

// // Add click event listener to all product cart icons
// const cartIcons = document.querySelectorAll('.fa-shopping-cart');
// cartIcons.forEach((cartIcon, index) => {
//     cartIcon.addEventListener('click', () => {
//         // Call the addToCart function with the corresponding product
//         addToCart(Products[index]);
//     });
// });










// Function to add a product to the cart
const addToCart = (product) => {
    const listCart = document.querySelector('.listCart');

    const existingCartItem = listCart.querySelector(`.item[data-product-id="${product.id}"]`);


    if(existingCartItem) {
        const quantityElement = existingCartItem.querySelector('.value');
        const currentQuantity = parseInt(quantityElement.textContent, 10);
        quantityElement.textContent = currentQuantity +1;
    
    } else {
        const cartItem = document.createElement('div');
        cartItem.className = 'item';
        cartItem.setAttribute('data-product-id', product.id);

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="itemContent">
                <div class="itemName">${product.name}</div>
                <div class="itemBrand">${product.brand}</div>
                <div class="itemPrice">$${product.price.toFixed(2)}</div>
            </div>
            <div class="quantity">
                <button>-</button>
                <span class="value">0</span>
                <button>+</button>
            </div>
        `;
    
        // Append the cart item to the listCart
        listCart.appendChild(cartItem);
    }

};

// Add click event listener to all product cart icons
const cartIcons = document.querySelectorAll('.fa-shopping-cart');
cartIcons.forEach((cartIcon, index) => {
    cartIcon.addEventListener('click', () => {
        // Call the addToCart function with the corresponding product
        addToCart(Products[index]);
    });
});