import { auth, onAuthStateChanged } from "./firebaseapp.js";

onAuthStateChanged(auth, (user) => {
    const userInfo = document.getElementById('userInfo');
    if (user) {
        userInfo.innerHTML = `
        <p>User ID: ${user.uid}</p>
        <p>Name: ${user.displayName ? user.displayName : 'No name provided'}</p>
        <p>Email: ${user.email}</p>
    `;
    } else {
        window.location.href = 'login.html'
    }
  });
