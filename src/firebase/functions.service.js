// ARQUIVO: src/firebase/functions.service.js
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-functions.js";
import { app } from "./firebase.init.js";

// Inicializa o serviço de funções
const functions = getFunctions(app);

export const FunctionsService = {
    updateUserProgress: async (toggleItemId, isPerfectDay) => {
        // Conecta com a função que criamos no backend
        const updateFn = httpsCallable(functions, 'updateUserProgress');
        
        try {
            // Envia o pedido
            const result = await updateFn({ 
                toggleItemId: toggleItemId,
                isPerfectDay: isPerfectDay 
            });
            // Retorna a resposta segura do servidor
            return result.data;
        } catch (error) {
            console.error("Erro na Cloud Function:", error);
            throw error;
        }
    }
};