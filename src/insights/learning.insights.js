import { UserState } from '../state/user.state.js';

// Precisamos acessar a estrutura das matérias (pode ser passado como argumento ou importado se for estático)
// Para manter desacoplado, vamos assumir que o scheduleData é acessível globalmente ou passado
const SUBJECT_CATEGORIES = {
    'Direito': ['Dir. Adm', 'Adm. Púb', 'Leg. BA', 'Const.', 'CF/88', 'Dir. Penal', 'Gestão'],
    'Básicas': ['Português', 'Lógica', 'Info', 'Redação'],
    'Específicas': ['LDB', 'Pedagogia', 'ECA', 'Social', 'Igualdade', 'História']
};

export const LearningInsights = {
    
    analyze: (scheduleData) => {
        const state = UserState.get();
        const insights = [];

        // Dados base
        const checkedIds = state.checkedItems || [];
        const streak = state.completionDates ? calculateStreak(state.completionDates) : 0; // Recalculo rápido local ou usa do estado
        
        // 1. Análise de Consistência (Streak)
        if (streak === 0) {
            insights.push({
                type: 'urgent',
                icon: '🔥',
                title: 'Risco de Inércia',
                message: 'Você não estudou ontem. O segredo da aprovação é a constância, não a intensidade. Faça 1 tarefa hoje!'
            });
        } else if (streak >= 3 && streak < 7) {
            insights.push({
                type: 'success',
                icon: '🚀',
                title: 'Pegando Tração',
                message: `Você está há ${streak} dias seguidos estudando. Mantenha o ritmo para criar um hábito indestrutível.`
            });
        }

        // 2. Análise de Balanceamento de Matérias
        if (checkedIds.length > 5) {
            const subjectCounts = {};
            let totalDone = 0;

            // Mapeia o que foi feito
            scheduleData.forEach(day => {
                day.items.forEach(item => {
                    if (checkedIds.includes(item.id)) {
                        const cat = getCategory(item.subj);
                        subjectCounts[cat] = (subjectCounts[cat] || 0) + 1;
                        totalDone++;
                    }
                });
            });

            // Detecta negligência
            for (const [cat, count] of Object.entries(subjectCounts)) {
                const percent = (count / totalDone) * 100;
                if (percent < 15) { // Menos de 15% do estudo é nessa área
                    insights.push({
                        type: 'warning',
                        icon: '⚖️',
                        title: `Atenção em ${cat}`,
                        message: `Apenas ${Math.round(percent)}% do seu estudo é focado em ${cat}. Não deixe pontos fracos para a prova!`
                    });
                }
                if (percent > 60) { // Mais de 60% em uma única área
                    insights.push({
                        type: 'info',
                        icon: '🔍',
                        title: `Hiperfoco em ${cat}`,
                        message: `Você está muito focado em ${cat}. Cuidado para não esquecer as outras matérias.`
                    });
                }
            }
        }

        // 3. Análise de Horário/Dia (Se hoje tem tarefa e nada foi feito)
        const todayStr = new Date().toISOString().split('T')[0];
        const todayTasks = scheduleData.find(d => d.date === todayStr);
        if (todayTasks) {
            const doneToday = todayTasks.items.filter(i => checkedIds.includes(i.id)).length;
            const totalToday = todayTasks.items.length;
            
            if (totalToday > 0 && doneToday === 0) {
                insights.push({
                    type: 'action',
                    icon: '📅',
                    title: 'Meta do Dia',
                    message: `Você tem ${totalToday} missões para hoje. Que tal começar pela mais rápida?`
                });
            } else if (doneToday === totalToday) {
                insights.push({
                    type: 'celebration',
                    icon: '🌟',
                    title: 'Dia Perfeito!',
                    message: 'Você destruiu as metas de hoje. Descanse ou adiante matéria de amanhã.'
                });
            }
        }

        // Priorização: Urgente > Warning > Action > Info > Success
        const priority = { 'urgent': 0, 'warning': 1, 'action': 2, 'info': 3, 'success': 4, 'celebration': 5 };
        return insights.sort((a, b) => priority[a.type] - priority[b.type]);
    }
};

// Helpers
function getCategory(subject) {
    for (const [cat, subjects] of Object.entries(SUBJECT_CATEGORIES)) {
        if (subjects.includes(subject)) return cat;
    }
    return 'Geral';
}

function calculateStreak(datesObj) {
    // Lógica simplificada de streak baseada nas datas de conclusão
    const dates = Object.values(datesObj).map(d => d.split('T')[0]).sort();
    if (dates.length === 0) return 0;
    
    let streak = 0;
    let current = new Date();
    
    // Verifica últimos 30 dias (simplificado)
    for (let i = 0; i < 30; i++) {
        const checkStr = current.toISOString().split('T')[0];
        if (dates.includes(checkStr)) streak++;
        else if (i === 0) { /* permite falhar hoje se ainda não acabou o dia */ }
        else break;
        
        current.setDate(current.getDate() - 1);
    }
    return streak;
}