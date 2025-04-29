// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    initializeMobileNav();
    setupCartPopup();
});

// App Initialization
async function initializeApp() {
    // Load initial data
    await loadProducts();
    updateCartCount();
    
    // Optional: Add animation for page load
    document.body.classList.add('loaded');
    
    // Initialize special offers section if it exists
    if (document.getElementById('special-offers')) {
        loadSpecialOffers();
    }
}

// Products Data - Using direct Pexels URLs instead of API
const sampleProducts = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        originalPrice: 129.99,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
        vendor: 'TechGear',
        category: 'Electronics',
        rating: 4.5,
        ratingCount: 128,
        badge: 'sale'
    },
    {
        id: 2,
        name: 'Smart Watch Series 5',
        price: 199.99,
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
        vendor: 'WearTech',
        category: 'Electronics',
        rating: 4.8,
        ratingCount: 256,
        badge: 'new'
    },
    {
        id: 3,
        name: 'Premium Ultrabook Pro',
        price: 1299.99,
        image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
        vendor: 'TechGear',
        category: 'Electronics',
        rating: 4.7,
        ratingCount: 87
    },
    {
        id: 4,
        name: 'Smartphone Pro Max',
        price: 899.99,
        originalPrice: 999.99,
        image: 'https://images.pexels.com/photos/1786433/pexels-photo-1786433.jpeg?auto=compress&cs=tinysrgb&w=600',
        vendor: 'MobiTech',
        category: 'Electronics',
        rating: 4.6,
        ratingCount: 342,
        badge: 'sale'
    },
    {
        id: 5,
        name: 'Digital Camera 4K',
        price: 599.99,
        image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=600',
        vendor: 'CaptureGear',
        category: 'Electronics',
        rating: 4.4,
        ratingCount: 156
    },
    {
        id: 6,
        name: 'Designer T-Shirt',
        price: 49.99,
        image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600',
        vendor: 'FashionHub',
        category: 'Fashion',
        rating: 4.3,
        ratingCount: 92
    },
    {
        id: 7,
        name: 'Running Shoes Pro',
        price: 129.99,
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
        vendor: 'FitLife',
        category: 'Sports',
        rating: 4.7,
        ratingCount: 215
    },
    {
        id: 8,
        name: 'Modern Wall Art Canvas',
        price: 79.99,
        image: 'https://images.pexels.com/photos/1546039/pexels-photo-1546039.jpeg?auto=compress&cs=tinysrgb&w=600',
        vendor: 'HomeDecor',
        category: 'Home & Living',
        rating: 4.5,
        ratingCount: 64
    }
];

// Special offers data with discounted prices
const specialOffers = [
    {
        id: 101,
        name: 'Premium Bluetooth Speaker',
        price: 69.99,
        originalPrice: 119.99,
        image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=600',
        vendor: 'SoundMaster',
        category: 'Electronics',
        rating: 4.6,
        ratingCount: 112,
        badge: 'sale'
    },
    {
        id: 102,
        name: 'Designer Leather Handbag',
        price: 149.99,
        originalPrice: 299.99,
        image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
        vendor: 'LuxeStyle',
        category: 'Fashion',
        rating: 4.8,
        ratingCount: 87,
        badge: 'sale'
    },
    {
        id: 103,
        name: 'Smart Home Security Camera',
        price: 79.99,
        originalPrice: 129.99,
        image: 'https://images.pexels.com/photos/3945638/pexels-photo-3945638.jpeg?auto=compress&cs=tinysrgb&w=600',
        vendor: 'SecureTech',
        category: 'Electronics',
        rating: 4.5,
        ratingCount: 134,
        badge: 'sale'
    },
    {
        id: 104,
        name: 'Fitness Tracker Pro',
        price: 59.99,
        originalPrice: 99.99,
        image: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=600',
        vendor: 'FitLife',
        category: 'Sports',
        rating: 4.7,
        ratingCount: 198,
        badge: 'sale'
    }
];

// Store state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Load products from our sample data
async function loadProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    const newArrivalsContainer = document.getElementById('new-arrivals');
    
    if (featuredProductsContainer) {
        renderProducts(sampleProducts, featuredProductsContainer);
    }
    
    if (newArrivalsContainer) {
        // For demo purposes, we'll just use the last 4 products as "new arrivals"
        const newArrivals = [...sampleProducts].slice(-4).reverse();
        renderProducts(newArrivals, newArrivalsContainer);
    }
}

// Load special offers
function loadSpecialOffers() {
    const specialOffersContainer = document.getElementById('special-offers');
    if (specialOffersContainer) {
        renderProducts(specialOffers, specialOffersContainer);
    }
}

// Render products with our new card design
function renderProducts(products, container) {
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}" data-category="${product.category.toLowerCase().replace(' & ', '-')}">
            <div class="product-image">
                ${product.badge ? `<div class="product-badge ${product.badge}">${product.badge}</div>` : ''}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-actions">
                    <button class="product-action-btn wishlist-btn" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="product-action-btn quick-view-btn" title="Quick View">
                        <i class="far fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-content">
                <div class="product-vendor">${product.vendor}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
            </div>
            <div class="product-footer">
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    <span class="rating-count">(${product.ratingCount})</span>
                </div>
                <button class="add-to-cart-button" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Add</span>
                </button>
            </div>
        </div>
    `).join('');
}

// Event Listeners Setup
function setupEventListeners() {
    // Category navigation event delegation
    const categoryList = document.querySelector('.category-list');
    if (categoryList) {
        categoryList.addEventListener('click', handleCategoryFilter);
    }
    
    // Add to cart buttons using event delegation
    document.addEventListener('click', handleAddToCart);
    
    // Search form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // Cart button click - Updated to open cart popup instead of navigating
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            toggleCartPopup(true);
        });
    }
    
    // Vendor button
    const vendorButton = document.getElementById('vendor-button');
    if (vendorButton) {
        vendorButton.addEventListener('click', () => {
            if (window.vendorManager) {
                window.vendorManager.showVendorRegistration();
            } else {
                // Basic fallback if vendorManager is not available
                alert('Vendor registration coming soon!');
            }
        });
    }
    
    // Wishlist functionality
    document.addEventListener('click', handleWishlist);
    
    // Quick view functionality
    document.addEventListener('click', handleQuickView);
}

// Handle category filter click
function handleCategoryFilter(e) {
    if (e.target.classList.contains('category-link')) {
        e.preventDefault();
        
        // Update active class
        const links = document.querySelectorAll('.category-link');
        links.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
        
        const category = e.target.textContent.trim();
        filterProductsByCategory(category);
    }
}

// Filter products by category
function filterProductsByCategory(category) {
    const productsGrid = document.getElementById('featured-products');
    if (!productsGrid) return;
    
    // Show all products for "All Categories"
    if (category === 'All Categories') {
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.display = 'flex';
        });
        return;
    }
    
    // Filter products by matching category
    document.querySelectorAll('.product-card').forEach(card => {
        const productCategory = card.dataset.category;
        card.style.display = productCategory === category.toLowerCase().replace(' & ', '-') ? 'flex' : 'none';
    });
    
    // If no products are displayed, show a message
    const visibleProducts = Array.from(productsGrid.querySelectorAll('.product-card')).filter(card => 
        card.style.display !== 'none'
    );
    
    if (visibleProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <p>No products found in ${category} category.</p>
            </div>
        `;
    }
}

// Handle add to cart button click
function handleAddToCart(e) {
    const addToCartButton = e.target.closest('.add-to-cart-button');
    if (!addToCartButton) return;
    
    const productId = parseInt(addToCartButton.dataset.id);
    let product;
    
    // Find the product in our data
    if (addToCartButton.closest('#special-offers')) {
        product = specialOffers.find(p => p.id === productId);
    } else {
        product = sampleProducts.find(p => p.id === productId);
    }
    
    if (!product) return;
    
    // Add to cart
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    updateCartPopupContent();
    
    // Visual feedback
    animateAddToCart(addToCartButton);
    showNotification(`${product.name} added to cart!`, 'success');
    
    // Show cart popup after adding item
    toggleCartPopup(true);
}

// Update cart count badge
function updateCartCount() {
    const cartCountElement = document.querySelector('#cart-button');
    if (!cartCountElement) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.setAttribute('data-count', totalItems);
    
    // Add animation class if items > 0
    if (totalItems > 0) {
        cartCountElement.classList.add('has-badge');
    } else {
        cartCountElement.classList.remove('has-badge');
    }
}

// Handle search form submission
function handleSearch(e) {
    e.preventDefault();
    
    const searchInput = e.target.querySelector('.search-input');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // Implement search functionality
    if (searchTerm) {
        // For demo purposes, we'll just show a notification
        showNotification(`Searching for "${searchTerm}"...`, 'info');
        
        // In a real app, you would filter products or redirect to search results page
    }
}

// Handle wishlist button click
function handleWishlist(e) {
    const wishlistButton = e.target.closest('.wishlist-btn');
    if (!wishlistButton) return;
    
    const productCard = wishlistButton.closest('.product-card');
    if (!productCard) return;
    
    const productId = parseInt(productCard.dataset.id);
    const isInWishlist = wishlist.includes(productId);
    
    if (isInWishlist) {
        // Remove from wishlist
        wishlist = wishlist.filter(id => id !== productId);
        wishlistButton.innerHTML = '<i class="far fa-heart"></i>';
        showNotification('Removed from wishlist', 'info');
    } else {
        // Add to wishlist
        wishlist.push(productId);
        wishlistButton.innerHTML = '<i class="fas fa-heart"></i>';
        showNotification('Added to wishlist', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Handle quick view button click
function handleQuickView(e) {
    const quickViewButton = e.target.closest('.quick-view-btn');
    if (!quickViewButton) return;
    
    const productCard = quickViewButton.closest('.product-card');
    if (!productCard) return;
    
    const productId = parseInt(productCard.dataset.id);
    
    // Find the product
    const product = [...sampleProducts, ...specialOffers].find(p => p.id === productId);
    if (!product) return;
    
    // Display quick view modal
    showQuickViewModal(product);
}

// Show quick view modal for a product - Improved design
function showQuickViewModal(product) {
    // Create modal HTML with improved design
    const modal = document.createElement('div');
    modal.className = 'modal quick-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="quick-view-container">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="quick-view-details">
                    <div class="product-vendor">${product.vendor}</div>
                    <h2 class="product-title">${product.name}</h2>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="product-rating">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                        <span class="rating-count">(${product.ratingCount} reviews)</span>
                    </div>
                    <p class="product-description">
                        ${product.description || 'Experience the premium quality and exceptional performance of this product. Perfect for everyday use with a stylish design that stands out.'}
                    </p>
                    <div class="product-quantity">
                        <label for="quantity">Quantity:</label>
                        <div class="quantity-selector">
                            <button class="quantity-decrease">-</button>
                            <input type="number" id="quantity" value="1" min="1" max="10">
                            <button class="quantity-increase">+</button>
                        </div>
                    </div>
                    <button class="add-to-cart-button primary-button" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Add to Cart</span>
                    </button>
                    <button class="wishlist-button secondary-button">
                        <i class="far fa-heart"></i>
                        <span>Add to Wishlist</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to DOM
    document.body.appendChild(modal);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    const closeButton = modal.querySelector('.modal-close');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    });
    
    // Quantity selector
    const quantityDecrease = modal.querySelector('.quantity-decrease');
    const quantityIncrease = modal.querySelector('.quantity-increase');
    const quantityInput = modal.querySelector('#quantity');
    
    quantityDecrease.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    quantityIncrease.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    // Add to cart from modal
    const addToCartButton = modal.querySelector('.add-to-cart-button');
    addToCartButton.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        
        // Add to cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update UI
        updateCartCount();
        updateCartPopupContent();
        
        // Visual feedback
        showNotification(`${product.name} added to cart!`, 'success');
        
        // Close modal
        document.body.removeChild(modal);
        document.body.style.overflow = '';
        
        // Show cart popup
        toggleCartPopup(true);
    });
}

// Setup Cart Popup
function setupCartPopup() {
    // Create cart popup HTML
    const cartPopup = document.createElement('div');
    cartPopup.className = 'cart-popup';
    cartPopup.innerHTML = `
        <div class="cart-header">
            <h3 class="cart-title">
                <i class="fas fa-shopping-cart"></i> Your Cart
            </h3>
            <button class="cart-close" aria-label="Close cart">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="cart-body">
            <div class="cart-items"></div>
        </div>
        <div class="cart-footer">
            <div class="cart-summary">
                <div class="cart-summary-row">
                    <span class="cart-summary-label">Subtotal:</span>
                    <span class="cart-summary-value subtotal">$0.00</span>
                </div>
                <div class="cart-summary-row">
                    <span class="cart-summary-label">Shipping:</span>
                    <span class="cart-summary-value shipping">$0.00</span>
                </div>
                <div class="cart-summary-row">
                    <span class="cart-summary-label">Tax:</span>
                    <span class="cart-summary-value tax">$0.00</span>
                </div>
            </div>
            <div class="cart-total">
                <span>Total:</span>
                <span class="total">$0.00</span>
            </div>
            <div class="cart-actions">
                <button class="cart-checkout-btn primary-button">
                    <i class="fas fa-credit-card"></i>
                    <span>Checkout</span>
                </button>
                <button class="cart-continue-btn secondary-button">
                    <i class="fas fa-arrow-left"></i>
                    <span>Continue Shopping</span>
                </button>
            </div>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(cartPopup);
    
    // Setup event listeners
    const closeButton = cartPopup.querySelector('.cart-close');
    closeButton.addEventListener('click', () => toggleCartPopup(false));
    
    const continueButton = cartPopup.querySelector('.cart-continue-btn');
    continueButton.addEventListener('click', () => toggleCartPopup(false));
    
    const checkoutButton = cartPopup.querySelector('.cart-checkout-btn');
    checkoutButton.addEventListener('click', () => {
        alert('Checkout functionality coming soon!');
    });
    
    // Setup cart overlay to close when clicking outside
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';
    cartOverlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 1200; display: none;';
    document.body.appendChild(cartOverlay);
    
    cartOverlay.addEventListener('click', () => toggleCartPopup(false));
    
    // Update cart content
    updateCartPopupContent();
}

// Toggle cart popup
function toggleCartPopup(show) {
    const cartPopup = document.querySelector('.cart-popup');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    if (!cartPopup || !cartOverlay) return;
    
    if (show) {
        cartPopup.classList.add('active');
        cartOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        updateCartPopupContent(); // Refresh content when opening
    } else {
        cartPopup.classList.remove('active');
        cartOverlay.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Update cart popup content
function updateCartPopupContent() {
    const cartItems = document.querySelector('.cart-items');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p>Add some products to your cart to see them here!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-content">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">
                        <span class="cart-item-current-price">$${item.price.toFixed(2)}</span>
                        ${item.originalPrice ? `<span class="cart-item-original-price">$${item.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="cart-item-quantity">
                        <button class="cart-quantity-btn decrease" data-id="${item.id}">-</button>
                        <input type="number" class="cart-item-quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="cart-quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');
        
        // Add event listeners for quantity changes and remove buttons
        setupCartItemEvents();
    }
    
    updateCartSummary();
}

// Setup cart item events
function setupCartItemEvents() {
    // Decrease quantity
    document.querySelectorAll('.cart-quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            const itemIndex = cart.findIndex(item => item.id === productId);
            
            if (itemIndex > -1 && cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
                saveCartAndUpdateUI();
            }
        });
    });
    
    // Increase quantity
    document.querySelectorAll('.cart-quantity-btn.increase').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            const itemIndex = cart.findIndex(item => item.id === productId);
            
            if (itemIndex > -1) {
                cart[itemIndex].quantity += 1;
                saveCartAndUpdateUI();
            }
        });
    });
    
    // Update quantity directly
    document.querySelectorAll('.cart-item-quantity-input').forEach(input => {
        input.addEventListener('change', () => {
            const productId = parseInt(input.dataset.id);
            const quantity = parseInt(input.value);
            const itemIndex = cart.findIndex(item => item.id === productId);
            
            if (itemIndex > -1 && quantity > 0) {
                cart[itemIndex].quantity = quantity;
                saveCartAndUpdateUI();
            } else if (quantity <= 0) {
                input.value = 1;
                cart[itemIndex].quantity = 1;
                saveCartAndUpdateUI();
            }
        });
    });
    
    // Remove item
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            cart = cart.filter(item => item.id !== productId);
            saveCartAndUpdateUI();
        });
    });
}

// Save cart to localStorage and update UI
function saveCartAndUpdateUI() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartPopupContent();
}

// Update cart summary
function updateCartSummary() {
    const subtotalElement = document.querySelector('.cart-summary-value.subtotal');
    const shippingElement = document.querySelector('.cart-summary-value.shipping');
    const taxElement = document.querySelector('.cart-summary-value.tax');
    const totalElement = document.querySelector('.cart-total .total');
    
    if (!subtotalElement || !shippingElement || !taxElement || !totalElement) return;
    
    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Calculate shipping (free shipping over $50, otherwise $5.99)
    const shipping = subtotal > 50 ? 0 : 5.99;
    
    // Calculate tax (8.25%)
    const tax = subtotal * 0.0825;
    
    // Calculate total
    const total = subtotal + shipping + tax;
    
    // Update UI
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Initialize mobile navigation menu
function initializeMobileNav() {
    // Add mobile navigation toggle button
    const header = document.querySelector('.header-start');
    if (!header) return;
    
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileNavToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    header.appendChild(mobileNavToggle);
    
    // Create mobile nav elements
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    
    const mainNav = document.querySelector('.main-nav');
    
    // Toggle mobile navigation
    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.add('is-active');
        navOverlay.classList.add('is-active');
        document.body.appendChild(navOverlay);
        document.body.style.overflow = 'hidden';
        
        // Add close button if it doesn't exist
        if (!mainNav.querySelector('.close-nav')) {
            const closeNav = document.createElement('button');
            closeNav.className = 'close-nav';
            closeNav.innerHTML = '<i class="fas fa-times"></i>';
            closeNav.setAttribute('aria-label', 'Close navigation menu');
            mainNav.prepend(closeNav);
            
            closeNav.addEventListener('click', closeMobileNav);
        }
    });
    
    // Close navigation on overlay click
    navOverlay.addEventListener('click', closeMobileNav);
    
    function closeMobileNav() {
        mainNav.classList.remove('is-active');
        navOverlay.classList.remove('is-active');
        document.body.style.overflow = '';
        
        if (navOverlay.parentNode) {
            navOverlay.parentNode.removeChild(navOverlay);
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${getIconForType(type)}"></i>
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after timeout
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
    
    function getIconForType(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            case 'info':
            default: return 'fa-info-circle';
        }
    }
}

// Animate add to cart button
function animateAddToCart(button) {
    button.classList.add('adding');
    button.innerHTML = '<i class="fas fa-check"></i><span>Added</span>';
    
    setTimeout(() => {
        button.classList.remove('adding');
        button.innerHTML = '<i class="fas fa-shopping-cart"></i><span>Add</span>';
    }, 1500);
}