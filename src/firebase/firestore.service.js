import { doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db } from "./firebase.init.js";

export const FirestoreService = {
    // Salvar dados do perfil do usuário
    saveUserProfile: async (appId, userId, data) => {
        const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'profiles', userId);
        // Usa merge: true para não sobrescrever campos não enviados (padrão de segurança)
        return setDoc(userRef, data, { merge: true });
    },

    // Ouvir mudanças no perfil do usuário em tempo real
    listenToUserProfile: (appId, userId, onUpdate) => {
        const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'profiles', userId);
        
        return onSnapshot(userRef, (snap) => {
            const data = snap.exists() ? snap.data() : {};
            onUpdate(data);
        });
    }
};