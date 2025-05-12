
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

    checkoutBtn.addEventListener('click', () => {
      alert("✅ Thank you for your purchase!");
      localStorage.removeItem('cart');
      location.reload();
    });

    continueBtn.addEventListener('click', () => {
      window.location.href = 'purchased.html'; // Update to your products page
    });
  }
});

 // Toggle navbar for mobile
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');

  toggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });
});