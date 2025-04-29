// Vendor Management System

class VendorManager {
    constructor() {
        this.storageManager = window.storageManager;
        this.animationController = window.animationController;
        this.vendors = [];
        this.currentVendor = null;
    }

    // Initialize vendor system
    async init() {
        try {
            // In a real application, this would fetch from an API
            this.vendors = await this.getMockVendors();
            this.setupVendorGrid();
            this.setupVendorEvents();
        } catch (error) {
            console.error('Error initializing vendor system:', error);
        }
    }

    // Mock vendor data with direct image URLs instead of Unsplash API
    getMockVendors() {
        return new Promise((resolve) => {
            resolve([
                {
                    id: 1,
                    name: 'TechGear',
                    logo: 'https://images.pexels.com/photos/1314544/pexels-photo-1314544.jpeg?auto=compress&cs=tinysrgb&w=600',
                    description: 'Premium electronics and accessories',
                    rating: 4.5,
                    products: 120,
                    joinDate: '2023-01-15',
                    coverImage: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600'
                },
                {
                    id: 2,
                    name: 'FashionHub',
                    logo: 'https://images.pexels.com/photos/5935738/pexels-photo-5935738.jpeg?auto=compress&cs=tinysrgb&w=600',
                    description: 'Trendy fashion for everyone',
                    rating: 4.8,
                    products: 350,
                    joinDate: '2023-02-20',
                    coverImage: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=600'
                },
                {
                    id: 3,
                    name: 'HomeDecor',
                    logo: 'https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg?auto=compress&cs=tinysrgb&w=600',
                    description: 'Beautiful home decorations and furniture',
                    rating: 4.6,
                    products: 215,
                    joinDate: '2023-03-05',
                    coverImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600'
                },
                {
                    id: 4,
                    name: 'GourmetExpress',
                    logo: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600',
                    description: 'Delicious gourmet food products',
                    rating: 4.7,
                    products: 180,
                    joinDate: '2023-04-10',
                    coverImage: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600'
                },
                {
                    id: 5,
                    name: 'FitLife',
                    logo: 'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=600',
                    description: 'Premium fitness and wellness products',
                    rating: 4.4,
                    products: 150,
                    joinDate: '2023-05-15',
                    coverImage: 'https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'
                }
            ]);
        });
    }

    // Get specific product images by category
    async getProductImagesForVendor(vendorId, count = 8) {
        try {
            const vendor = this.getVendorDetails(vendorId);
            if (!vendor) return [];

            // Return mock product images based on vendor type
            const mockProductImages = {
                1: [ // TechGear
                    { url: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Tech product 1' },
                    { url: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Tech product 2' },
                    { url: 'https://images.pexels.com/photos/792199/pexels-photo-792199.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Tech product 3' },
                    { url: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Tech product 4' },
                    { url: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Tech product 5' },
                    { url: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Tech product 6' }
                ],
                2: [ // FashionHub
                    { url: 'https://images.pexels.com/photos/934069/pexels-photo-934069.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Fashion product 1' },
                    { url: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Fashion product 2' },
                    { url: 'https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Fashion product 3' },
                    { url: 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Fashion product 4' }
                ],
                3: [ // HomeDecor
                    { url: 'https://images.pexels.com/photos/1090092/pexels-photo-1090092.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Home product 1' },
                    { url: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Home product 2' },
                    { url: 'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Home product 3' }
                ],
                4: [ // GourmetExpress
                    { url: 'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Food product 1' },
                    { url: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Food product 2' }
                ],
                5: [ // FitLife
                    { url: 'https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Fitness product 1' },
                    { url: 'https://images.pexels.com/photos/4397833/pexels-photo-4397833.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Fitness product 2' }
                ]
            };

            return mockProductImages[vendorId] || [];
        } catch (error) {
            console.error('Error fetching product images:', error);
            return [];
        }
    }

    // Setup vendor grid in the UI with improved design
    setupVendorGrid() {
        const vendorGrid = document.querySelector('.vendors-grid');
        if (!vendorGrid) return;

        vendorGrid.innerHTML = this.vendors.map(vendor => this.createVendorCard(vendor)).join('');
    }

    // Create vendor card HTML with enhanced design
    createVendorCard(vendor) {
        return `
            <div class="vendor-card" data-vendor-id="${vendor.id}">
                <div class="vendor-cover">
                    <img src="${vendor.coverImage}" alt="${vendor.name} cover" class="cover-image loaded">
                </div>
                <div class="vendor-logo-container">
                    <div class="vendor-logo">
                        <img src="${vendor.logo}" alt="${vendor.name}" class="loaded">
                    </div>
                </div>
                <div class="vendor-info">
                    <h3 class="vendor-name">${vendor.name}</h3>
                    <p class="description">${vendor.description}</p>
                    <div class="vendor-stats">
                        <span class="rating">
                            <i class="fas fa-star"></i> ${vendor.rating.toFixed(1)}
                        </span>
                        <span class="products-count">
                            <i class="fas fa-box-open"></i> ${vendor.products} Products
                        </span>
                    </div>
                    <div class="vendor-since">
                        <span class="join-date">
                            <i class="fas fa-calendar-alt"></i> Since ${new Date(vendor.joinDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short'})}
                        </span>
                    </div>
                    <button class="visit-store-btn primary-button">
                        <i class="fas fa-store"></i> Visit Store
                    </button>
                </div>
            </div>
        `;
    }

    // Setup vendor-related event listeners
    setupVendorEvents() {
        const vendorGrid = document.querySelector('.vendors-grid');
        if (vendorGrid) {
            vendorGrid.addEventListener('click', (e) => {
                const visitStoreBtn = e.target.closest('.visit-store-btn');
                if (visitStoreBtn) {
                    const vendorCard = e.target.closest('.vendor-card');
                    if (vendorCard) {
                        const vendorId = vendorCard.dataset.vendorId;
                        this.visitVendorStore(vendorId);
                    }
                }
            });
        } else {
            console.warn('Vendor grid container not found for event delegation.');
        }

        const vendorBtn = document.querySelector('.vendor-btn');
        if (vendorBtn) {
            vendorBtn.addEventListener('click', () => this.showVendorRegistration());
        }
    }

    // Fallback method if lazy loading is not available
    loadImagesImmediately(container) {
        if (!container) return;
        
        const lazyImages = container.querySelectorAll('img.lazy-load');
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            }
        });
    }

    // Visit vendor store
    visitVendorStore(vendorId) {
        const vendor = this.vendors.find(v => v.id === parseInt(vendorId));
        if (!vendor) return;

        // Use animation controller to show loading
        if (this.animationController) {
            this.animationController.showNotification(`Loading ${vendor.name} store...`, 'info');
        }

        // Get product images for this vendor before navigation
        this.getProductImagesForVendor(vendorId)
            .then(productImages => {
                // Store product images in session storage for use on the vendor page
                if (productImages.length > 0) {
                    sessionStorage.setItem(`vendor_${vendorId}_products`, JSON.stringify(productImages));
                }
                
                // Navigate to vendor page
                window.location.href = `pages/vendor-profile.html?id=${vendorId}`;
            })
            .catch(error => {
                console.error('Error getting vendor products:', error);
                // Still navigate even if product fetching fails
                window.location.href = `pages/vendor-profile.html?id=${vendorId}`;
            });
    }

    // Show vendor registration modal
    showVendorRegistration() {
        const modalContent = `
            <div class="modal-header">
                <h2>Become a Valued Vendor</h2>
                <p>Join our thriving marketplace!</p>
            </div>
            <div class="modal-body vendor-registration">
                <form id="vendor-registration-form">
                    <div class="form-group">
                        <label for="storeName">Store Name</label>
                        <input type="text" id="storeName" name="storeName" required placeholder="e.g., Awesome Gadgets">
                    </div>
                    <div class="form-group">
                        <label for="description">Store Description</label>
                        <textarea id="description" name="description" required placeholder="Describe what makes your store unique"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="email">Business Email</label>
                        <input type="email" id="email" name="email" required placeholder="you@business.com">
                    </div>
                    <div class="form-group">
                        <label for="phone">Business Phone</label>
                        <input type="tel" id="phone" name="phone" required placeholder="(555) 123-4567">
                    </div>
                    <div class="form-group">
                        <label for="category">Main Category</label>
                        <select id="category" name="category" required>
                            <option value="" disabled selected>Select Your Primary Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="home">Home & Living</option>
                            <option value="beauty">Beauty</option>
                            <option value="sports">Sports</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <button type="submit" class="submit-btn gradient-btn">
                        <i class="fas fa-paper-plane"></i> Submit Application
                    </button>
                </form>
            </div>
        `;

        if (this.animationController) {
            this.animationController.showModal(modalContent);
            this.setupRegistrationForm();
        }
    }

    // Setup vendor registration form handlers
    setupRegistrationForm() {
        const form = document.getElementById('vendor-registration-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            await this.handleVendorRegistration(form);
        });
    }

    // Handle vendor registration submission
    async handleVendorRegistration(form) {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });

        const submitBtn = form.querySelector('.submit-btn');

        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            console.log('Submitting vendor registration:', data);
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (this.animationController) {
                this.animationController.showNotification(
                    'Application submitted! We will review it and contact you soon.',
                    'success'
                );

                const modal = form.closest('.modal');
                if (modal) {
                    this.animationController.closeModal(modal);
                }
            }

        } catch (error) {
            console.error('Error registering vendor:', error);
            
            if (this.animationController) {
                this.animationController.showNotification(
                    `Registration failed: ${error.message || 'Please try again.'}`,
                    'error'
                );
            }
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
        }
    }

    // Get vendor details
    getVendorDetails(vendorId) {
        return this.vendors.find(v => v.id === parseInt(vendorId));
    }

    // Get vendor products
    async getVendorProducts(vendorId) {
        // Try to get from session storage first
        const storedProducts = sessionStorage.getItem(`vendor_${vendorId}_products`);
        if (storedProducts) {
            return JSON.parse(storedProducts);
        }
        
        // Otherwise fetch new products
        return this.getProductImagesForVendor(vendorId);
    }
}

// Create and export a single instance
const vendorManager = new VendorManager();
window.vendorManager = vendorManager;

// Initialize vendor system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.vendorManager) {
        window.vendorManager.init();
    }
});