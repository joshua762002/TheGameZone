document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cart-container');
    const cart = getLocalStorage('cart');

    if (!cart.length) {
        container.innerHTML = `<p class="empty-message">Your cart is empty.</p>`;
        return;
    }

    cart.forEach(item => {
        const itemElement = createCartItem(item);
        container.appendChild(itemElement);
    });
});

/**
 * Get parsed data from localStorage.
 * @param {string} key
 * @returns {Array}
 */
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

/**
 * Generate a cart item element.
 * @param {Object} item
 * @returns {HTMLElement}
 */
function createCartItem(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="item-image" />
        <div class="item-details">
            <h3>${item.title}</h3>
            <p>Genre: ${item.genre}</p>
            <p>Rating: ⭐ ${item.rating}</p>
            <p>Price: $${item.price}</p>
            <p>Age: ${item.age}</p>
        </div>
    `;

    return div;
}
