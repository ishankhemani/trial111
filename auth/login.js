import { auth, googleProvider } from "./firebase.js";
import { signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const googleSignInBtn = document.getElementById("googleSignInBtn");
const googleSignOutBtn = document.getElementById("googleSignOutBtn");
const userDiv = document.getElementById("userDiv");
const userEmail = document.getElementById("userEmail");

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In successful:", result.user);
    displayUser(result.user);
    window.location.href = "../index.html"; 
  } catch (error) {
    console.error("Error during Google Sign-In:", error.message);
    alert(error.message);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
    updateUI(null);
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};

const updateUI = (user) => {
  if (user) {
    userDiv.style.display = "block";
    userEmail.textContent = user.displayName;
    googleSignInBtn.style.display = "none";
  } else {
    userDiv.style.display = "none";
    googleSignInBtn.style.display = "block";
  }
};

const displayUser = (user) => {
  if (user) {
    updateUI(user);
  }
};

if (googleSignInBtn) googleSignInBtn.addEventListener("click", signInWithGoogle);
if (googleSignOutBtn) googleSignOutBtn.addEventListener("click", signOutUser);

onAuthStateChanged(auth, (user) => {
  updateUI(user);
});
