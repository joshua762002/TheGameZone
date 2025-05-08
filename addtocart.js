document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cart-container');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const continueBtn = document.getElementById('continue-btn');
  
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
      window.location.href = 'products.html'; // Replace with your actual product page
    });
  });
  