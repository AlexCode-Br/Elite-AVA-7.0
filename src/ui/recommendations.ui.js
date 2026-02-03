import { LearningInsights } from '../insights/learning.insights.js';

// Funções auxiliares (Helpers) que estavam faltando
function getColorClass(type) {
    const map = {
        'urgent': 'border-red-500 bg-red-50 text-red-700',
        'success': 'border-green-500 bg-green-50 text-green-700',
        'warning': 'border-yellow-500 bg-yellow-50 text-yellow-700',
        'celebration': 'border-purple-500 bg-purple-50 text-purple-700',
        'action': 'border-blue-500 bg-blue-50 text-blue-700'
    };
    return map[type] || 'border-slate-200';
}

function getTextColorClass(type) {
     const map = {
        'urgent': 'text-red-800',
        'success': 'text-green-800',
        'warning': 'text-yellow-800',
        'celebration': 'text-purple-800',
        'action': 'text-blue-800'
    };
    return map[type] || 'text-slate-800';
}

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
                    <p class="text-xs text-opacity-80 leading-snug mt-0.5">${insight.message}</p>
                </div>
            </div>`;
        }).join('');

        container.innerHTML = html;
        container.classList.remove('hidden');
    }
};