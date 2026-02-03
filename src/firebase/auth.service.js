import { 
    signInAnonymously, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile, 
    sendPasswordResetEmail, 
    signOut,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { auth } from "./firebase.init.js";

export const AuthService = {
    // Monitorar estado (Observer)
    onAuthStateChanged: (callback) => {
        return onAuthStateChanged(auth, callback);
    },

    // Login anônimo
    loginGuest: () => {
        return signInAnonymously(auth);
    },

    // Registro com Email/Senha
    register: async (email, password, name) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        return userCredential.user;
    },

    // Login com Email/Senha
    login: async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    },

    // Logout
    logout: () => {
        return signOut(auth);
    },

    // Atualizar Perfil (Nome)
    updateUserProfile: async (user, newName) => {
        await updateProfile(user, { displayName: newName });
        return user;
    },

    // Resetar Senha
    resetPassword: (email) => {
        return sendPasswordResetEmail(auth, email);
    },

    // Getter para usuário atual
    getCurrentUser: () => {
        return auth.currentUser;
    }
};