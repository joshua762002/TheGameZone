document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('wishlist-container');
    const wishlist = getLocalStorage('wishlist');

    if (!wishlist.length) {
        container.innerHTML = `<p class="empty-message">Your wishlist is empty.</p>`;
        return;
    }

    wishlist.forEach(item => {
        const itemElement = createWishlistItem(item);
        container.appendChild(itemElement);
    });
});

/**
 * Get and parse JSON data from localStorage.
 * @param {string} key - The key of the data.
 * @returns {Array|Object} Parsed data or empty array.
 */
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

/**
 * Set data to localStorage after stringifying it.
 * @param {string} key - The storage key.
 * @param {any} value - The data to store.
 */
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Remove a specific item from the wishlist.
 * @param {number|string} id - The ID of the item to remove.
 * @param {HTMLElement} element - The DOM element to animate and remove.
 */
function removeFromWishlist(id, element) {
    const updatedWishlist = getLocalStorage('wishlist').filter(item => item.id !== id);
    setLocalStorage('wishlist', updatedWishlist);

    element.classList.add('fade-out');
    setTimeout(() => element.remove(), 400); // Match with CSS transition
}

/**
 * Add item to cart and redirect to addtocart.html
 * @param {Object} item - The item object to add to the cart.
 */
function addToCart(item) {
    const cart = getLocalStorage('cart');
    cart.push(item);
    setLocalStorage('cart', cart);
    window.location.href = 'addtocart.html';
}

/**
 * Create a DOM element for a wishlist item.
 * @param {Object} item - The wishlist item.
 * @returns {HTMLElement} The wishlist item element.
 */
function createWishlistItem(item) {
    const div = document.createElement('div');
    div.className = 'wishlist-item';
    div.dataset.id = item.id;

    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="item-image" />
        <h3 class="item-title">${item.title}</h3>
        <p class="item-detail">${item.genre}</p>
        <p class="item-detail">⭐ ${item.rating}</p>
        <p class="item-price">$${item.price}</p>
        <p class="item-age">Age: ${item.age}</p>
        <div class="item-actions">
            <button class="btn btn-remove">🗑 Remove</button>
            <button class="btn btn-cart">🛒 Add to Cart</button>
        </div>
    `;

    div.querySelector('.btn-remove').addEventListener('click', () => removeFromWishlist(item.id, div));
    div.querySelector('.btn-cart').addEventListener('click', () => addToCart(item));

    return div;
}
