// Function to generate a random card number
function generateRandomNumber() {
    let number = '';
    for (let i = 0; i < 4; i++) {
        const randomSegment = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        number += randomSegment;
        if (i < 3) number += '-';  // Add dash between the segments
    }
    return number;
}

window.onload = function () {
    const container = document.getElementById('purchased-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const purchased = JSON.parse(localStorage.getItem('purchased')) || [];

    // Display a message if no games are purchased
    if (purchased.length === 0) {
        container.innerHTML = "<p style='text-align:center; font-size:18px;'>You haven't purchased any games yet.</p>";
        return;
    }

    // Function to display games dynamically
    function displayGames(games) {
        container.innerHTML = ''; // Clear the container before displaying games

        if (games.length === 0) {
            container.innerHTML = "<p style='text-align:center; font-size:18px;'>No games found matching your search.</p>";
        } else {
            games.forEach((item) => {
                const div = document.createElement('div');
                div.className = 'purchased-item';

                // Generate a random number for the card
                const randomNumber = generateRandomNumber();

                div.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="purchased-details">
                        <h3>${item.title}</h3>
                        <p><strong>Genre:</strong> ${item.genre}</p>
                        <p class="rating"><strong>Rating:</strong> ${item.rating}</p>
                        <p class="price"><strong>Price:</strong> ${item.price}</p>
                        <p class="age-limit"><strong>Age:</strong> ${item.age}</p>
                        <p class="purchase-date">📅 Purchased on: ${item.date}</p>
                        <p class="card-number"><strong>Card Number:</strong> ${randomNumber}</p> <!-- Random number here -->
                    </div>
                `;

                container.appendChild(div);
            });
        }
    }

    // Display all purchased games initially
    displayGames(purchased);

    // Search functionality when the search button is clicked
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredGames = purchased.filter(game => game.title.toLowerCase().includes(searchTerm));
        displayGames(filteredGames);
    });

    // Also trigger the search functionality when the "Enter" key is pressed
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredGames = purchased.filter(game => game.title.toLowerCase().includes(searchTerm));
            displayGames(filteredGames);
        }
    });
};

// Function to handle the purchase process
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