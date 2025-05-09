// Check if the user is logged in
function checkLoginStatus() {
    if (localStorage.getItem("isLoggedIn")) {
        const userName = localStorage.getItem("username"); // Assuming you saved the username during registration
        // Display the welcome message with the user's name
        showWelcomeMessage(userName);
    } else {
        // Redirect to login page if not logged in
        window.location.href = "home1.html";
    }
}

// Show the welcome message pop-up
function showWelcomeMessage(userName) {
    const popup = document.getElementById("welcomePopup");
    const welcomeMessage = document.getElementById("welcomeMessage");
    
    // Set the message
    welcomeMessage.textContent = `Welcome back, ${userName}!`;

    // Show the pop-up
    popup.style.display = "flex";

    // Close the pop-up when clicking the close button
    document.getElementById("closePopup").addEventListener("click", () => {
        popup.style.display = "none";
    });
}

// Call the checkLoginStatus function when the page loads
window.onload = checkLoginStatus;

if (email === storedEmail && password === storedPass) {
    localStorage.setItem("isLoggedIn", "true");
    alert(`Welcome, ${email}!`);
    window.location.href = "home1.html";
  }
  function logout() {
    // Clear localStorage/sessionStorage or any login-related data
    localStorage.removeItem('user'); // Or whatever key you're using
    sessionStorage.clear(); // Optional: clear session storage
  
    // Redirect to homepage or login page
    window.location.href = 'home.html';
  }
  