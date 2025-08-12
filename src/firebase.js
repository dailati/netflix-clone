
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBanrvQc3gU5zHsyeZ18hnqg2jGTVgJNyw",
  authDomain: "netflix-clone-2390a.firebaseapp.com",
  projectId: "netflix-clone-2390a",
  storageBucket: "netflix-clone-2390a.firebasestorage.app",
  messagingSenderId: "13355291934",
  appId: "1:13355291934:web:ba78f3681d8a1da9b4a50f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};