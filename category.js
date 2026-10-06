document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const query = params.get('query');
    
    const resultHeading = document.getElementById("result-heading");
    const productsGrid = document.getElementById("products-grid");
    const categorySelect = document.getElementById("category-select");
    const searchInput = document.getElementById("search-input");
    const searchIcon = document.getElementById("search-icon");
    const cartCount = document.getElementById("cart-count");

    // Cart initialization for the results page
    let cart = JSON.parse(localStorage.getItem('amazon_cart')) || [];
    const updateCartCount = () => {
        if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    };
    updateCartCount();

    // Sync UI with URL parameters
    if (category && categorySelect) {
        const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
        const options = Array.from(categorySelect.options);
        if (options.some(opt => opt.text === formattedCategory)) {
            categorySelect.value = formattedCategory;
        }
    }
    if (query && searchInput) searchInput.value = query;

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

    if (searchIcon) { searchIcon.addEventListener("click", handleSearch); }
    if (searchInput) { searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); handleSearch(); } }); }

    function displayProducts(list) {
        if (!productsGrid) return;
        productsGrid.innerHTML = list.length ? list.map(product => `
            <div class="product-card">
                <div class="product-image-container">
                    <img class="product-image" src="${product.img}" alt="${product.name}">
                    ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                </div>
                <div class="product-name">${product.name}</div>
                <div class="price-container">
                    <span class="product-price">₹${product.price.toLocaleString()}</span>
                    ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice.toLocaleString()}</span>` : ''}
                </div>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `).join('') : "<p style='grid-column: 1/-1; text-align: center; padding: 20px;'>No products found matching your criteria.</p>";

        document.querySelectorAll(".add-to-cart").forEach(btn => {
            btn.addEventListener("click", addToCart);
        });
    }

    function addToCart(e) {
        const id = parseInt(e.target.dataset.productId);
        const product = allProducts.find(p => p.id === id);
        const item = cart.find(i => i.id === id);
        if (item) item.quantity++; else cart.push({...product, quantity: 1});
        localStorage.setItem('amazon_cart', JSON.stringify(cart));
        updateCartCount();
        e.target.textContent = "Added!";
        
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
                let addressModal = document.getElementById("address-modal");
                if (addressModal) {
                    window.isCheckingOut = true;
                    addressModal.classList.add("show");
                }
            };
            e.target.parentNode.insertBefore(buyNowBtn, e.target.nextSibling);
        }

        setTimeout(() => e.target.textContent = "Add to Cart", 2000);
    }

    // Filtering Logic
    let results = allProducts;
    if (category && category.toLowerCase() !== 'all') {
        if (category.toLowerCase() === 'deals') {
            results = results.filter(p => p.discount);
            if (resultHeading) resultHeading.textContent = "Today's Best Deals";
        } else {
            results = results.filter(p => p.category === category.toLowerCase());
            if (resultHeading) resultHeading.textContent = `Results for "${category}"`;
        }
    }
    if (query) {
        const lowerQuery = query.toLowerCase();
        const matchStr = lowerQuery === 'shoes' ? 'shoe' : lowerQuery;
        results = results.filter(p => 
            p.name.toLowerCase().includes(matchStr) ||
            (p.category && p.category.toLowerCase().includes(matchStr)) ||
            ((matchStr === 'phone' || matchStr === 'mobile') && p.category === 'mobiles')
        );
        if (resultHeading) resultHeading.textContent = `Search results for "${query}"`;
    }

    displayProducts(results);

    // Live Search Suggestions
    const searchContainerElement = document.querySelector(".search-container");
    if (searchContainerElement) {
        searchContainerElement.insertAdjacentHTML('beforeend', `<div class="search-suggestions" id="search-suggestions"></div>`);
    }
    const searchSuggestions = document.getElementById("search-suggestions");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const q = e.target.value.toLowerCase().trim();
            if (!q || !searchSuggestions) {
                if (searchSuggestions) searchSuggestions.classList.remove("show");
                return;
            }
            const matches = allProducts.filter(p => 
                p.name.toLowerCase().includes(q) || 
                (p.category && p.category.toLowerCase().includes(q))
            ).slice(0, 6);
            
            if (matches.length > 0) {
                searchSuggestions.innerHTML = matches.map(match => `
                    <div class="suggestion-item" onclick="window.location.href='category.html?category=${match.category}&query=${encodeURIComponent(match.name)}'">
                        <img src="${match.img}" alt="${match.name}">
                        <div class="suggestion-item-info">
                            <span class="suggestion-item-name">${match.name}</span>
                            <span class="suggestion-item-category">in ${match.category.charAt(0).toUpperCase() + match.category.slice(1)}</span>
                        </div>
                    </div>
                `).join('');
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

    // Address Modal logic for Checkout (on Category pages)
    const addressModalHTML = `
        <div id="address-modal" class="address-modal">
            <div class="address-modal-content">
                <div class="address-modal-header">
                    <h2>Checkout - Enter Delivery Details</h2>
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
                        <button type="submit" class="save-address-btn">Place Order</button>
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

    window.isCheckingOut = false;

    if (closeAddressModal) {
        closeAddressModal.addEventListener("click", () => {
            addressModal.classList.remove("show");
            window.isCheckingOut = false;
        });
    }

    if (addressForm) {
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

            if (window.isCheckingOut) {
                const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                
                fetch('checkout.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
                    if (data.success) {
                        document.getElementById("confirm-order-id").textContent = data.order_id;
                        orderConfirmModal.classList.add("show");
                        cart = [];
                        localStorage.setItem('amazon_cart', JSON.stringify(cart));
                        updateCartCount();
                        window.isCheckingOut = false;
                        addressModal.classList.remove("show");
                    } else {
                        alert("Order failed: " + data.message);
                    }
                })
                .catch(err => {
                    console.error("Error: ", err);
                    alert("Checkout Error: " + err.message);
                });
            } else {
                addressModal.classList.remove("show");
            }
        });
    }
});