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

const google = ()=> {
  const provider = new GoogleAuthProvider();
  const result = signInWithPopup(auth, provider)
  .then((result) => {

    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

}
document.querySelector('.google')?.addEventListener('click', google)


