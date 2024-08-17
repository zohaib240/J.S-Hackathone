import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from "./config.js";


const email =document.querySelector('#Email')
const password =document.querySelector('#Password')
const form =document.querySelector('#form')


form.addEventListener('submit',(event)=>{
    event.preventDefault()
    console.log( email.value);
    console.log( password.value);
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      window.location='dash.html'
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)

    });
  email.value=''
  password.value=''
})