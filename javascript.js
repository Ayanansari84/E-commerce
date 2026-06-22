// Data
const todayDeal = [
    { img: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400', discount: '60', dealOfDay: 'Lightning Deal', desc: 'iPhone 15 Pro Max' },
    { img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400', discount: '40', dealOfDay: 'Deal of the Day', desc: 'Samsung Galaxy S24' },
    { img: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=400', discount: '50', dealOfDay: 'Limited Time', desc: 'OnePlus 12' },
    { img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400', discount: '30', dealOfDay: 'Best Seller', desc: 'Google Pixel 8' },
    { img: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg', discount: '70', dealOfDay: 'Lightning Deal', desc: 'AirPods Pro 2' },
    { img: 'https://images.unsplash.com/photo-1546868871-70c122467dff?auto=format&fit=crop&q=80&w=400', discount: '25', dealOfDay: 'Deal of the Day', desc: "Apple Watch Series 9" }
];



// DOM Elements
const slideBtnLeft = document.getElementById("slide-btn-left");
const slideBtnRight = document.getElementById("slide-btn-right");
const imgItem = document.querySelectorAll(".image-item");
const sidebarNavigationEl = document.getElementById("sidebar-container-navigation-id");
const sidebarOpenNavigationEl = document.getElementById("open-nav-sidebar");
const sidebarCloseNavigationEl = document.getElementById("sidebar-navigation-close");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const productsGrid = document.getElementById("products-grid");
const searchResults = document.getElementById("search-results");
const cartContainer = document.getElementById("cart-container");
const cartCount = document.getElementById("cart-count");
const cartDropdown = document.getElementById("cart-dropdown");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// State
let startSlider = 0;
const endSlider = (imgItem.length - 1) * 100;
let startProduct = 0;
let cart = JSON.parse(localStorage.getItem('amazon_cart')) || [];
let filteredProducts = [];
let currentCategory = 'all';

// Hero Slider
slideBtnLeft.addEventListener("click", handleLeftBtn);
function handleLeftBtn() {
    if (startSlider < 0) {
        startSlider += 100;
    }
    imgItem.forEach(element => {
        element.style.transform = `translateX(-${startSlider}%)`;
    });
}

slideBtnRight.addEventListener("click", handleRightBtn);
function handleRightBtn() {
    if (startSlider <= endSlider - 100) {
        startSlider += 100;
    }
    imgItem.forEach(element => {
        element.style.transform = `translateX(-${startSlider}%)`;
    });
}

setInterval(() => {
    if (startSlider < endSlider) {
        handleRightBtn();
    } else {
        startSlider = 0;
        imgItem.forEach(element => {
            element.style.transform = `translateX(-${startSlider}%)`;
        });
    }
}, 4000);

// Sidebar
sidebarOpenNavigationEl.addEventListener("click", () => {
    sidebarNavigationEl.classList.add("slidebar-show");
});
sidebarCloseNavigationEl.addEventListener("click", () => {
    sidebarNavigationEl.classList.remove("slidebar-show");
});

// Today Deals
const todayDealProductListEl = document.getElementById("today_deals_product_list");
let todayDealProductHTML = "";
todayDeal.forEach(item => {
    todayDealProductHTML += `
        <div class="today_deals_product_item" style="cursor: pointer;" onclick="window.location.href='category.html?category=deals'">
            <div class="todayDeals_product_image">
                <img src="${item.img}" alt="${item.desc}" />
            </div>
            <div class="discount_Contaienr">
                <a href="#">Up to ${item.discount}% off</a>
                <a href="#">${item.dealOfDay}</a>
            </div>
            <p>${item.desc}</p>
        </div>
    `;
});
todayDealProductListEl.innerHTML = todayDealProductHTML;

const todayDealBtnPrev = document.getElementById("today_deal_btn_prev");
const todayDealBtnNext = document.getElementById("today_deal_btn_next");
const todayDealsProductItem = document.querySelectorAll("#today_deals_product_list .today_deals_product_item");

todayDealBtnPrev.addEventListener("click", () => {
    if (startProduct < 0) {
        startProduct += 100;
    }
    todayDealsProductItem.forEach(el => {
        el.style.transform = `translateX(${startProduct}%)`;
    });
});

todayDealBtnNext.addEventListener("click", () => {
    if (startProduct > -200) {
        startProduct -= 100;
    }
    todayDealsProductItem.forEach(el => {
        el.style.transform = `translateX(${startProduct}%)`;
    });
});

// Footwear
const footwearList = [
    { img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', desc: 'Nike Air Max' },
    { img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=400', desc: 'Vans Old Skool' },
    { img: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=400', desc: 'Running Shoes' },
    { img: 'https://th.bing.com/th/id/OIP.BHqUV87Kngk7scDuJWWa0QHaE8?w=284&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', desc: 'Comfort Slippers' },
    { img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=400', desc: 'Nike Green Sneakers' },
    { img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400', desc: 'Casual Sneakers' }
];

const footwearProductListEl = document.getElementById("footwear_product_list");
if (footwearProductListEl) {
    let footwearHTML = "";
    footwearList.forEach(item => {
        footwearHTML += `
            <div class="today_deals_product_item" style="cursor: pointer;" onclick="window.location.href='category.html?category=fashion&query=shoes'">
                <div class="todayDeals_product_image">
                    <img src="${item.img}" alt="${item.desc}" />
                </div>
                <p style="text-align: center; margin-top: 10px;">${item.desc}</p>
            </div>
        `;
    });
    footwearProductListEl.innerHTML = footwearHTML;

    const fwBtnPrev = document.getElementById("footwear_btn_prev");
    const fwBtnNext = document.getElementById("footwear_btn_next");
    const fwProductItems = document.querySelectorAll("#footwear_product_list .today_deals_product_item");
    let startFWProduct = 0;

    fwBtnPrev.addEventListener("click", () => {
        if (startFWProduct < 0) startFWProduct += 100;
        fwProductItems.forEach(el => el.style.transform = `translateX(${startFWProduct}%)`);
    });

    fwBtnNext.addEventListener("click", () => {
        if (startFWProduct > -200) startFWProduct -= 100;
        fwProductItems.forEach(el => el.style.transform = `translateX(${startFWProduct}%)`);
    });
}

// Search Functionality
categorySelect.addEventListener("change", () => {
    const category = categorySelect.value.toLowerCase();
    if (category === 'all') {
        displayProducts(allProducts);
        document.querySelector("#products-section h2").textContent = "Featured Products";
    } else if (category === 'deals') {
        const deals = allProducts.filter(p => p.discount);
        displayProducts(deals);
        document.querySelector("#products-section h2").textContent = "Today's Best Deals";
    } else if (productsByCategory[category]) {
        displayProducts(productsByCategory[category]);
        document.querySelector("#products-section h2").textContent = category.charAt(0).toUpperCase() + category.slice(1);
    } else {
        window.location.href = `category.html?category=${category}`;
    }
});

function handleSearch() {
    let query = searchInput.value.toLowerCase().trim();
    let category = categorySelect.value.toLowerCase();

    // Map keywords to specific categories
    const categoryMap = {
        'mobile': 'mobiles',
        'mobiles': 'mobiles',
        'phone': 'mobiles',
        'phones': 'mobiles',
        'smartphone': 'mobiles',
        'electronics': 'electronics',
        'electronic': 'electronics',
        'fashion': 'fashion',
        'clothes': 'fashion',
        'headphones': 'headphones',
        'headphone': 'headphones',
        'kitchen': 'kitchen',
        'deals': 'deals',
        'deal': 'deals'
    };

    if (categoryMap[query]) {
        category = categoryMap[query];
        query = ''; // Clear text query to redirect to full category page
    }

    if (query.length > 0 || category !== 'all') {
        let url = `category.html?category=${category}`;
        if (query.length > 0) {
            url += `&query=${encodeURIComponent(query)}`;
        }
        window.location.href = url;
    }
}

const searchIcon = document.querySelector(".search-icon");
if (searchIcon) {
    searchIcon.addEventListener("click", handleSearch);
}
if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    });
}

// Live Search Suggestions
const searchContainerElement = document.querySelector(".search-container");
if (searchContainerElement) {
    searchContainerElement.insertAdjacentHTML('beforeend', `<div class="search-suggestions" id="search-suggestions"></div>`);
}
const searchSuggestions = document.getElementById("search-suggestions");

if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query || !searchSuggestions) {
            if (searchSuggestions) searchSuggestions.classList.remove("show");
            return;
        }

        const matches = allProducts.filter(p =>
            p.name.toLowerCase().includes(query) ||
            (p.category && p.category.toLowerCase().includes(query))
        ).slice(0, 6);

        if (matches.length > 0) {
            let html = "";
            matches.forEach(match => {
                html += `
                    <div class="suggestion-item" onclick="window.location.href='category.html?category=${match.category}&query=${encodeURIComponent(match.name)}'">
                        <img src="${match.img}" alt="${match.name}">
                        <div class="suggestion-item-info">
                            <span class="suggestion-item-name">${match.name}</span>
                            <span class="suggestion-item-category">in ${match.category.charAt(0).toUpperCase() + match.category.slice(1)}</span>
                        </div>
                    </div>
                `;
            });
            searchSuggestions.innerHTML = html;
            searchSuggestions.classList.add("show");
        } else {
            searchSuggestions.innerHTML = `<div class="suggestion-item"><span class="suggestion-item-name" style="padding-left:10px;">No products found</span></div>`;
            searchSuggestions.classList.add("show");
        }
    });
}

document.addEventListener("click", (e) => {
    if (searchSuggestions && searchContainerElement && !searchContainerElement.contains(e.target)) {
        searchSuggestions.classList.remove("show");
    }
});

// Products Display
function displayProducts(productList, isSearch = false) {
    let html = "";
    productList.forEach(product => {
        const discountBadge = product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : '';
        const oldPriceHtml = product.oldPrice ? `<span class="old-price">₹${product.oldPrice.toLocaleString()}</span>` : '';

        html += `
            <div class="product-card" data-product-id="${product.id}" data-category="${product.category || 'other'}">
                <div class="product-image-container">
                    <img class="product-image" src="${product.img}" alt="${product.name}">
                    ${discountBadge}
                </div>
                <div class="product-name">${product.name}</div>
                <div class="price-container">
                    <span class="product-price">₹${product.price.toLocaleString()}</span>
                    ${oldPriceHtml}
                </div>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
    });
    productsGrid.innerHTML = html;

    // Add event listeners to new buttons
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", addToCart);
    });

    // Add product click handlers for category
    document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", (e) => {
            if (!e.target.classList.contains('add-to-cart')) {
                const category = card.dataset.category;
                if (category && category !== 'all') {
                    categorySelect.value = category;
                    handleSearch();
                }
            }
        });
    });
}

// Checkout state tracking
let isCheckingOut = false;

// Address Selection Modal
const addressModalHTML = `
    <div id="address-modal" class="address-modal">
        <div class="address-modal-content">
            <div class="address-modal-header">
                <h2>Choose your location</h2>
                <button id="close-address-modal">&times;</button>
            </div>
            <div class="address-modal-body">
                <p>Delivery options and delivery speeds may vary for different locations</p>
                <form id="address-form">
                    <input type="text" id="addr-name" placeholder="Full Name" required>
                    <input type="text" id="addr-phone" placeholder="Mobile Number" required>
                    <input type="text" id="addr-pincode" placeholder="Pincode" required>
                    <input type="text" id="addr-flat" placeholder="Flat, House no., Building, Company, Apartment" required>
                    <input type="text" id="addr-area" placeholder="Area, Street, Sector, Village" required>
                    <input type="text" id="addr-city" placeholder="Town/City" required>
                    <button type="submit" class="save-address-btn">Save Address</button>
                </form>
            </div>
        </div>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', addressModalHTML);

const orderConfirmModalHTML = `
    <div id="order-confirm-modal" class="order-confirm-modal">
        <div class="order-confirm-content">
            <i class="fa-solid fa-circle-check success-icon"></i>
            <h2>Order Placed Successfully!</h2>
            <p>Your order is on the way.<br>Order ID: #<span id="confirm-order-id"></span></p>
            <button id="continue-shopping-btn" class="save-address-btn" style="width:100%">Continue Shopping</button>
        </div>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', orderConfirmModalHTML);

const orderConfirmModal = document.getElementById("order-confirm-modal");
document.getElementById("continue-shopping-btn").addEventListener("click", () => {
    orderConfirmModal.classList.remove("show");
});

const addressModal = document.getElementById("address-modal");
const closeAddressModal = document.getElementById("close-address-modal");
const addressForm = document.getElementById("address-form");

const savedAddress = JSON.parse(localStorage.getItem('amazon_address'));
if (savedAddress && document.getElementById("current-address")) {
    document.getElementById("current-address").textContent = `Deliver to ${savedAddress.name} - ${savedAddress.city} ${savedAddress.pincode}`;
}

const addressContainer = document.querySelector(".address-container");
if (addressContainer) {
    addressContainer.addEventListener("click", () => {
        addressModal.classList.add("show");
    });
}

closeAddressModal.addEventListener("click", () => {
    addressModal.classList.remove("show");
    isCheckingOut = false;
});

addressForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const addressData = {
        name: document.getElementById("addr-name").value,
        phone: document.getElementById("addr-phone").value,
        pincode: document.getElementById("addr-pincode").value,
        flat: document.getElementById("addr-flat").value,
        area: document.getElementById("addr-area").value,
        city: document.getElementById("addr-city").value,
    };
    localStorage.setItem('amazon_address', JSON.stringify(addressData));
    if (document.getElementById("current-address")) {
        document.getElementById("current-address").textContent = `Deliver to ${addressData.name} - ${addressData.city} ${addressData.pincode}`;
    }

    if (isCheckingOut) {
        // Calculate Total
        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Send data to PHP backend
        fetch('checkout.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: addressData,
                cart: cart,
                total: totalAmount
            })
        })
        .then(async res => {
            const text = await res.text();
            try {
                return JSON.parse(text);
            } catch (e) {
                throw new Error("Server returned non-JSON response: " + text);
            }
        })
        .then(data => {
            if(data.success) {
                document.getElementById("confirm-order-id").textContent = data.order_id;
                orderConfirmModal.classList.add("show");
                cart = [];
                updateCart();
                isCheckingOut = false;
                addressModal.classList.remove("show");
                if (typeof cartOpen !== 'undefined') cartOpen = false;
                if (cartDropdown) cartDropdown.classList.remove("show");
            } else {
                alert("Order failed: " + data.message);
            }
        })
        .catch(err => {
            console.error("Checkout Error: ", err);
            alert("Checkout Error: " + err.message);
        });
    } else {
        addressModal.classList.remove("show");
    }
});

// Cart Functionality
function addToCart(e) {
    const productId = parseInt(e.target.dataset.productId);
    const product = allProducts.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    e.target.textContent = "Added!";
    e.target.classList.add("added");
    
    // Show "Buy Now" button below the Add to Cart button
    let buyNowBtn = e.target.nextElementSibling;
    if (!buyNowBtn || !buyNowBtn.classList.contains('buy-now-card-btn')) {
        buyNowBtn = document.createElement("button");
        buyNowBtn.className = "buy-now-card-btn";
        buyNowBtn.style.width = "100%";
        buyNowBtn.style.padding = "10px";
        buyNowBtn.style.background = "#ffa41c";
        buyNowBtn.style.color = "#111";
        buyNowBtn.style.border = "none";
        buyNowBtn.style.borderRadius = "4px";
        buyNowBtn.style.fontSize = "16px";
        buyNowBtn.style.fontWeight = "bold";
        buyNowBtn.style.cursor = "pointer";
        buyNowBtn.style.marginTop = "10px";
        buyNowBtn.textContent = "Buy Now";
        buyNowBtn.onclick = function(ev) {
            ev.stopPropagation();
            isCheckingOut = true;
            addressModal.classList.add("show");
        };
        e.target.parentNode.insertBefore(buyNowBtn, e.target.nextSibling);
    }

    setTimeout(() => {
        e.target.textContent = "Add to Cart";
        e.target.classList.remove("added");
    }, 2000);
}

function updateCart() {
    localStorage.setItem('amazon_cart', JSON.stringify(cart));
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    let itemsHtml = "";
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        itemsHtml += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
            </div>
        `;
        total += itemTotal;
    });
    if (cartItems) cartItems.innerHTML = itemsHtml;
    cartTotal.textContent = `₹${total.toLocaleString()}`;
}

// Initial page load setup
displayProducts(allProducts);
updateCart();