import { LearningInsights } from '../insights/learning.insights.js';

export const RecommendationsUI = {
    
    render: (scheduleData) => {
        const container = document.getElementById('daily-briefing-content');
        if (!container) return;

        // Gera os insights baseados nos dados
        const insights = LearningInsights.analyze(scheduleData);

        // Se não tiver insights (novo usuário), mostra boas-vindas
        if (insights.length === 0) {
            container.innerHTML = `
                <div class="flex items-start gap-3 p-2">
                    <div class="text-2xl">👋</div>
                    <div>
                        <h4 class="font-bold text-slate-700 dark:text-white text-sm">Bem-vindo ao Elite AVA</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Marque suas primeiras tarefas para receber análises de desempenho.</p>
                    </div>
                </div>`;
            container.classList.remove('hidden');
            return;
        }

        // Pega os top 2 insights
        const topInsights = insights.slice(0, 2);

        const html = topInsights.map(insight => {
            const colorClass = getColorClass(insight.type);
            return `
            <div class="mb-3 last:mb-0 p-3 rounded-xl border ${colorClass} bg-opacity-10 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div class="text-xl shrink-0">${insight.icon}</div>
                <div>
                    <h4 class="font-bold text-sm ${getTextColorClass(insight.type)}">${insight.title}</h4>
                    <p class="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">${insight.message}</p>
                </div>
            </div>
            `;
        }).join('');

        container.innerHTML = html;
        container.classList.remove('hidden');
        
        // Esconde o loader se estiver visível
        const loading = document.getElementById('daily-briefing-loading');
        if(loading) loading.classList.add('hidden');
    }
};

function getColorClass(type) {
    switch(type) {
        case 'urgent': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
        case 'warning': return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
        case 'success': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
        case 'celebration': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
        default: return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
}

function getTextColorClass(type) {
    switch(type) {
        case 'urgent': return 'text-red-700 dark:text-red-400';
        case 'warning': return 'text-orange-700 dark:text-orange-400';
        case 'success': return 'text-green-700 dark:text-green-400';
        case 'celebration': return 'text-yellow-700 dark:text-yellow-400';
        default: return 'text-blue-700 dark:text-blue-400';
    }
}