// ARQUIVO: src/ui/modals.ui.js
import { UserState } from '../state/user.state.js';

export const ModalsUI = {
    // --- AUTH MODAL ---
    toggleAuthMode: (isRegistering) => {
        const nameContainer = document.getElementById('field-name-container');
        const authBtn = document.getElementById('auth-btn');
        const toggleText = document.getElementById('auth-toggle-text');
        const forgotLink = document.getElementById('forgot-link');
        
        ModalsUI.clearAuthErrors();
        
        if (isRegistering) {
            nameContainer.classList.add('active');
            authBtn.innerHTML = `<span>Criar Minha Conta</span>`;
            toggleText.innerHTML = `Já tem conta? <button onclick="toggleAuthMode()" class="text-neon-purple font-bold ml-1 p-2">Login</button>`;
            forgotLink.classList.add('invisible');
        } else {
            nameContainer.classList.remove('active');
            authBtn.innerHTML = `<span>Entrar na Plataforma</span>`;
            toggleText.innerHTML = `Sem conta? <button onclick="toggleAuthMode()" class="text-neon-purple font-bold ml-1 p-2">Cadastre-se</button>`;
            forgotLink.classList.remove('invisible');
        }
    },

    clearAuthErrors: () => {
        document.querySelectorAll('input').forEach(i => i.classList.remove('input-error', 'border-red-500'));
        document.querySelectorAll('p[id^="error-"]').forEach(p => p.classList.add('hidden'));
        document.getElementById('auth-global-error')?.classList.add('hidden');
    },

    showAuthError: (fieldId, msg) => {
        const input = document.getElementById(fieldId);
        const errEl = document.getElementById('error-' + fieldId.split('-')[1]);
        if(input) input.classList.add('input-error');
        if(errEl) {
            errEl.querySelector('span').innerText = msg;
            errEl.classList.remove('hidden');
        }
    },

    // --- CONTENT MODAL (Matéria) ---
    openContent: (itemData) => {
        document.getElementById('modal-tag').innerText = itemData.subj;
        document.getElementById('modal-title').innerText = itemData.desc;
        document.getElementById('modal-body').innerText = `Tópico: ${itemData.desc}.`;
        document.getElementById('quiz-box').classList.add('hidden');
        
        const btn = document.getElementById('btn-quiz');
        if (btn) { btn.innerHTML = 'Gerar Resumo IA'; btn.disabled = false; }
        
        document.getElementById('content-modal').classList.remove('hidden');
    },

    closeContent: () => {
        document.getElementById('content-modal').classList.add('hidden');
    },

    // --- PROFILE MODAL ---
    openProfile: (ranksList) => {
        const modal = document.getElementById('profile-modal');
        if(!modal) return;
        
        const state = UserState.get();
        if(state.isAuthenticated) {
            document.getElementById('profile-name-display').innerText = state.displayName || 'Estudante';
            document.getElementById('profile-email-display').innerText = state.email || 'Convidado';
            document.getElementById('edit-profile-name').value = state.displayName || '';
            document.getElementById('edit-profile-email').value = state.email || '';
        }

        // Renderiza timeline de níveis
        const level = parseInt(document.getElementById('level-circle')?.innerText) || 1;
        const container = document.getElementById('profile-next-levels');
        if(container && ranksList) {
            let html = '';
            for(let i = level + 1; i <= Math.min(level + 10, 60); i++) {
                const rIndex = Math.min(i - 1, ranksList.length - 1);
                html += `<div class="relative pl-6 pb-6 border-l border-slate-200 dark:border-white/10 last:pb-0 last:border-0">
                    <div class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/20"></div>
                    <div class="flex justify-between items-start">
                        <div><span class="text-xs font-bold text-blue-500 dark:text-blue-400">Nível ${i}</span><h5 class="text-sm font-bold text-slate-800 dark:text-white">${ranksList[rIndex]}</h5></div>
                    </div>
                </div>`;
            }
            container.innerHTML = html;
        }
        
        ModalsUI.switchProfileTab('personal');
        modal.classList.remove('hidden');
    },

    closeProfile: () => document.getElementById('profile-modal').classList.add('hidden'),

    switchProfileTab: (tab) => {
        ['personal', 'security', 'journey'].forEach(t => {
            const btn = document.getElementById(`tab-btn-${t}`);
            const content = document.getElementById(`tab-content-${t}`);
            if(btn) btn.classList.remove('active');
            if(content) content.classList.add('hidden');
        });
        document.getElementById(`tab-btn-${tab}`)?.classList.add('active');
        document.getElementById(`tab-content-${tab}`)?.classList.remove('hidden');
    },

    // --- OUTROS ---
    closeLevelUp: () => document.getElementById('level-up-modal').classList.add('hidden'),

    toggleFullscreenPDF: () => {
        const modal = document.getElementById('pdf-modal');
        const iframe = document.getElementById('pdf-frame-fullscreen');
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            if (!iframe.src || iframe.src === 'about:blank') iframe.src = 'edital.pdf';
        } else {
            modal.classList.add('hidden');
        }
    }
};