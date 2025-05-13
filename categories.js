// ❤️ Add to Wishlist
function addToWishlist(button) {
  const shopBox = button.closest('.shop-box');
  const item = {
    id: shopBox.querySelector('.game-title').innerText.toLowerCase().replace(/\s+/g, '-'),
    title: shopBox.querySelector('.game-title').innerText,
    image: shopBox.querySelector('img').getAttribute('src'),
    genre: shopBox.querySelector('.game-genre').innerText,
    rating: shopBox.querySelector('.rating').innerText,
    price: shopBox.querySelector('.price').innerText,
    age: shopBox.querySelector('.age-limit').innerText
  };

  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const exists = wishlist.some(product => product.id === item.id);

  if (!exists) {
    wishlist.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showToast(`${item.title} added to your wishlist!`);
  } else {
    showToast(`${item.title} is already in your wishlist.`);
  }
}

// 🔔 Toast Notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'wishlist-toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}

// 🛒 Buy Game
function buyGame(button) {
  const card = button.closest('.shop-box');
  button.disabled = true;
  button.innerText = "Processing...";

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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

  showPaymentMethodPopup(game);
}

// ✅ Complete Purchase
function completePurchase(game, method) {
  const purchases = JSON.parse(localStorage.getItem('purchased')) || [];
  purchases.push(game);
  localStorage.setItem('purchased', JSON.stringify(purchases));

  const paymentPopup = document.querySelector('.payment-popup-overlay');
  if (paymentPopup) {
    paymentPopup.classList.remove('show');
    setTimeout(() => paymentPopup.remove(), 500);
  }

  showPurchasePopup(game);

  setTimeout(() => {
    window.location.href = 'purchasedgames.html';
  }, 3000);
}

// 💬 Purchase Confirmation Popup
function showPurchasePopup(game) {
  const popup = document.getElementById('purchase-popup');
  document.getElementById('popup-image').src = game.image;
  document.getElementById('popup-title').textContent = game.title;
  document.getElementById('popup-price').textContent = `Price: ${game.price}`;
  document.getElementById('popup-date').textContent = `📅 Purchased on: ${game.date}`;

  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 2500);
}

// 💳 Payment Method Popup with Animation
function showPaymentMethodPopup(game) {
  const paymentPopup = document.createElement('div');
  paymentPopup.className = 'payment-popup-overlay';
  paymentPopup.innerHTML = `
    <div class="payment-popup">
      <h2>Select Payment Method</h2>
      <p><strong>${game.title}</strong></p>
      <p>${game.price}</p>
      <input type="tel" id="phone-number" placeholder="Enter Phone Number" maxlength="11" />
      <div class="payment-buttons">
        <button class="gcash-btn">Pay with GCash</button>
        <button class="simcard-btn">Pay with Sim Card</button>
      </div>
      <div class="cancel-container">
        <button class="cancel-btn">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(paymentPopup);
  setTimeout(() => paymentPopup.classList.add('show'), 100);

  const phoneInput = paymentPopup.querySelector('#phone-number');

  const handlePayment = method => {
    if (validatePhone(phoneInput.value)) {
      completePurchase({ ...game, phone: phoneInput.value }, method);
    } else {
      alert('Please enter a valid phone number.');
    }
  };

  paymentPopup.querySelector('.gcash-btn').onclick = () => handlePayment('GCash');
  paymentPopup.querySelector('.simcard-btn').onclick = () => handlePayment('Sim Card');

  paymentPopup.querySelector('.cancel-btn').onclick = () => {
    paymentPopup.classList.remove('show');
    setTimeout(() => paymentPopup.remove(), 500);
  };
}

// 📱 Validate Phone Number
function validatePhone(phone) {
  return /^\d{11}$/.test(phone);
}

// 🔍 Search Functionality
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

function getAllGamesFromDOM() {
  return Array.from(document.querySelectorAll('.shop-box')).map(box => ({
    element: box,
    title: box.querySelector('.game-title').textContent.toLowerCase()
  }));
}

function filterAndDisplayGames(searchTerm) {
  getAllGamesFromDOM().forEach(game => {
    game.element.style.display = game.title.includes(searchTerm) ? 'block' : 'none';
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

// 📱 Navbar Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');
  toggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });
});

// 🎮 Genre Filtering
function filterGames(genre) {
  const games = document.querySelectorAll('.game');
  if (['action', 'adventure', 'horror', 'rpg'].includes(genre)) {
    games.forEach(game => {
      game.style.display = game.classList.contains(genre) ? 'block' : 'none';
    });
  } else {
    games.forEach(game => game.style.display = 'block');
  }
}

document.querySelectorAll('.category').forEach(button => {
  button.addEventListener('click', () => {
    const genre = button.getAttribute('data-genre');
    filterGames(genre);
  });
});

const allGamesButton = document.querySelector('.category[data-genre="all"]');
if (allGamesButton) {
  allGamesButton.addEventListener('click', () => {
    document.querySelectorAll('.game').forEach(game => {
      game.style.display = 'block';
    });
  });
};
