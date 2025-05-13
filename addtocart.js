document.addEventListener('DOMContentLoaded', () => {
  // ================= ADD TO CART FROM WISHLIST ===================
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.wishlist-item');

      if (!item) return;

      const title = item.querySelector('.title')?.textContent || '';
      const genre = item.querySelector('.genre')?.textContent || '';
      const rating = item.querySelector('.rating')?.textContent || '';
      const age = item.querySelector('.age')?.textContent || '';
      const priceText = item.querySelector('.price')?.textContent.trim() || '₱0.00';
      const image = item.querySelector('img')?.src || '';

      // Convert "₱999.00" to 999.00
      const price = parseFloat(priceText.replace(/[₱,]/g, '')) || 0;

      const cartItem = { title, genre, rating, age, price, image };

      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));

      alert(`${title} added to cart from wishlist!`);
    });
  });

  // ==================== DISPLAY CART PAGE ========================
  const container = document.getElementById('cart-container');
  const totalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const continueBtn = document.getElementById('continue-btn');

  if (container && totalEl && checkoutBtn && continueBtn) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.length) {
      container.innerHTML = `<p class="empty-message">🛒 Your cart is empty.</p>`;
      totalEl.textContent = '';
      checkoutBtn.style.display = 'none';
      continueBtn.style.display = 'none';
      return;
    }

    let total = 0;

    cart.forEach(item => {
      const price = parseFloat(item.price) || 0;
      total += price;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';

      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="item-image">
        <div class="item-details">
          <h3>${item.title}</h3>
          <p><strong>Genre:</strong> ${item.genre}</p>
          <p><strong>Rating:</strong> ⭐ ${item.rating}</p>
          <p><strong>Age:</strong> ${item.age}</p>
          <p class="price">₱${price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
        </div>
      `;

      container.appendChild(itemEl);
    });

    totalEl.textContent = `Total: ₱${total.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;

    // ✅ Updated Checkout Functionality
    checkoutBtn.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (!cart.length) return alert("Cart is empty.");

      cart.forEach(game => showPaymentMethodPopup(game));
    });

    continueBtn.addEventListener('click', () => {
      window.location.href = 'purchased.html'; // Update this if needed
    });
  }

  // Show Payment Method Popup
  function showPaymentMethodPopup(game) {
    const paymentPopup = document.getElementById('payment-popup');
    const phoneInput = document.getElementById('phone-number');
    const confirmBtn = document.getElementById('confirm-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    
    paymentPopup.classList.add('show');  // Show the popup
    phoneInput.focus();

    cancelBtn.addEventListener('click', () => {
      paymentPopup.classList.remove('show');
      phoneInput.value = '';
    });

    confirmBtn.addEventListener('click', () => {
      const phone = phoneInput.value.trim();
      if (!validatePhone(phone)) {
        alert("📱 Please enter a valid phone number.");
        return;
      }

      handlePayment(phone, game);
    });

    // Handle Gcash and Sim Card Payment
    document.querySelector('.gcash-btn')?.addEventListener('click', () => {
      const phone = phoneInput.value.trim();
      if (!validatePhone(phone)) {
        alert("📱 Please enter a valid phone number.");
        return;
      }
      handlePayment(phone, game, 'GCash');
    });

    document.querySelector('.simcard-btn')?.addEventListener('click', () => {
      const phone = phoneInput.value.trim();
      if (!validatePhone(phone)) {
        alert("📱 Please enter a valid phone number.");
        return;
      }
      handlePayment(phone, game, 'Sim Card');
    });
  }

  function handlePayment(phone, game, method) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingPurchases = JSON.parse(localStorage.getItem('purchased')) || [];
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-PH', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    const purchasedItems = cart.map(item => ({
      ...item,
      date: formattedDate,
      phone: phone,
      method: method || 'Cash'
    }));

    localStorage.setItem('purchased', JSON.stringify([...existingPurchases, ...purchasedItems]));
    localStorage.removeItem('cart');

    alert(`✅ Payment successful via ${method || 'Cash'}!`);
    setTimeout(() => {
      window.location.href = 'purchasedgames.html';
    }, 1500);
  }

  // Validate Phone Number
  function validatePhone(phone) {
    const phonePattern = /^[0-9]{11}$/;  // Basic validation for 11-digit number
    return phonePattern.test(phone);
  }
});

// ================= TOGGLE NAVBAR FOR MOBILE ====================
document.addEventListener("DOMContentLoaded", function () {
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
