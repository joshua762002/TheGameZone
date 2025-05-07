// Display wishlist items on the wishlist.html page
window.onload = function () {
    const container = document.getElementById('wishlist-container');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (wishlist.length === 0) {
        container.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }

    wishlist.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'wishlist-item';
        div.dataset.id = item.id; // Save id in DOM for reference

        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" />
            <h3>${item.title}</h3>
            <p>${item.genre}</p>
            <p>${item.rating}</p>
            <p>${item.price}</p>
            <p>${item.age}</p>
            <button class="remove-btn">🗑 Remove from Wishlist</button>
        `;

        div.querySelector('.remove-btn').addEventListener('click', function () {
            removeFromWishlist(item.id);
        });

        container.appendChild(div);
    });
};

// Function to remove an item from the wishlist
function removeFromWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlist = wishlist.filter(item => item.id !== id);

    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    location.reload(); // Reload to update the view
}
