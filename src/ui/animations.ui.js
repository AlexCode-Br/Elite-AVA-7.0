// ARQUIVO: src/ui/animations.ui.js

export const AnimationsUI = {
    showToast: (title, msg) => {
        const toast = document.getElementById('achievement-toast');
        if (!toast) return;
        
        const titleEl = document.getElementById('toast-title');
        if(titleEl) titleEl.innerText = `${title}: ${msg}`;
        else toast.innerText = msg; // Fallback simples
        
        toast.classList.remove('translate-x-full');
        setTimeout(() => toast.classList.add('translate-x-full'), 4000);
    },

    togglePasswordVisibility: () => {
        const input = document.getElementById('auth-password');
        const eyeIcon = document.getElementById('eye-icon');
        const eyeOffIcon = document.getElementById('eye-off-icon');
        
        if (input.type === 'password') {
            input.type = 'text';
            eyeIcon.classList.add('hidden');
            eyeOffIcon.classList.remove('hidden');
        } else {
            input.type = 'password';
            eyeIcon.classList.remove('hidden');
            eyeOffIcon.classList.add('hidden');
        }
    },
    
    // Animação da barra de força de senha
    animatePasswordStrength: (score) => {
        const segs = [1,2,3,4].map(i => document.getElementById(`strength-${i}`));
        segs.forEach(el => el.className = 'flex-1 rounded-full bg-slate-700 transition-colors duration-300');
        
        let colorClass = 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
        if (score > 2) colorClass = 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]';
        if (score > 3) colorClass = 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]';

        for(let i=0; i<score; i++) segs[i].className = `flex-1 rounded-full ${colorClass} transition-colors duration-300`;
        
        const text = document.getElementById('strength-text');
        text.innerText = `Força: ${score > 3 ? 'Forte' : (score > 2 ? 'Média' : 'Fraca')}`;
        text.className = `text-[10px] text-right mt-1 font-bold ${score > 3 ? 'text-green-500' : (score > 2 ? 'text-yellow-500' : 'text-red-500')}`;
    }
};