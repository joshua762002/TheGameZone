// Check if the user is logged in
function checkLoginStatus() {
    // Check if the 'isLoggedIn' value exists in localStorage
    if (!localStorage.getItem("isLoggedIn")) {
        // If not logged in, redirect to the login page
        window.location.href = "login.html";
    } else {
        // If logged in, redirect to the shopping page
        window.location.href = "shopnow.html";
    }
}

// Attach event listener to the "SHOP NOW" button
document.querySelector(".shop-button").addEventListener("click", (e) => {
    e.preventDefault();  // Prevent default anchor behavior
    checkLoginStatus();
});

  function addToWishlist() {
    const item = {
      title: document.getElementById('game-title').innerText,
      image: document.getElementById('game-img').src
    };

    // Store item in localStorage
    localStorage.setItem('wishlistItem', JSON.stringify(item));

    // Redirect to wishlist page
    window.location.href = "home1.html";
  }

