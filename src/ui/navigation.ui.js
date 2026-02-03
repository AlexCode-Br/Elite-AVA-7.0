// ARQUIVO: src/ui/navigation.ui.js

export const NavigationUI = {
    // Agora o switchView apenas atualiza a URL (Hash)
    // O App vai detectar a mudança e trocar a tela automaticamente
    switchView: (viewId) => {
        window.location.hash = viewId;
    },

    // Esta é a função que REALMENTE troca a tela visualmente
    renderViewChange: (viewId) => {
        // Fallback: se não tiver ID, vai pro dashboard
        const targetId = viewId || 'dashboard';

        // Esconde todas as views
        ['dashboard', 'schedule', 'library', 'edital', 'stats', 'achievements'].forEach(v => {
            const el = document.getElementById('view-'+v);
            if (el) el.classList.add('hidden');
        });
        
        // Mostra a view alvo
        const target = document.getElementById('view-'+targetId);
        if (target) {
            target.classList.remove('hidden');
            // Animação suave de entrada
            target.classList.remove('animate-in'); // Reset para re-animar
            void target.offsetWidth; // Trigger reflow
            target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom-4', 'duration-500');
        }
        
        // Atualiza menu ativo (visual)
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        // Seleciona o botão correspondente e ativa
        const activeBtn = document.querySelector(`.nav-item[onclick*="${targetId}"]`);
        if(activeBtn) {
            activeBtn.classList.add('active');
             // Adiciona a bolinha azul se não tiver (recriando o HTML do active state)
             if(!activeBtn.querySelector('.bg-blue-600')) {
                 const dot = document.createElement('div');
                 dot.className = "ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-neon-blue shadow-[0_0_8px_rgba(37,99,235,0.6)]";
                 activeBtn.appendChild(dot);
             }
        }
        
        // Remove a bolinha dos inativos
        document.querySelectorAll('.nav-item:not(.active) .bg-blue-600').forEach(el => el.remove());

        // Fecha menu mobile se estiver aberto
        if(window.innerWidth < 768) {
            const sb = document.getElementById('main-sidebar');
            if(sb && sb.classList.contains('sidebar-open')) NavigationUI.toggleSidebar();
        }

        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    toggleSidebar: () => {
        const sb = document.getElementById('main-sidebar');
        const ov = document.getElementById('mobile-overlay');
        if (sb) sb.classList.toggle('sidebar-open');
        if (ov) ov.classList.toggle('hidden');
    },

    toggleSidebarDesktop: () => {
        const sb = document.getElementById('main-sidebar');
        const main = document.querySelector('main');
        if(sb) {
            if(sb.classList.contains('md:w-64')) {
                sb.classList.remove('md:w-64'); sb.classList.add('md:w-20');
                main.classList.remove('md:ml-64'); main.classList.add('md:ml-20');
                document.querySelectorAll('.nav-label').forEach(el => el.classList.add('hidden'));
                document.getElementById('logo-text').classList.add('hidden');
            } else {
                sb.classList.add('md:w-64'); sb.classList.remove('md:w-20');
                main.classList.add('md:ml-64'); main.classList.remove('md:ml-20');
                document.querySelectorAll('.nav-label').forEach(el => el.classList.remove('hidden'));
                document.getElementById('logo-text').classList.remove('hidden');
            }
        }
    },

    scrollTo: (elementId) => {
        document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
    }
};