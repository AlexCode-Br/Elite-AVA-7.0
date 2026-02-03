// ARQUIVO: src/ui/theme.ui.js

export const ThemeUI = {
    init: () => {
        // Carrega tema salvo ou usa sistema
        const savedTheme = localStorage.getItem('theme') || 'system';
        ThemeUI.set(savedTheme);
        
        // Listener para mudança do sistema operacional
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (localStorage.getItem('theme') === 'system') {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    },

    set: (mode) => {
        localStorage.setItem('theme', mode);
        updateDisplay(mode);
        
        if (mode === 'system') {
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(systemDark ? 'dark' : 'light');
        } else {
            applyTheme(mode);
        }
    },

    toggle: () => {
        const current = localStorage.getItem('theme') || 'system';
        const next = current === 'light' ? 'dark' : (current === 'dark' ? 'system' : 'light');
        ThemeUI.set(next);
    }
};

// Funções Internas (Privadas)
function applyTheme(mode) {
    if (mode === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function updateDisplay(mode) {
    ['light', 'dark', 'system'].forEach(m => {
        const btn = document.getElementById(`theme-btn-${m}`);
        if(btn) btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`theme-btn-${mode}`);
    if(activeBtn) activeBtn.classList.add('active');
}