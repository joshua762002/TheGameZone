window.onload = function () {
  const container = document.getElementById('purchased-container');
  const purchased = JSON.parse(localStorage.getItem('purchased')) || [];

  // Display a message if no games are purchased
  if (purchased.length === 0) {
    container.innerHTML = "<p>You haven't purchased any games yet.</p>";
    return;
  }

  // Loop through purchased games and create elements dynamically
  purchased.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'purchased-item';

    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>${item.genre}</p>
      <p>${item.rating}</p>
      <p>${item.price}</p>
      <p>${item.age}</p>
      <p class="purchase-date">📅 Purchased on: ${item.date}</p>
    `;

    container.appendChild(div);
  });
};

function handleBuyNow(button) {
  const gameCard = button.closest('.shop-box');
  const title = gameCard.querySelector('.game-title').textContent;
  const image = gameCard.querySelector('.game-image').src;
  const genre = gameCard.querySelector('.game-genre').textContent;
  const rating = gameCard.querySelector('.rating').textContent;
  const price = gameCard.querySelector('.price').textContent;
  const age = gameCard.querySelector('.age-limit').textContent;

  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Create the purchased game object
  const purchasedGame = {
    id: Date.now(),
    title,
    image,
    genre,
    rating,
    price,
    age,
    date: formattedDate
  };

  // Retrieve existing purchases and add the new one
  const purchased = JSON.parse(localStorage.getItem('purchased')) || [];
  purchased.push(purchasedGame);
  localStorage.setItem('purchased', JSON.stringify(purchased));

  // Show the popup (optional, if you have this function defined)
  showPurchasePopup(purchasedGame);

  // Redirect after a delay (optional)
  setTimeout(() => {
    window.location.href = 'purchasedgames.html';
  }, 2500);
}
window.onload = function () {
    const container = document.getElementById('purchased-container');
    const purchased = JSON.parse(localStorage.getItem('purchased')) || [];
  
    if (purchased.length === 0) {
      container.innerHTML = "<p style='text-align:center; font-size:18px;'>You haven't purchased any games yet.</p>";
      return;
    }
  
    purchased.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'purchased-item';
  
      div.innerHTML = `
  <img src="${item.image}" alt="${item.title}">
  <div class="purchased-details">
    <h3>${item.title}</h3>
    <p><strong>Genre:</strong> ${item.genre}</p>
    <p class="rating"><strong>Rating:</strong> ${item.rating}</p>
    <p class="price"><strong>Price:</strong> ${item.price}</p>
    <p class="age-limit"><strong>Age:</strong> ${item.age}</p>
    <p class="purchase-date">📅 Purchased on: ${item.date}</p>
  </div>
`;


  
      container.appendChild(div);
    });
  };
  
