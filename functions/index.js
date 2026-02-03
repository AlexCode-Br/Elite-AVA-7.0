// ARQUIVO: functions/index.js

const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

// Configurações Matemáticas
const XP_PER_TASK = 150;
const XP_PER_LEVEL = 350;
const BONUS_PERFECT_DAY = 200;

exports.updateUserProgress = onCall(async (request) => {
    // 1. Verifica quem está chamando
    if (!request.auth) {
        throw new Error("Você precisa estar logado.");
    }

    const uid = request.auth.uid;
    const { toggleItemId, isPerfectDay } = request.data;
    
    // IMPORTANTE: Ajuste o App ID se necessário. 
    // No seu código anterior era 'default-app-id' ou vinha de window.__app_id
    // Aqui vamos usar um padrão para garantir que funcione.
    const appId = "default-app-id"; 

    const userRef = admin.firestore()
        .collection('artifacts')
        .doc(appId)
        .collection('public')
        .doc('data')
        .collection('profiles')
        .doc(uid);

    // 2. Transação (Garante que ninguém mexa ao mesmo tempo)
    return admin.firestore().runTransaction(async (transaction) => {
        const doc = await transaction.get(userRef);
        
        // Dados atuais ou padrão
        const currentData = doc.exists ? doc.data() : {};
        
        let checkedItems = currentData.checkedItems || [];
        let extraXP = currentData.extraXP || 0;
        let perfectDaysCount = currentData.perfectDaysCount || 0;
        let completionDates = currentData.completionDates || {};
        const achievements = currentData.achievements || [];

        // 3. Lógica de Marcar/Desmarcar
        if (toggleItemId) {
            if (checkedItems.includes(toggleItemId)) {
                // REMOVER ITEM
                checkedItems = checkedItems.filter(id => id !== toggleItemId);
                delete completionDates[toggleItemId];
                // Nota: Não removemos XP de bônus já ganho para não complicar, 
                // mas recalcularemos o XP base das tarefas abaixo.
            } else {
                // ADICIONAR ITEM
                checkedItems.push(toggleItemId);
                completionDates[toggleItemId] = new Date().toISOString();
                
                // Aplicar bônus se for dia perfeito
                if (isPerfectDay) {
                    perfectDaysCount += 1;
                    extraXP += BONUS_PERFECT_DAY;
                }
            }
        }

        // 4. Recalcular Nível e XP Total
        const taskXP = checkedItems.length * XP_PER_TASK;
        const totalXP = taskXP + extraXP;
        const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;

        // 5. Preparar para salvar
        const newData = {
            checkedItems,
            completionDates,
            extraXP,
            perfectDaysCount,
            achievements,
            level, 
            lastUpdate: admin.firestore.FieldValue.serverTimestamp()
        };

        // 6. Salvar
        transaction.set(userRef, newData, { merge: true });

        // Devolver dados atualizados para o site
        return { ...newData, totalXP };
    });
});