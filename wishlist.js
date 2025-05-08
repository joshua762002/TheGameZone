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
 */
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

/**
 * Set data to localStorage after stringifying it.
 */
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Remove a specific item from the wishlist.
 */
function removeFromWishlist(id, element) {
    const updatedWishlist = getLocalStorage('wishlist').filter(item => item.id !== id);
    setLocalStorage('wishlist', updatedWishlist);

    element.classList.add('fade-out');
    setTimeout(() => element.remove(), 400); // match with CSS transition
}

/**
 * Add item to cart without redirecting.
 */
function addToCart(item) {
    // Parse price if it's a string with ₱
    if (typeof item.price === 'string') {
        item.price = parseFloat(item.price.replace(/[₱,]/g, '')) || 0;
    }

    const cart = getLocalStorage('cart');
    cart.push(item);
    setLocalStorage('cart', cart);

    alert(`${item.title} added to cart!`);
}

/**
 * Create a DOM element for a wishlist item.
 */
function createWishlistItem(item) {
    const div = document.createElement('div');
    div.className = 'wishlist-item';
    div.dataset.id = item.id;

    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="item-image" />
        <h3 class="item-title">${item.title}</h3>
        <p class="item-detail genre">${item.genre}</p>
        <p class="item-detail rating">⭐ ${item.rating}</p>
        <p class="item-price price">${item.price}</p>
        <p class="item-age age">Age: ${item.age}</p>
        <div class="item-actions">
            <button class="btn btn-remove">🗑 Remove</button>
            <button class="btn btn-cart">🛒 Add to Cart</button>
        </div>
    `;

    div.querySelector('.btn-remove').addEventListener('click', () => removeFromWishlist(item.id, div));
    div.querySelector('.btn-cart').addEventListener('click', () => addToCart(item));

    return div;
}
