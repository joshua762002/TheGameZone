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
function buyGame(button) {
    const card = button.closest('.shop-box');
    button.disabled = true;
    button.innerText = "Processing...";
  
    // Get today's date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  
    // Create the game object for the purchased item
    const game = {
      id: Date.now(),
      image: card.querySelector('.game-image').src,
      title: card.querySelector('.game-title').textContent,
      genre: card.querySelector('.game-genre').textContent,
      rating: card.querySelector('.rating').textContent,
      price: card.querySelector('.price').textContent,
      age: card.querySelector('.age-limit').textContent,
      date: formattedDate
    };
  
    // Retrieve existing purchases and add the new game
    let purchases = JSON.parse(localStorage.getItem('purchased')) || [];
    purchases.push(game);
    localStorage.setItem('purchased', JSON.stringify(purchases));
  
    // Show the purchase confirmation popup
    showPurchasePopup(game);
  
    // Redirect to the purchased games page after 3 seconds
    setTimeout(() => {
      window.location.href = 'purchasedgames.html';
    }, 3000);
  }
  
  function showPurchasePopup(game) {
    const popup = document.getElementById('purchase-popup');
    document.getElementById('popup-image').src = game.image;
    document.getElementById('popup-title').textContent = game.title;
    document.getElementById('popup-price').textContent = `Price: ${game.price}`;
    document.getElementById('popup-date').textContent = `📅 Purchased on: ${game.date}`;
  
    popup.classList.add('show');
  
    setTimeout(() => {
      popup.classList.remove('show');
    }, 2500);
  }
  