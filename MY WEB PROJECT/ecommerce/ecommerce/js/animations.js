// Animation Controller

class AnimationController {
    constructor() {
        this.animationQueue = new Map(); // Keep for potential future specific queued animations
        this.observer = null; // Initialize observer as null
        this.setupIntersectionObserver();
    }

    // Intersection Observer for scroll-based animations
    setupIntersectionObserver() {
        // Ensure observer isn't created multiple times
        if (this.observer) return;

        this.observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        target.classList.add('is-visible'); // Add class to trigger CSS animation
                        observerInstance.unobserve(target); // Stop observing once visible
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% is visible
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before it's fully in view
            }
        );

        // Observe elements initially present on the page
        this.observeElements('.products-grid .product-card, .vendors-grid .vendor-card');
    }

    // Helper to observe elements matching a selector
    observeElements(selector) {
        if (!this.observer) return;
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            // Only observe if not already visible (e.g., if added dynamically)
            if (!el.classList.contains('is-visible')) {
                this.observer.observe(el);
            }
        });
    }

    // Add element to animation queue (Revised - primarily for scroll observation now)
    queueAnimation(element, animation) {
        // This method might be less used now, focusing on IntersectionObserver
        // If a specific animation string is needed, it could be stored here
        // For now, just ensure the element is observed
        if (this.observer && !element.classList.contains('is-visible')) {
            this.observer.observe(element);
        }
    }

    // Play animation (Revised - mostly handled by CSS now)
    playAnimation(element, animation) {
        // Direct animation playing might be less common
        // Kept for potential specific use cases
        element.style.opacity = '1'; // Ensure visible
        if (animation) {
            element.style.animation = animation;
        }
    }

    // Product Card Hover Effects (Handled by CSS transitions in main.css)
    initializeProductCards() {
        // This method is likely redundant now as hover effects are CSS-driven.
        // console.log('Product card hover effects initialized (CSS-driven).');
        // If complex JS hover logic is needed later, it can be added here.
    }

    // Add to Cart Animation (Refined - triggers CSS classes)
    addToCartAnimation(button) {
        if (!button) return;
        button.disabled = true;
        button.classList.add('processing'); // Optional: Style for processing state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';

        setTimeout(() => {
            button.classList.remove('processing');
            button.classList.add('added');
            button.innerHTML = '<i class="fas fa-check"></i> Added!';

            setTimeout(() => {
                button.classList.remove('added');
                button.disabled = false;
                button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            }, 1500); // Duration 'Added!' state is shown
        }, 800); // Duration of 'processing' state
    }

    // Notification Animation (Refined - uses CSS classes)
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`; // Base class + type
        notification.textContent = message;

        document.body.appendChild(notification);

        // Trigger CSS transition by adding 'is-visible'
        requestAnimationFrame(() => { // Ensure element is in DOM before animating
            notification.classList.add('is-visible');
        });

        // Auto-remove notification
        setTimeout(() => {
            notification.classList.remove('is-visible');
            // Remove from DOM after transition ends
            notification.addEventListener('transitionend', () => notification.remove(), { once: true });
        }, 3500); // Display duration + transition time
    }

    // Loading Spinner Animation (Refined - creates spinner element)
    showLoadingSpinner(element) {
        if (!element) return null;
        // Remove existing spinner first
        const existingSpinner = element.querySelector('.loading-spinner');
        if (existingSpinner) existingSpinner.remove();

        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        // Append or prepend based on context, appending is safer default
        element.appendChild(spinner);
        return spinner;
    }

    removeLoadingSpinner(spinner) {
        if (spinner && spinner.parentNode) {
            spinner.remove();
        }
    }

    // Modal Animation (Refined - uses CSS classes)
    showModal(content) {
        // Close existing modals first (optional, prevents stacking)
        const existingModal = document.querySelector('.modal');
        if (existingModal) this.closeModal(existingModal);

        const modal = document.createElement('div');
        modal.className = 'modal'; // Base class for overlay
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-btn" aria-label="Close modal">&times;</button>
                ${content}
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        const closeBtn = modal.querySelector('.close-btn');
        const modalContentEl = modal.querySelector('.modal-content');

        // Add close functionality
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => {
            // Close only if clicking the overlay itself
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        // Add ESC key listener
        const escapeListener = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
            }
        };
        document.addEventListener('keydown', escapeListener);
        // Store listener reference for removal
        modal.escapeListener = escapeListener;

        // Trigger animation
        requestAnimationFrame(() => {
            modal.classList.add('is-visible');
            // modalContentEl.classList.add('is-visible'); // Content animation handled by modal visibility
        });

        return modal; // Return modal instance
    }

    closeModal(modal) {
        if (!modal) return;

        modal.classList.remove('is-visible');
        document.body.style.overflow = ''; // Restore scrolling

        // Remove ESC listener
        if (modal.escapeListener) {
            document.removeEventListener('keydown', modal.escapeListener);
        }

        // Remove from DOM after transition
        modal.addEventListener('transitionend', (e) => {
            // Ensure we're listening for the overlay transition, not children
            if (e.target === modal) {
                modal.remove();
            }
        }, { once: true });
    }

    // Smooth Scroll Animation (Remains largely the same, relies on CSS scroll-behavior)
    smoothScroll(targetSelector) {
        const element = document.querySelector(targetSelector);
        if (!element) {
            console.warn(`Smooth scroll target not found: ${targetSelector}`);
            return;
        }

        // Use native smooth scrolling if available
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Fallback or alternative JS animation could be added here if needed
    }

    // Image Preview Animation (Refined - uses modal structure)
    initializeImagePreviews() {
        // Use event delegation on body or a closer container
        document.body.addEventListener('click', (e) => {
            const img = e.target.closest('.product-image img'); // Target images within product cards
            if (img && img.classList.contains('loaded')) { // Only preview loaded images
                this.showImagePreview(img.src, img.alt);
            }
        });
    }

    showImagePreview(src, alt = 'Image Preview') {
        const previewContent = `
            <div class="image-preview-container">
                <img src="${src}" alt="${alt}">
                <p>${alt}</p> 
            </div>
        `;
        // Use the standard modal for consistency
        const modal = this.showModal(previewContent);
        if (modal) {
            modal.querySelector('.modal-content').classList.add('image-preview-modal'); // Add specific class for styling
        }
    }
}

// Create and export a single instance
const animationController = new AnimationController();
window.animationController = animationController;

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initializations that rely on DOM elements being present
    // animationController.initializeProductCards(); // Redundant now
    animationController.initializeImagePreviews();
    // Initial observation for scroll animations is handled in setupIntersectionObserver
});