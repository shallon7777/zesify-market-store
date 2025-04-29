// Local Storage Manager

class StorageManager {
    constructor() {
        this.storage = window.localStorage;
    }

    // Cart Operations
    getCart() {
        try {
            return JSON.parse(this.storage.getItem('cart')) || [];
        } catch (error) {
            console.error('Error reading cart from storage:', error);
            return [];
        }
    }

    saveCart(cart) {
        try {
            this.storage.setItem('cart', JSON.stringify(cart));
            return true;
        } catch (error) {
            console.error('Error saving cart to storage:', error);
            return false;
        }
    }

    // User Preferences
    savePreferences(preferences) {
        try {
            this.storage.setItem('userPreferences', JSON.stringify(preferences));
            return true;
        } catch (error) {
            console.error('Error saving preferences:', error);
            return false;
        }
    }

    getPreferences() {
        try {
            return JSON.parse(this.storage.getItem('userPreferences')) || {
                theme: 'light',
                currency: 'USD',
                language: 'en'
            };
        } catch (error) {
            console.error('Error reading preferences:', error);
            return {
                theme: 'light',
                currency: 'USD',
                language: 'en'
            };
        }
    }

    // Recently Viewed Products
    addRecentlyViewed(product) {
        try {
            const recentlyViewed = this.getRecentlyViewed();
            // Remove if product already exists
            const filtered = recentlyViewed.filter(item => item.id !== product.id);
            // Add to start of array
            filtered.unshift(product);
            // Keep only last 10 items
            const updated = filtered.slice(0, 10);
            this.storage.setItem('recentlyViewed', JSON.stringify(updated));
            return true;
        } catch (error) {
            console.error('Error adding to recently viewed:', error);
            return false;
        }
    }

    getRecentlyViewed() {
        try {
            return JSON.parse(this.storage.getItem('recentlyViewed')) || [];
        } catch (error) {
            console.error('Error reading recently viewed:', error);
            return [];
        }
    }

    // Search History
    addSearchTerm(term) {
        try {
            const searchHistory = this.getSearchHistory();
            // Remove if term already exists
            const filtered = searchHistory.filter(item => item !== term);
            // Add to start of array
            filtered.unshift(term);
            // Keep only last 10 items
            const updated = filtered.slice(0, 10);
            this.storage.setItem('searchHistory', JSON.stringify(updated));
            return true;
        } catch (error) {
            console.error('Error adding search term:', error);
            return false;
        }
    }

    getSearchHistory() {
        try {
            return JSON.parse(this.storage.getItem('searchHistory')) || [];
        } catch (error) {
            console.error('Error reading search history:', error);
            return [];
        }
    }

    // Wishlist Operations
    getWishlist() {
        try {
            return JSON.parse(this.storage.getItem('wishlist')) || [];
        } catch (error) {
            console.error('Error reading wishlist:', error);
            return [];
        }
    }

    addToWishlist(product) {
        try {
            const wishlist = this.getWishlist();
            if (!wishlist.find(item => item.id === product.id)) {
                wishlist.push(product);
                this.storage.setItem('wishlist', JSON.stringify(wishlist));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            return false;
        }
    }

    removeFromWishlist(productId) {
        try {
            const wishlist = this.getWishlist();
            const updated = wishlist.filter(item => item.id !== productId);
            this.storage.setItem('wishlist', JSON.stringify(updated));
            return true;
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            return false;
        }
    }

    // Storage Management
    clearStorage() {
        try {
            this.storage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    }

    clearItem(key) {
        try {
            this.storage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error clearing ${key}:`, error);
            return false;
        }
    }

    // Storage Size Management
    getStorageSize() {
        try {
            let size = 0;
            for (let key in this.storage) {
                if (this.storage.hasOwnProperty(key)) {
                    size += this.storage.getItem(key).length;
                }
            }
            return size;
        } catch (error) {
            console.error('Error calculating storage size:', error);
            return 0;
        }
    }

    isStorageFull() {
        try {
            const maxSize = 5242880; // 5MB in bytes
            return this.getStorageSize() >= maxSize;
        } catch (error) {
            console.error('Error checking storage size:', error);
            return true; // Return true as a precaution
        }
    }
}

// Create and export a single instance
const storageManager = new StorageManager();
window.storageManager = storageManager; // Make it globally available