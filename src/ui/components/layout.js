export const LayoutComponents = {
    
    // Renderiza o Menu Lateral
    renderSidebar: () => {
        // Função auxiliar interna para gerar botões
        const navButton = (id, label, pathData, active = false) => {
            return `
            <div onclick="switchView('${id}')" class="nav-item ${active ? 'active' : ''} flex items-center px-4 py-4 text-base font-semibold cursor-pointer text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white whitespace-nowrap group">
                <svg class="w-6 h-6 mr-3 shrink-0 ${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="${pathData}"></path>
                </svg>
                <span class="nav-label">${label}</span>
            </div>`;
        };

        return `
        <aside id="main-sidebar" class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-dark-900 border-r border-slate-100 dark:border-white/5 z-50 transform -translate-x-full md:translate-x-0 transition-transform duration-300 md:w-64 flex flex-col justify-between">
            <div>
                <div class="h-20 flex items-center px-8 border-b border-slate-50 dark:border-white/5">
                    <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-neon-purple flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">E</div>
                    <span id="logo-text" class="ml-3 font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">Elite<span class="text-blue-600 dark:text-neon-blue">AVA</span></span>
                </div>

                <nav class="p-4 space-y-1 mt-4">
                    ${navButton('dashboard', 'Dashboard', 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', true)}
                    ${navButton('schedule', 'Cronograma', 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z')}
                    ${navButton('library', 'Biblioteca', 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253')}
                    ${navButton('edital', 'Edital Vertical', 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z')}
                    ${navButton('stats', 'Estatísticas', 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z')}
                    ${navButton('achievements', 'Conquistas', 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714-2.143L13 3z')}
                </nav>
                
                <div class="p-4 border-t border-slate-50 dark:border-white/5">
                    <button onclick="handleLogout()" class="w-full flex items-center px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition">
                        <svg class="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        <span class="nav-label">Sair</span>
                    </button>
                </div>
            </div>
        </aside>`;
    },

    // Renderiza o Cabeçalho Superior
    renderHeader: () => {
        return `
        <header class="h-20 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <button onclick="toggleSidebar()" class="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <button onclick="toggleSidebarDesktop()" class="hidden md:block p-2 text-slate-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                </button>
                <div class="hidden md:flex flex-col">
                    <h2 class="text-lg font-bold text-slate-800 dark:text-white leading-tight">Painel de Estudos</h2>
                    <span class="text-xs text-slate-500 dark:text-slate-400" id="header-date">${new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                </div>
            </div>

            <div class="flex items-center gap-3 md:gap-6">
                <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span class="text-xs font-bold text-slate-600 dark:text-slate-300">Sistema Online</span>
                </div>
                
                <div class="w-px h-8 bg-slate-200 dark:bg-white/10 hidden md:block"></div>

                <div class="flex items-center gap-3 group cursor-pointer" onclick="openProfileModal()">
                    <div class="text-right hidden sm:block">
                        <p class="text-sm font-bold text-slate-800 dark:text-white" id="header-name">Carregando...</p>
                        <p class="text-xs text-slate-500 dark:text-slate-400">Estudante</p>
                    </div>
                    <div class="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold border-2 border-white dark:border-dark-900 shadow-sm group-hover:border-blue-500 transition-colors" id="profile-avatar-char">
                        E
                    </div>
                </div>
            </div>
        </header>`;
    }
};