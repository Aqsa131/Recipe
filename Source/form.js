import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "./firebase.config.js"


// Sign up new users with signup page
const auth = getAuth();
const register = (e) => {
  e.preventDefault();

  let email = document.getElementById('email').value;
  let password = document.getElementById('Password').value;
  let confirmPassword = document.getElementById('exampleInputPassword').value;
  let setValid = document.querySelector('.sameValidation')
  if (password === confirmPassword) {
    setValid.innerHTML = `<p style="color: green;">Password Matched</p>`;
  } else {
    setValid.innerHTML = `<p style="color: red;">Password not Matched</p>`
    return
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User Created:', user);
      if (userCredential?.user) {
        window.location.pathname = '/Source/mainPage.html';
      }
    })
    .catch((error) => {
      console.error("Signup Error:", error.code, error.message);
      alert(error.message);
    });
};
document.getElementById('submit')?.addEventListener('click', register);

// Sign in existing users 

const signIn = (e) => {
  e.preventDefault()
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('user', user);
      if (userCredential?.user) {
        if (user) {
          alert('Login Successfull')
          window.location.pathname = '/Source/mainPage.html';
        }
      }

    })
    .catch((error) => {
      alert('Invalid Credentials')
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  console.log(email, password)
}
document.getElementById('signIn')?.addEventListener('click', signIn)

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    let name = document.getElementById('name')
    let email = document.getElementById('email')

    if (user) {
      name.innerHTML = user.email.slice(0, user.email.indexOf('@'))
      email.innerHTML = user.email

      console.log('user------------>', user);

    }
  } else {
    console.log('no user is login');

  }
});

// logOut/signout
const logOut = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    window.location.pathname = 'Source/logIn.html'
  }).catch((error) => {
    // An error happened.
  });
}
document.getElementById('logOut')?.addEventListener('click', logOut)

// Authentication with google
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const google = ()=> {

  const result = signInWithPopup(auth, provider)
  .then((result) => {
    window.location.href = "/Source/mainPage.html"
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    // ...
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

}
// const provider = new GoogleAuthProvider();
// 

// const google = async () => {
//     try {
//         // await signOut(auth);  // 🛑 Pehle Logout
//         // console.log("User signed out before sign-in attempt.");
//         const result = await signInWithPopup(auth, provider); 
//         console.log("User signed in:", result.user);
//     } catch (error) {
//         console.error("Google Sign-In Error:", error.message);
//     }
//   }

document.querySelector('.google')?.addEventListener('click', google)


