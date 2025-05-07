function addToWishlist(button) {
    const shopBox = button.closest('.shop-box');
    const title = shopBox.querySelector('.game-title').innerText;
    const image = shopBox.querySelector('img').getAttribute('src');
    const genre = shopBox.querySelector('.game-genre').innerText;
    const rating = shopBox.querySelector('.rating').innerText;
    const price = shopBox.querySelector('.price').innerText;
    const age = shopBox.querySelector('.age-limit').innerText;
    const id = title.toLowerCase().replace(/\s+/g, '-'); // unique ID based on title (this will be the same for identical names, consider making it more unique like using a random ID or a combination of title and another unique property)

    const item = { id, title, image, genre, rating, price, age };

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Check if the item already exists in the wishlist
    const exists = wishlist.some(product => product.id === item.id);
    if (!exists) {
      wishlist.push(item);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert(`${title} added to your wishlist!`);
    } else {
      alert(`${title} is already in your wishlist.`);
    }
}
