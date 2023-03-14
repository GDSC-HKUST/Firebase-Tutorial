import {firebase_app, auth} from "./config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth(firebase_app);

export async function signUp(email, password) {
    let result = null,
        error = null;
    try {
        auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            userCredential.user.sendEmailVerification();
            alert("email sent")
            auth.signOut()
        })
    } catch (e) {
        error = e;
    }
    return { result, error };
}

export async function signIn(email, password) {
    let result = null,
        error = null;
    try{    
        result = await signInWithEmailAndPassword(auth, email, password);
        alert("Login Success")
    } catch(e) {
        alert("LOGIN FAILED")
        error = e;
    }
    return {result, error}
}
