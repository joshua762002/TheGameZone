const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link"),
      loginForm = document.querySelector("#loginForm"),
      signupForm = document.querySelector("#signupForm");

// Show/hide password
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";
        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";
        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

// Toggle form between login and signup
signUp.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("active");
});

login.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("active");
});

// Register new user
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPass").value;

  // Check if fields are not empty
  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  // Save credentials to localStorage (for demo purposes)
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPass", password);

  alert("Account created! Please log in.");
  container.classList.remove("active"); // Switch to login
  signupForm.reset(); // Reset the signup form fields
});

// Login validation
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  // Retrieve stored credentials from localStorage
  const storedEmail = localStorage.getItem("userEmail");
  const storedPass = localStorage.getItem("userPass");

  // Check if the entered credentials match the stored ones
  if (email === storedEmail && password === storedPass) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "home1.html"; // Redirect to home page
  } else {
    alert("Invalid credentials. Try again.");
  }
});
