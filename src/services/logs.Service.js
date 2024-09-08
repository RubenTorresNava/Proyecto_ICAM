import ServerAccesLogsModels from "../models/ServerAccesLogs.models.js";

//crear o actualizar un log
export async function createOrUpdateLog(userId, action, details = '') {
    try {
        // Establecer la fecha de hoy con las horas en cero para comparaciones
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Buscar un log existente para hoy
        let log = await ServerAccesLogsModels.findOne({ logDate: today });

        // Si no existe un log para hoy, se crea uno nuevo
        if (!log) {
            log = new ServerAccesLogsModels({
                user: userId,
                action: action,
                details: details,
                logDate: today
            });
        } else {
            // Si existe, concatenar las nuevas acciones y detalles
            log.action += ` | ${action}`;
            log.details += ` | ${details}`;
        }

        // Guardar el log
        await log.save();
        console.log('Log creado o actualizado');
    } catch (error) {
        console.error('Error al crear o actualizar el log', error);
    }
}
