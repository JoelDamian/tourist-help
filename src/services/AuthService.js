import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence  } from "firebase/auth";
import { auth } from "../config/firebase.config";

export const loginUser = (user) => {
    return setPersistence(auth, browserSessionPersistence)
    .then(() => {
        return signInWithEmailAndPassword(auth, user.username, user.password)
    })
    .catch((error) => {
      return error
    });
};

export const logoutUser = () => {
    return auth.signOut();
}