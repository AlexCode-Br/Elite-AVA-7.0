// ARQUIVO: /src/state/user.state.js

// Estado Inicial Padrão (dados vazios)
const initialState = {
    uid: null,
    displayName: null,
    email: null,
    isAuthenticated: false,
    
    // Dados de Progresso
    checkedItems: [],
    achievements: [],
    extraXP: 0,
    perfectDaysCount: 0,
    completionDates: {},
    
    // Controle
    lastSync: null
};

// Variável que guarda o estado atual
let state = { ...initialState };

// Lista de quem está escutando as mudanças
const listeners = [];

export const UserState = {
    // Pega uma cópia segura dos dados atuais
    get: () => ({ ...state }), 
    
    isAuthenticated: () => state.isAuthenticated,
    getUserId: () => state.uid,

    // --- AÇÕES (Modificam os dados) ---

    // 1. Quando o usuário faz login ou logout
    setAuthUser: (user) => {
        if (!user) {
            state = { ...initialState }; // Reseta tudo se sair
        } else {
            state = {
                ...state,
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                isAuthenticated: true
            };
        }
        notifyListeners();
    },

    // 2. Quando dados chegam do banco de dados (Firestore)
    syncFromFirestore: (data) => {
        state = {
            ...state,
            checkedItems: data.checkedItems || [],
            achievements: data.achievements || [],
            extraXP: data.extraXP || 0,
            perfectDaysCount: data.perfectDaysCount || 0,
            completionDates: data.completionDates || {},
            lastSync: new Date()
        };
        notifyListeners();
    },

    // 3. Atualizações locais (ex: completar tarefa)
    updateProgress: (payload) => {
        state = { ...state, ...payload };
        notifyListeners();
    },

    // --- SISTEMA DE NOTIFICAÇÃO ---
    subscribe: (listener) => {
        listeners.push(listener);
        return () => {
            const index = listeners.indexOf(listener);
            if (index > -1) listeners.splice(index, 1);
        };
    }
};

// Avisa todo mundo que algo mudou
function notifyListeners() {
    listeners.forEach(listener => listener(state));
}