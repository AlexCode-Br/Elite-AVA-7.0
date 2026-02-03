// ARQUIVO: src/ui/navigation.ui.js

export const NavigationUI = {
    switchView: (viewId) => {
        // Esconde todas as views
        ['dashboard', 'schedule', 'library', 'edital', 'stats', 'achievements'].forEach(v => {
            const el = document.getElementById('view-'+v);
            if (el) el.classList.add('hidden');
        });
        
        // Mostra a view alvo
        const target = document.getElementById('view-'+viewId);
        if (target) target.classList.remove('hidden');
        
        // Atualiza menu ativo
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        document.querySelectorAll(`.nav-item[onclick*="${viewId}"]`).forEach(el => el.classList.add('active'));

        // Fecha menu mobile se estiver aberto
        if(window.innerWidth < 768) {
            const sb = document.getElementById('main-sidebar');
            if(sb && sb.classList.contains('sidebar-open')) NavigationUI.toggleSidebar();
        }
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
                // Contrair
                sb.classList.remove('md:w-64'); sb.classList.add('md:w-20');
                main.classList.remove('md:ml-64'); main.classList.add('md:ml-20');
                document.querySelectorAll('.nav-label').forEach(el => el.classList.add('hidden'));
                document.getElementById('logo-text').classList.add('hidden');
            } else {
                // Expandir
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