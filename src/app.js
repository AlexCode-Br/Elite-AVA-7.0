// ARQUIVO: /src/app.js

import { AuthService } from './firebase/auth.service.js';
import { FirestoreService } from './firebase/firestore.service.js';
import { UserState } from './state/user.state.js';
import { FunctionsService } from './firebase/functions.service.js';
import { RecommendationsUI } from './ui/recommendations.ui.js';

// --- NOVOS IMPORTS DE UI ---
import { NavigationUI } from './ui/navigation.ui.js';
import { ModalsUI } from './ui/modals.ui.js';
import { AnimationsUI } from './ui/animations.ui.js';
import { ThemeUI } from './ui/theme.ui.js';

// --- CONSTANTES ---
const XP_PER_TASK = 150;
const XP_PER_LEVEL = 350;
const XP_LOGIN_BONUS = 50;
const XP_PERFECT_DAY = 200; 
const apiKey = "AIzaSyAYo8mXtLUgyzUH_RuwbaiYC0hwiK191us";

// Configuração do ID do App
const rawAppId = typeof window.__app_id !== 'undefined' ? window.__app_id : 'default-app-id';
const appId = rawAppId.replace(/[^a-zA-Z0-9_-]/g, '_');

const ranksList = [
    "Iniciante", "Estudante", "Dedicado", "Focado", "Avançado", "Analista", 
    "Pesquisador", "Especialista", "Mestre", "Doutor", "Sábio", 
    "Erudito", "Visionário", "Luminar", "Mentor", "Grão-Mestre", 
    "Catedrático", "Excelência", "Lenda Viva", "Supremo"
];

// --- DADOS DO CRONOGRAMA ---
const scheduleData = [
    { date: "2026-02-02", week: 1, day: "Segunda", items: [{ id: "s1_seg_1", type: "red", subj: "Dir. Adm", desc: "Item 4: Lei 9.784/99 (Processo Adm e Órgãos)" }, { id: "s1_seg_2", type: "blue", subj: "Português", desc: "Itens 1 e 2: Leitura, Interpretação e Tipologia" }] },
    { date: "2026-02-03", week: 1, day: "Terça", items: [{ id: "s1_ter_1", type: "red", subj: "Dir. Adm", desc: "Item 10: Dec-Lei 200/67 (Org. Federal)" }, { id: "s1_ter_2", type: "gray", subj: "Lógica", desc: "Item 18: Estruturas Lógicas e Diagramas" }] },
    { date: "2026-02-04", week: 1, day: "Quarta", items: [{ id: "s1_qua_1", type: "red", subj: "Adm. Púb", desc: "Item 5: Agentes Públicos (Cargos e Funções)" }, { id: "s1_qua_2", type: "blue", subj: "Português", desc: "Item 3: Semântica e Significação das Palavras" }] },
    { date: "2026-02-05", week: 1, day: "Quinta", items: [{ id: "s1_qui_1", type: "red", subj: "Leg. BA", desc: "Item 12: Lei 13.204/14 (Est. Organizacional)" }, { id: "s1_qui_2", type: "red", subj: "Leg. BA", desc: "Itens 13 e 14: Leis 10.549 e 12.212 (Executivo)" }] },
    { date: "2026-02-06", week: 1, day: "Sexta", items: [{ id: "s1_sex_1", type: "green", subj: "Gestão", desc: "Item 11: Dec. 9.739/19 (Eficiência/Inovação)" }, { id: "s1_sex_2", type: "red", subj: "Const.", desc: "Item 6: Princípios LIMPE + Questões" }] },
    { date: "2026-02-07", week: 1, day: "Sábado", items: [{ id: "s1_sab", type: "orange", subj: "Revisão", desc: "Resumo Geral + 40 Questões IBFC" }] },
    { date: "2026-02-08", week: 1, day: "Domingo", items: [{ id: "s1_dom", type: "gray", subj: "Descanso", desc: "Descanso Estratégico e Mental" }] },
    { date: "2026-02-09", week: 2, day: "Segunda", items: [{ id: "s2_seg_1", type: "red", subj: "CF/88", desc: "Itens 7 e 15: Educação na CF + Dir. Subjetivo" }, { id: "s2_seg_2", type: "blue", subj: "Português", desc: "Item 4: Pontuação e Sinais Gráficos" }] },
];

const subjectMeta = {
    'Dir. Adm': { color: 'red', icon: '⚖️' },
    'Adm. Púb': { color: 'orange', icon: '🏛️' },
    'Leg. BA': { color: 'yellow', icon: '📜' },
    'Const.': { color: 'red', icon: '⚖️' },
    'CF/88': { color: 'red', icon: '⚖️' },
    'Dir. Penal': { color: 'red', icon: '👮' },
    'Gestão': { color: 'emerald', icon: '📊' },
    'Português': { color: 'blue', icon: '✍️' },
    'Lógica': { color: 'purple', icon: '🧠' },
    'LDB': { color: 'pink', icon: '🎓' },
    'Pedagogia': { color: 'pink', icon: '🏫' },
    'ECA': { color: 'cyan', icon: '👶' },
    'Social': { color: 'indigo', icon: '🌍' },
    'Igualdade': { color: 'fuchsia', icon: '🤝' },
    'História': { color: 'amber', icon: '🏺' },
    'Intl': { color: 'sky', icon: '🌐' },
    'Gênero': { color: 'rose', icon: '👩' },
    'Profissão': { color: 'lime', icon: '💼' },
    'Info': { color: 'slate', icon: '💻' },
    'Revisão': { color: 'teal', icon: '🔄' },
    'Simulado': { color: 'orange', icon: '📝' },
    'Geral': { color: 'gray', icon: '📚' },
    'Contexto': { color: 'violet', icon: '🗞️' },
    'Guerra': { color: 'orange', icon: '⚔️' },
    'Lei Seca': { color: 'emerald', icon: '📖' },
    'Fórmulas': { color: 'indigo', icon: '➗' },
    'Decoreba': { color: 'rose', icon: '🧠' },
    'Leve': { color: 'slate', icon: '🍃' },
    'Pré-Prova': { color: 'slate', icon: '🧘' },
    'DIA DA PROVA': { color: 'yellow', icon: '🏆' },
    'Descanso': { color: 'gray', icon: '💤' },
    'Rev. Adm': { color: 'red', icon: '🔄' },
    'Rev. Port': { color: 'blue', icon: '🔄' }
};

const syllabusDB = scheduleData.flatMap(day => 
    day.items.map(item => ({
        id: item.id,
        cat: item.subj,
        title: `${day.day} - ${item.desc}`,
        text: `Conteúdo referente a ${item.subj}: ${item.desc}. Este tópico faz parte da ${day.week}ª semana de estudos. Foco total na resolução de questões e leitura da lei seca se aplicável.`
    }))
);

const achievementsList = [
    { id: 'perfect_day_counter', title: 'Dias Perfeitos', desc: 'Dias em que você completou 100% das tarefas.', icon: '🌟', type: 'counter', max: 55, progress: (s) => s.perfectDays, req: (s) => s.perfectDays >= 1 },
    { id: 'first_step_counter', title: 'Dias de Estudo', desc: 'Dias em que você realizou pelo menos uma tarefa.', icon: '📅', type: 'counter', max: 55, progress: (s) => s.distinctDaysCount, req: (s) => s.distinctDaysCount >= 1 },
    { id: 'streak_3', title: 'Foco Inicial', desc: 'Mantenha uma sequência de 3 dias.', icon: '🔥', max: 3, progress: (s) => s.streak, req: (s) => s.streak >= 3 },
    { id: 'streak_7', title: 'Consistência', desc: 'Mantenha uma sequência de 7 dias.', icon: '🚀', max: 7, progress: (s) => s.streak, req: (s) => s.streak >= 7 },
    { id: 'level_5', title: 'Estudante Nível 5', desc: 'Alcance o nível 5.', icon: '⭐', max: 5, progress: (s) => s.level, req: (s) => s.level >= 5 },
    { id: 'scholar_1', title: 'Leitor I', desc: 'Complete 10 tarefas.', icon: '📚', max: 10, progress: (s) => s.totalDone, req: (s) => s.totalDone >= 10 },
    { id: 'legislator', title: 'Jurista', desc: 'Complete 10 tarefas de Direito.', icon: '⚖️', max: 10, progress: (s) => s.subjectCounts['Direito'] || 0, req: (s) => (s.subjectCounts['Direito'] || 0) >= 10 }
];

// --- ESTADO LOCAL DE UI ---
let isRegistering = false;
let chartInstance = null;
let currentLibFilter = 'Todos';
let calendarDate = new Date('2026-02-02T00:00:00');
let currentSelectedDate = '';
let currentTopicTitle = "";
let currentTopicContext = "";
const intelCache = {}; 

// Expor dados para módulos de UI
window.scheduleData = scheduleData;
window.subjectMeta = subjectMeta;

// --- INICIALIZAÇÃO & ESTADO GLOBAL ---

// 1. O App reage a qualquer mudança no UserState
UserState.subscribe((state) => {
    // Atualiza interface sempre que o estado mudar
    if (state.isAuthenticated) {
        updateHeaderUI(state);
        initApp(); // Redesenha tudo
    }
});

function updateHeaderUI(state) {
    const name = state.displayName ? state.displayName.split(' ')[0] : 'Estudante';
    const initial = (state.displayName || 'E').charAt(0).toUpperCase();
    
    // Atualiza elementos visuais do header
    const nameEl = document.getElementById('header-name');
    if(nameEl) nameEl.innerText = name;
    
    const avatarEl = document.getElementById('profile-avatar-char');
    if(avatarEl) avatarEl.innerText = initial;

    // Remove overlay de login
    const overlay = document.getElementById('login-overlay');
    if(overlay && !overlay.classList.contains('hidden')) {
        overlay.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => overlay.classList.add('hidden'), 500);
    }
}

// 2. Monitora Autenticação (Alimenta o Estado)
AuthService.onAuthStateChanged((user) => {
    if (user) {
        // Passo 1: Atualiza Auth no Estado
        UserState.setAuthUser(user);

        // Passo 2: Busca dados no Banco e atualiza Estado
        FirestoreService.listenToUserProfile(appId, user.uid, (data) => {
            UserState.syncFromFirestore(data);
        });
    } else {
        UserState.setAuthUser(null);
        // Mostra login se não tiver usuário
        const overlay = document.getElementById('login-overlay');
        if(overlay) {
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.remove('hidden');
        }
    }
});

// Compatibilidade
window.handleLoginData = (user) => {
    UserState.setAuthUser(user);
};

function saveData() {
    const state = UserState.get();
    if(state.isAuthenticated && state.uid) {
        FirestoreService.saveUserProfile(appId, state.uid, { 
            checkedItems: state.checkedItems,
            achievements: state.achievements,
            extraXP: state.extraXP,
            perfectDaysCount: state.perfectDaysCount,
            completionDates: state.completionDates
        });
    }
}

function initApp() {
    renderDashboard();
    renderGamification();
    renderCalendar();
    renderRoadmap(); 
    renderAchievements();
    renderLibraryFilters();
    if (typeof window.searchContent === 'function') window.searchContent();
    updateChartTheme();
    
    // Load Theme
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
}

// --- NOVO: Motor de Recomendações ---
// Analisa os dados e atualiza a interface com dicas inteligentes
RecommendationsUI.render(scheduleData);

function addXP(amount) { 
    const state = UserState.get();
    UserState.updateProgress({ extraXP: state.extraXP + amount });
}

function showToast(title, msg) {
    const toast = document.getElementById('achievement-toast');
    if (!toast) return;
    document.getElementById('toast-title').innerText = msg;
    toast.classList.remove('translate-x-full');
    setTimeout(() => toast.classList.add('translate-x-full'), 4000);
}

// --- NAVEGAÇÃO E UI ---

window.switchView = (id) => {
    ['dashboard', 'schedule', 'library', 'edital', 'stats', 'achievements'].forEach(v => {
        const el = document.getElementById('view-'+v);
        if (el) el.classList.add('hidden');
    });
    const target = document.getElementById('view-'+id);
    if (target) target.classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll(`.nav-item[onclick*="${id}"]`).forEach(el => el.classList.add('active'));

    if(window.innerWidth < 768) {
        const sb = document.getElementById('main-sidebar');
        if(sb.classList.contains('sidebar-open')) window.toggleSidebar();
    }
}

window.toggleSidebar = () => {
    const sb = document.getElementById('main-sidebar');
    const ov = document.getElementById('mobile-overlay');
    if (sb) sb.classList.toggle('sidebar-open');
    if (ov) ov.classList.toggle('hidden');
}

window.toggleSidebarDesktop = () => {
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
}

window.scrollToTasks = () => {
    document.getElementById('task-section')?.scrollIntoView({ behavior: 'smooth' });
}

// --- FUNÇÕES DE RENDERIZAÇÃO ---

function renderDashboard() {
    const state = UserState.get(); // Pega dados do estado
    const examDate = new Date('2026-03-29');
    const diff = Math.ceil((examDate - new Date()) / (1000 * 60 * 60 * 24));
    document.getElementById('header-countdown').innerText = diff > 0 ? diff : "HOJE";

    const total = scheduleData.reduce((acc, d) => acc + d.items.length, 0);
    const done = state.checkedItems.length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    
    const circle = document.getElementById('dash-circle-progress');
    if (circle) circle.style.strokeDashoffset = (2 * Math.PI * 40) * (1 - percent / 100);
    document.getElementById('dash-percent-text').innerText = `${percent}%`;
    document.getElementById('dash-completed-count').innerText = done;
    
    if(!currentSelectedDate) selectDate(new Date().toISOString().split('T')[0] > '2026-02-02' ? new Date().toISOString().split('T')[0] : '2026-02-02');
    else selectDate(currentSelectedDate);
}

function renderCalendar() {
    const state = UserState.get();
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
    document.getElementById('calendar-header-label').innerText = `${monthNames[calendarDate.getMonth()]} ${calendarDate.getFullYear()}`;

    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDayIndex = firstDay.getDay(); 
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDayIndex);

    for (let i = 0; i < 35; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        const dStr = d.toISOString().split('T')[0];
        const isSelected = dStr === currentSelectedDate;
        const tasks = scheduleData.find(s => s.date === dStr);
        const hasTask = tasks && tasks.items.length > 0;
        const isDone = hasTask && tasks.items.every(t => state.checkedItems.includes(t.id));

        const cell = document.createElement('div');
        cell.className = `h-14 md:h-20 rounded-xl border ${isSelected ? 'border-purple-500 dark:border-neon-purple shadow-[0_0_10px_rgba(188,19,254,0.3)] bg-white dark:bg-white/10' : 'border-slate-100 dark:border-white/5 bg-white dark:bg-dark-800'} flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition relative`;
        cell.onclick = () => selectDate(dStr);

        let statusDot = '';
        if(hasTask) {
            statusDot = isDone 
                ? `<div class="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>`
                : `<div class="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-slate-300 dark:bg-white/20"></div>`;
        }

        cell.innerHTML = `
            <span class="text-xs md:text-sm font-bold ${d.getMonth() === month ? 'text-slate-700 dark:text-white' : 'text-slate-300 dark:text-white/20'}">${d.getDate()}</span>
            ${statusDot}
        `;
        grid.appendChild(cell);
    }
}

window.changeCalendarDate = (delta) => {
    calendarDate.setMonth(calendarDate.getMonth() + delta);
    renderCalendar();
}

window.selectDate = (dateStr) => {
    const state = UserState.get();
    currentSelectedDate = dateStr;
    renderCalendar();
    
    const container = document.getElementById('today-container');
    if (!container) return;
    
    const data = scheduleData.find(d => d.date === dateStr);
    const dateObj = new Date(dateStr + 'T12:00:00');
    document.getElementById('selected-date-label').innerText = `${dateObj.getDate()}/${dateObj.getMonth()+1}`;
    document.getElementById('intel-date').innerText = dateStr;
    
    generateDailyBriefing(dateStr);

    let dailyTotal = 0;
    let dailyDone = 0;

    if(data && data.items.length > 0) {
        dailyTotal = data.items.length;
        dailyDone = data.items.filter(i => state.checkedItems.includes(i.id)).length;
        
        container.innerHTML = data.items.map(item => {
            const isChecked = state.checkedItems.includes(item.id);
            return `
            <div class="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-dark-900 border ${isChecked ? 'border-green-500/30' : 'border-slate-100 dark:border-white/5'} transition-all group hover:border-blue-400 dark:hover:border-neon-blue">
                <div class="custom-checkbox relative w-6 h-6 shrink-0">
                    <label class="cursor-pointer block w-full h-full">
                        <input type="checkbox" class="sr-only" onchange="toggleItem('${item.id}')" ${isChecked ? 'checked' : ''}>
                        <div class="w-full h-full border-2 border-slate-300 dark:border-slate-600 rounded-lg transition-all bg-transparent"></div>
                    </label>
                </div>
                <div class="flex-1 min-w-0 cursor-pointer" onclick="openContentModal('${item.id}')">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 truncate">${item.subj}</span>
                        ${isChecked ? '<span class="text-[10px] text-green-500 font-bold hidden sm:inline">CONCLUÍDO +'+XP_PER_TASK+' XP</span>' : ''}
                    </div>
                    <p class="text-sm font-semibold text-slate-700 dark:text-white truncate group-hover:text-blue-500 dark:group-hover:text-neon-blue transition-colors ${isChecked ? 'line-through opacity-50' : ''}">${item.desc}</p>
                </div>
                <button onclick="openContentModal('${item.id}')" class="p-2 text-slate-300 hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>`;
        }).join('');
    } else {
        container.innerHTML = `<div class="p-8 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-2xl text-sm">Sem missões para este dia.</div>`;
    }

    const percent = dailyTotal > 0 ? (dailyDone / dailyTotal) * 100 : 0;
    document.getElementById('daily-progress-bar').style.width = `${percent}%`;
    document.getElementById('daily-progress-text').innerText = `${dailyDone}/${dailyTotal} Completas`;
}

// AÇÃO PRINCIPAL DE ATUALIZAÇÃO
window.toggleItem = async (id) => {
    // 1. Bloqueia clique duplo visualmente
    const checkbox = document.querySelector(`input[onchange="toggleItem('${id}')"]`);
    if(checkbox) checkbox.disabled = true;

    const state = UserState.get();
    let isPerfectDay = false;
    
    // Verificação local rápida se pode ser um dia perfeito (só para avisar o servidor)
    if (!state.checkedItems.includes(id)) {
         const tempItems = [...state.checkedItems, id];
         const day = scheduleData.find(d => d.items.some(i => i.id === id));
         if(day && day.items.every(i => tempItems.includes(i.id))) {
             isPerfectDay = true;
         }
    }

    try {
        showToast("Sincronizando...", "Validando progresso no servidor...");
        // 2. CHAMA O BACKEND
        const updatedData = await FunctionsService.updateUserProgress(id, isPerfectDay);
        // 3. Recebe os dados oficiais e atualiza a tela
        UserState.syncFromFirestore(updatedData);
        
        if (isPerfectDay) {
            showToast("Dia Perfeito!", `XP Bônus Confirmado pelo Servidor!`);
        } else {
            showToast("Salvo", "Progresso atualizado.");
        }

    } catch (error) {
        console.error(error);
        showToast("Erro", "Falha ao salvar. Verifique sua conexão.");
        if(checkbox) checkbox.checked = !checkbox.checked;
    } finally {
        if(checkbox) checkbox.disabled = false;
    }
}

function renderRoadmap() {
    const state = UserState.get();
    const container = document.getElementById('full-schedule-container');
    if (!container) return;
    
    const weeks = {};
    scheduleData.forEach(d => {
        if(!weeks[d.week]) weeks[d.week] = [];
        weeks[d.week].push(d);
    });

    const today = new Date().toISOString().split('T')[0];
    let activeWeek = 1;
    for (const w in weeks) {
        const dates = weeks[w].map(d => d.date);
        if (today >= dates[0] && today <= dates[dates.length-1]) activeWeek = parseInt(w);
        else if (today > dates[dates.length-1]) activeWeek = parseInt(w) + 1;
    }
    if (activeWeek > 8) activeWeek = 8;

    let html = '';
    for (let i = 1; i <= 8; i++) {
        const weekData = weeks[i] || [];
        const weekItems = weekData.flatMap(d => d.items);
        const totalItems = weekItems.length;
        const doneItems = weekItems.filter(item => state.checkedItems.includes(item.id)).length;
        const progress = totalItems > 0 ? (doneItems / totalItems) * 100 : 0;
        
        let statusClass = 'border-slate-200 dark:border-white/5 opacity-60 grayscale';
        let icon = '🔒';
        let statusText = 'Bloqueado';
        let lineClass = 'bg-slate-200 dark:bg-white/5';

        if (i < activeWeek) {
            statusClass = 'border-green-500/50 dark:border-green-500/30 bg-green-50/50 dark:bg-green-900/10';
            icon = '✅';
            statusText = 'Concluído';
            lineClass = 'bg-green-500';
        } else if (i === activeWeek) {
            statusClass = 'border-blue-500 dark:border-neon-blue shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-white dark:bg-dark-800';
            icon = '📍';
            statusText = 'Em Progresso';
            lineClass = 'bg-blue-500 animate-pulse';
        }

        html += `
        <div class="relative pl-8">
            <div class="absolute left-[-5px] top-6 w-4 h-4 rounded-full border-2 border-white dark:border-dark-900 ${lineClass} z-10"></div>
            <div class="rounded-2xl border ${statusClass} p-4 md:p-5 transition-all hover:scale-[1.01]">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-xs font-bold uppercase tracking-wider ${i === activeWeek ? 'text-blue-600 dark:text-neon-blue' : 'text-slate-500'}">Fase 0${i}</span>
                            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500">${statusText}</span>
                        </div>
                        <h3 class="font-bold text-lg text-slate-900 dark:text-white">Semana ${i}</h3>
                    </div>
                    <div class="text-right">
                         <span class="text-2xl font-bold ${i === activeWeek ? 'text-blue-600 dark:text-neon-blue' : 'text-slate-400'}">${Math.round(progress)}%</span>
                    </div>
                </div>
                <div class="w-full bg-slate-100 dark:bg-white/5 rounded-full h-2 overflow-hidden">
                    <div class="bg-blue-500 h-full rounded-full transition-all duration-1000" style="width: ${progress}%"></div>
                </div>
            </div>
        </div>`;
    }
    container.innerHTML = html;
}

function calculateStats() {
    const state = UserState.get();
    const distinctDays = new Set();
    const subjectCounts = {};
    let weekendTasks = 0;

    scheduleData.forEach(d => {
        const isWeekend = d.day === 'Sábado' || d.day === 'Domingo';
        d.items.forEach(item => {
            if (state.checkedItems.includes(item.id)) {
                distinctDays.add(d.date);
                let category = item.subj;
                if (['Dir. Adm', 'Adm. Púb', 'Leg. BA', 'Const.', 'CF/88', 'Dir. Penal', 'Gestão', 'Const. BA'].includes(item.subj)) category = 'Direito';
                if (['LDB', 'Pedagogia', 'ECA'].includes(item.subj)) category = 'Educação';
                if (['Igualdade', 'História', 'Social', 'Intl'].includes(item.subj)) category = 'Sociedade';
                subjectCounts[category] = (subjectCounts[category] || 0) + 1;
                if(isWeekend) weekendTasks++;
            }
        });
    });

    return {
        distinctDaysCount: distinctDays.size,
        streak: distinctDays.size, // Simplificado
        subjectCounts,
        weekendTasks
    };
}

function renderGamification() {
    const state = UserState.get();
    const taskXP = state.checkedItems.length * XP_PER_TASK;
    const totalXP = taskXP + state.extraXP;
    const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
    
    // Atualiza Estado
    if(state.level !== level) {
         // TODO: Mostrar Modal de Level Up
    }

    // Atualiza HUD
    document.getElementById('xp-text').innerText = `${totalXP % XP_PER_LEVEL} / ${XP_PER_LEVEL}`;
    document.getElementById('xp-bar').style.width = `${(totalXP % XP_PER_LEVEL) / XP_PER_LEVEL * 100}%`;
    document.getElementById('level-circle').innerText = level;
    document.getElementById('stat-level').innerText = level;
    document.getElementById('stat-xp').innerText = totalXP;
    document.getElementById('stat-completed').innerText = state.checkedItems.length;

    // Atualiza Conquistas
    const stats = calculateStats();
    
    // Streak check
    if(stats.streak > 0) {
        document.getElementById('streak-count').innerText = stats.streak;
        document.getElementById('streak-fire').classList.remove('grayscale');
    } else {
        document.getElementById('streak-count').innerText = 0;
        document.getElementById('streak-fire').classList.add('grayscale');
    }

    renderAchievements(stats);
}

function renderAchievements(currentStats) {
    const state = UserState.get();
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;

    if (!currentStats) {
        const computed = calculateStats();
        currentStats = {
            level: Math.floor((state.checkedItems.length * XP_PER_TASK + state.extraXP) / XP_PER_LEVEL) + 1,
            streak: computed.streak,
            totalDone: state.checkedItems.length,
            perfectDays: state.perfectDaysCount,
            subjectCounts: computed.subjectCounts,
            distinctDaysCount: computed.distinctDaysCount,
            weekendTasks: computed.weekendTasks
        };
    }

    grid.innerHTML = achievementsList.map(ach => {
        const unlocked = ach.type !== 'counter' && state.achievements.includes(ach.id);
        let progressBarHtml = '';
        
        if(ach.type === 'counter' || ach.max) {
             const currentVal = ach.progress ? ach.progress(currentStats) : 0;
             const percent = Math.min(100, (currentVal / ach.max) * 100);
             progressBarHtml = `
             <div class="w-full mt-3 h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 transition-all duration-500" style="width: ${percent}%"></div>
             </div>
             <div class="flex justify-between text-[10px] text-slate-400 mt-1"><span>${currentVal}/${ach.max}</span></div>`;
        }

        const borderClass = unlocked ? 'border-yellow-400/50 dark:border-neon-gold/50 shadow-[0_0_10px_rgba(255,215,0,0.1)]' : 'border-slate-100 dark:border-white/5';
        const opacityClass = (unlocked || ach.type === 'counter') ? 'opacity-100' : 'opacity-70';

        return `
        <div class="bg-white dark:bg-dark-900 p-4 rounded-2xl border ${borderClass} ${opacityClass} flex flex-col items-center text-center transition-all relative overflow-hidden group">
            <div class="text-3xl mb-2 grayscale-0">${ach.icon}</div>
            <h4 class="font-bold text-slate-800 dark:text-white text-xs md:text-sm leading-tight">${ach.title}</h4>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-snug hidden sm:block">${ach.desc}</p>
            ${progressBarHtml}
        </div>`;
    }).join('');
}

function getSubjectColorClass(subj) {
    const meta = subjectMeta[subj] || { color: 'gray' };
    const c = meta.color;
    const colorMap = {
        'red': 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30',
        'blue': 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30',
        'green': 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30',
        'yellow': 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/30',
        'purple': 'text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30',
        'pink': 'text-pink-700 bg-pink-100 dark:text-pink-300 dark:bg-pink-900/30',
        'orange': 'text-orange-700 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/30',
        'gray': 'text-slate-700 bg-slate-100 dark:text-slate-300 dark:bg-white/10'
    };
    return colorMap[c] || colorMap['gray'];
}

// Funções de Biblioteca (faltantes no original)
function renderLibraryFilters() {
    const select = document.getElementById('library-filter-select');
    if (!select) return;
    
    // Extrai categorias únicas
    const categories = new Set(scheduleData.flatMap(d => d.items.map(i => i.subj)));
    const sortedCats = Array.from(categories).sort();
    
    let html = `<option value="Todos">Todas as Matérias</option>`;
    sortedCats.forEach(cat => {
        html += `<option value="${cat}">${cat}</option>`;
    });
    
    select.innerHTML = html;
}

window.setLibraryFilter = (val) => {
    currentLibFilter = val;
    window.searchContent();
}

window.searchContent = () => {
    const term = document.getElementById('search-input')?.value.toLowerCase() || '';
    const container = document.getElementById('library-results');
    if (!container) return;

    const results = syllabusDB.filter(item => {
        const matchesTerm = item.title.toLowerCase().includes(term) || item.text.toLowerCase().includes(term);
        const matchesCat = currentLibFilter === 'Todos' || item.cat === currentLibFilter;
        return matchesTerm && matchesCat;
    });

    if (results.length === 0) {
        container.innerHTML = `<div class="col-span-full py-12 text-center text-slate-400">Nenhum conteúdo encontrado.</div>`;
        return;
    }

    container.innerHTML = results.map(item => {
        const colorClass = getSubjectColorClass(item.cat);
        return `
        <div class="bg-white dark:bg-dark-900 p-6 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-blue-400 dark:hover:border-neon-blue transition-all cursor-pointer group flex flex-col h-full shadow-sm hover:shadow-md" onclick="openContentModal('${item.id}')">
            <div class="flex items-center justify-between mb-4">
                <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${colorClass} flex items-center gap-1">${item.cat}</span>
            </div>
            <h3 class="font-bold text-slate-800 dark:text-white text-base md:text-lg leading-tight group-hover:text-blue-500 dark:group-hover:text-neon-blue transition-colors mb-2">${item.title}</h3>
            <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed flex-1">${item.text}</p>
        </div>`
    }).join('');
}

// Global Modal Handler (Ponte para ModalsUI)
window.openContentModal = (id) => {
    // Busca o item nos dados globais
    let item = null;
    scheduleData.forEach(d => {
        const found = d.items.find(i => i.id === id);
        if(found) item = found;
    });
    
    if(!item) return;
    
    // Usa a UI de Modais
    ModalsUI.openContent(item);
    
    // Salva contexto para quiz (se necessário em outras funções globais)
    currentTopicTitle = item.subj;
    currentTopicContext = item.desc;
};

// Funções auxiliares para Chart.js
function updateChartTheme() {
    // Implementação básica para evitar erro se chartInstance não existir
    if (typeof Chart === 'undefined') return;
    // ... lógica do gráfico
}

// Funções de IA (Briefing)
async function generateDailyBriefing(dateStr) {
    const loading = document.getElementById('daily-briefing-loading');
    const container = document.getElementById('daily-briefing-content');
    
    if(!loading || !container) return;

    if (intelCache[dateStr]) {
        container.innerHTML = intelCache[dateStr];
        return;
    }

    loading.classList.remove('hidden');
    container.classList.add('hidden');

    try {
        const dayData = scheduleData.find(d => d.date === dateStr);
        if(!dayData) throw new Error("Sem dados");

        const prompt = `Atue como um Mentor de Concursos. Data: ${dateStr}. Matérias: ${dayData.items.map(i => i.subj).join(', ')}. Crie um resumo motivacional curto de 3 linhas focado na aprovação.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        
        const json = await response.json();
        const text = json.candidates[0].content.parts[0].text;
        const html = marked.parse(text);
        
        intelCache[dateStr] = html;
        container.innerHTML = html;

    } catch(e) {
        container.innerHTML = "<div class='text-red-500 text-center text-xs'>Erro de conexão ou sem dados para esta data.</div>";
    } finally {
        loading.classList.add('hidden');
        container.classList.remove('hidden');
    }
}