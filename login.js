const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link"),
      loginForm = document.querySelector("#loginForm");

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

    // Toggle form
    signUp.addEventListener("click", (e) => {
      e.preventDefault();
      container.classList.add("active");
    });

    login.addEventListener("click", (e) => {
      e.preventDefault();
      container.classList.remove("active");
    });

    // Fake login validation
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUser").value;
      const password = document.getElementById("loginPass").value;

      // For now just check if fields are filled
      if (username && password) {
        // Save to localStorage (optional)
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to home.html
        window.location.href = "home.html";
      } else {
        alert("Please enter username and password.");
      }
    });
