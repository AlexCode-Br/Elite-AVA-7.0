export const ViewComponents = {
    
    renderDashboard: () => {
        return `
        <div id="view-dashboard" class="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                 ${statCard('Nível', 'stat-level', '-', 'bg-blue-500', 'text-white')}
                 ${statCard('XP Total', 'stat-xp', '-', 'bg-white dark:bg-dark-800', 'text-slate-900 dark:text-white')}
                 ${statCard('Tarefas', 'stat-completed', '-', 'bg-white dark:bg-dark-800', 'text-slate-900 dark:text-white')}
                 ${statCard('Horas', 'stat-hours', '-', 'bg-white dark:bg-dark-800', 'text-slate-900 dark:text-white')}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div class="lg:col-span-2 space-y-6 md:space-y-8">
                    <div class="bg-white dark:bg-dark-800 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-white/5 shadow-sm">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="font-display font-bold text-lg md:text-xl text-slate-800 dark:text-white">Frequência</h3>
                            <div class="flex items-center gap-4">
                                <button onclick="changeCalendarDate(-1)" class="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition"><svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
                                <span class="font-bold text-slate-700 dark:text-white w-24 text-center text-sm" id="calendar-header-label">...</span>
                                <button onclick="changeCalendarDate(1)" class="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition"><svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>
                            </div>
                        </div>
                        <div class="grid grid-cols-7 gap-2 md:gap-3 text-center mb-2">
                            ${['D','S','T','Q','Q','S','S'].map(d => `<span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${d}</span>`).join('')}
                        </div>
                        <div class="grid grid-cols-7 gap-2 md:gap-3" id="calendar-grid">
                            </div>
                    </div>

                    <div id="task-section">
                        <div class="flex items-end justify-between mb-4 px-2">
                            <div>
                                <h3 class="font-display font-bold text-xl md:text-2xl text-slate-900 dark:text-white flex items-center gap-2">
                                    Missões de Hoje
                                    <span class="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-md" id="selected-date-label">Hoje</span>
                                </h3>
                            </div>
                            <div class="flex flex-col items-end">
                                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1" id="daily-progress-text">0/0 Completas</span>
                                <div class="w-24 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div class="h-full bg-green-500 transition-all duration-500" style="width: 0%" id="daily-progress-bar"></div>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-3" id="today-container">
                            </div>
                    </div>
                </div>

                <div class="space-y-6 md:space-y-8">
                     <div class="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white/5 dark:to-white/5 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden group">
                        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 15h-2v-6h2zm0-8h-2V7h2z"></path></svg></div>
                        <div class="relative z-10">
                            <h4 class="font-bold text-blue-200 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                                Inteligência Tática
                            </h4>
                            <div class="min-h-[120px]">
                                <div id="daily-briefing-loading" class="animate-pulse space-y-3 mt-4 hidden">
                                    <div class="h-2 bg-white/10 rounded w-3/4"></div><div class="h-2 bg-white/10 rounded w-1/2"></div>
                                </div>
                                <div id="daily-briefing-content" class="text-sm text-slate-300 leading-relaxed prose prose-invert prose-sm max-w-none mt-2">
                                    </div>
                            </div>
                            <div class="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                                <span class="text-[10px] text-slate-400 font-mono" id="intel-date">--/--</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-dark-800 rounded-3xl p-6 border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <h4 class="font-bold text-slate-700 dark:text-white text-sm mb-4">Progresso Geral</h4>
                        <div class="relative w-40 h-40">
                            <svg class="w-full h-full transform -rotate-90"><circle cx="80" cy="80" r="40" stroke="currentColor" stroke-width="8" fill="transparent" class="text-slate-100 dark:text-white/5" /><circle id="dash-circle-progress" cx="80" cy="80" r="40" stroke="currentColor" stroke-width="8" fill="transparent" stroke-dasharray="251.2" stroke-dashoffset="251.2" class="text-blue-500 transition-all duration-1000 ease-out" /></svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <span class="text-3xl font-bold text-slate-800 dark:text-white" id="dash-percent-text">0%</span>
                            </div>
                        </div>
                        <p class="text-xs text-slate-400 mt-4"><span id="dash-completed-count">0</span> missões cumpridas</p>
                    </div>
                </div>
            </div>
        </div>`;
    },

    renderOtherViews: () => {
        return `
        <div id="view-schedule" class="hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-6">Jornada Completa</h2>
            <div class="space-y-0" id="full-schedule-container"></div>
        </div>

        <div id="view-library" class="hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 class="text-2xl font-bold text-slate-800 dark:text-white">Biblioteca Tática</h2>
                <div class="flex gap-2">
                    <input type="text" id="search-input" placeholder="Buscar tópico..." onkeyup="searchContent()" class="bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none w-full md:w-64">
                    <select id="library-filter-select" onchange="setLibraryFilter(this.value)" class="bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none"></select>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="library-results"></div>
        </div>

        <div id="view-edital" class="hidden animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-140px)]">
            <div class="bg-white dark:bg-dark-800 rounded-3xl border border-slate-100 dark:border-white/5 h-full flex flex-col overflow-hidden">
                <div class="p-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-white/5">
                    <h3 class="font-bold text-slate-700 dark:text-white text-sm">Edital Verticalizado.pdf</h3>
                    <button onclick="toggleFullscreenPDF()" class="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">Expandir Tela Cheia</button>
                </div>
                <iframe src="edital.pdf" class="w-full h-full" id="pdf-frame-embed"></iframe>
            </div>
        </div>

        <div id="view-stats" class="hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-6">Relatório de Performance</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-slate-100 dark:border-white/5">
                    <h4 class="font-bold mb-4 text-slate-700 dark:text-white">Distribuição por Matéria</h4>
                    <div class="h-64"><canvas id="subjectChart"></canvas></div>
                </div>
                <div class="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-slate-100 dark:border-white/5">
                    <h4 class="font-bold mb-4 text-slate-700 dark:text-white">Histórico Recente</h4>
                    <div class="overflow-y-auto h-64">
                         <table class="w-full text-left border-collapse">
                            <thead><tr><th class="text-xs font-bold text-slate-400 uppercase pb-2">Tarefa</th><th class="text-xs font-bold text-slate-400 uppercase pb-2">Matéria</th><th class="text-xs font-bold text-slate-400 uppercase pb-2 text-right">Data</th></tr></thead>
                            <tbody id="history-table-body" class="text-sm"></tbody>
                        </table>
                        <div id="history-empty-state" class="hidden text-center text-slate-400 py-8 text-xs">Nenhuma atividade recente.</div>
                    </div>
                </div>
            </div>
        </div>

        <div id="view-achievements" class="hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div class="text-center mb-10">
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Galeria de Troféus</h2>
                <p class="text-slate-500 dark:text-slate-400">Suas medalhas de honra ao mérito.</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" id="achievements-grid"></div>
        </div>
        `;
    }
};

function statCard(label, id, value, bg, text) {
    return `<div class="${bg} rounded-2xl p-4 md:p-5 border border-slate-100 dark:border-white/5 shadow-sm flex flex-col justify-between h-full"><span class="text-xs font-bold opacity-70 uppercase tracking-wider mb-2 ${text}">${label}</span><span class="text-2xl md:text-3xl font-bold ${text}" id="${id}">${value}</span></div>`;
}