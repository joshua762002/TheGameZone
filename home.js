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