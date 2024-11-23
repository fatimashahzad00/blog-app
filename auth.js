import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./firebaseapp.js";

const signForm = document.querySelector("#signupForm");
const loginForm = document.querySelector("#loginForm");
const errorModal = document.getElementById("errorModal");
const errorMessage = document.getElementById("errorMessage");
const closeModal = document.getElementById("closeModal");
const successModal = document.getElementById("successModal");
const successMessage = document.getElementById("successMessage");

if (signForm) {
  signForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const lastName = document.getElementById("signupLastname").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    // console.log(name, lastName, email, password);

    if (!name || !lastName) {
      showError("Name and Lastname are required!");
      return;
    }

    if (!isValidEmail(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      showError(
        "Password must be at least 8 characters long and include at least one number and one letter."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .then(() => {
        showSuccess("User account created successfully!");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      })
      .catch((error) => {
        const errorMessage = error.message;
        showError("Signup failed: " + errorMessage);

        // ..
      });
  });

  closeModal.onclick = function () {
    errorModal.style.display = "none";
    successModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == errorModal) {
      errorModal.style.display = "none";
    }
    if (event.target == successModal) {
      successModal.style.display = "none";
    }
  };
}

function showError(message) {
  errorMessage.textContent = message;
  errorModal.style.display = "flex";
}

function showSuccess(message) {
  successMessage.textContent = message;
  successModal.style.display = "flex";
}

function isValidEmail(email) {
  // Simple regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate password
function isValidPassword(password) {
  // Password must be at least 8 characters long and include at least one number and one letter
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

// Sign in with email and password
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        showSuccess("User Login Successfully!");
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
      })
      .catch((error) => {
        const errorMessage = error.message;
       showError('Login Failed: ' + errorMessage)
      });
  });
}
