// Import Firebase utilities
import { db, doc, updateDoc, onAuthStateChanged, getAuth, updatePassword, getDoc } from "./firebase.config.js";

const auth = getAuth();

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User signed in:', user.uid);
    } else {
        console.log('No user signed in');
    }
});

// Update User Name in Firestore
let currentUserID = null; // Store logged-in user ID globally

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUserID = user.uid;
        console.log('User signed in:', currentUserID);

        // Fetch and display current username
        const userRef = doc(db, "users", currentUserID);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            const username = userSnap.data().username;
            document.getElementById('welcomeUser').innerText = `Welcome ${username}`;
        } else {
            console.log('No such document!');
        }
    } else {
        console.log('No user signed in');
    }
});

// Update User Name in Firestore
const updateUserName = async () => {
    let userName = document.getElementById('userName').value;
    if (!userName) {
        alert('Please enter a new username!');
        return;
    }

    const userRef = doc(db, "users", currentUserID);

    try {
        await updateDoc(userRef, {
            username: userName
        });
        alert('User Name updated successfully!');
        
        // Update Welcome text instantly
        document.getElementById('welcomeUser').innerText = `Welcome ${userName}`;
    } catch (error) {
        console.error('Error updating username:', error);
        alert('Failed to update username.');
    }
}

// Event Listener for Update Button
document.getElementById('updateUserName')?.addEventListener('click', updateUserName);


// Update Password in Firebase Authentication
const updateUserPassword = async () => {
    let oldPass = document.getElementById('oldPassword').value;
    let newPass = document.getElementById('newPassword').value;

    if (!oldPass || !newPass) {
        alert('Please enter both old and new passwords!');
        return;
    }

    // Confirm if user is logged in
    const user = auth.currentUser;
    if (user) {
        try {
            await updatePassword(user, newPass);
            alert('Password updated successfully!');
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Failed to update password. Make sure you are logged in again.');
        }
    } else {
        alert('No user is logged in.');
    }
}

// Event Listeners
document.getElementById('updateUserName')?.addEventListener('click', updateUserName);
document.getElementById('updatePass')?.addEventListener('click', updateUserPassword);

