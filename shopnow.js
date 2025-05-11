function addToWishlist(button) {
  const shopBox = button.closest('.shop-box');
  const title = shopBox.querySelector('.game-title').innerText;
  const image = shopBox.querySelector('img').getAttribute('src');
  const genre = shopBox.querySelector('.game-genre').innerText;
  const rating = shopBox.querySelector('.rating').innerText;
  const price = shopBox.querySelector('.price').innerText;
  const age = shopBox.querySelector('.age-limit').innerText;
  const id = title.toLowerCase().replace(/\s+/g, '-');

  const item = { id, title, image, genre, rating, price, age };

  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

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
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const shopContainer = document.querySelector('.shop-container'); // Where all shop-boxes are located

function getAllGamesFromDOM() {
  const gameBoxes = document.querySelectorAll('.shop-box');
  return Array.from(gameBoxes).map(box => ({
    element: box,
    title: box.querySelector('.game-title').textContent.toLowerCase()
  }));
}

function filterAndDisplayGames(searchTerm) {
  const allGames = getAllGamesFromDOM();
  allGames.forEach(game => {
    if (game.title.includes(searchTerm)) {
      game.element.style.display = 'block';
    } else {
      game.element.style.display = 'none';
    }
  });
}

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  filterAndDisplayGames(searchTerm);
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const searchTerm = searchInput.value.toLowerCase().trim();
    filterAndDisplayGames(searchTerm);
  }
});

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'wishlist-toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 100);

  // Auto remove after 2.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}