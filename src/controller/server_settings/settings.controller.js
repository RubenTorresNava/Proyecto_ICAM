import { writeProperties, loadServerSettings, updateServerSettings } from "../../services/file.Service.js";
import { createOrUpdateLog } from "../../services/logs.Service.js";

// funcion para obtener las configuraciones del servidor y parsear la fecha a dd/mm/yyyy del campo createdAt
export const getServerSettings = async (req, res) => {
    try {
        const settings = await loadServerSettings(); // cargar las configuraciones del servidor
        if (!settings) { // condicion para verificar si se encontraron las configuraciones del servidor
            return res.status(404).json({ message: 'No se encontraron configuraciones del servidor.' }); // retornar un mensaje de error
        }
        res.status(200).json({ // retornar las configuraciones del servidor
            settings: {
                ...settings._doc, // obtener las configuraciones del servidor
                createdAt: new Date(settings.createdAt).toLocaleDateString(), // parsear la fecha a dd/mm/yyyy
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message }); // retornar un mensaje de error
    }
};

// funcion para actualizar las configuraciones del servidor
export const updateServerSettingsFromFile = async (req, res) => {
    const userId = req.user._id; // obtener el id del usuario
    const newConfig = req.body.config;

    try {
        const settings = req.body; // obtener las configuraciones del servidor
        await updateServerSettings(settings); // actualizar las configuraciones del servidor
        await writeProperties(); // escribir las configuraciones en el archivo server.properties

        // Crear o actualizar el log después de la escritura del archivo
        const logDetails = JSON.stringify(newConfig); // Ajusta los detalles como sea necesario
        await createOrUpdateLog(userId, 'Configuraciones actualizadas', logDetails);

        // Retornar un mensaje de éxito
        res.status(200).json({ message: 'Configuraciones actualizadas.' });
    } catch (err) {
        console.error('Error al actualizar las configuraciones:', err.message);

        // Retornar un mensaje de error
        res.status(500).json({ message: 'Error al actualizar las configuraciones: ' + err.message });
    }
};



// funcion para sincronizar las configuraciones del servidor
export const syncSettingsToFile = async (req, res) => {
    try {
        await writeProperties(); // escribir las configuraciones en el archivo server.properties
        res.status(200).json({ message: 'Configuraciones sincronizadas.' }); // retornar un mensaje de exito
    } catch (err) {
        res.status(500).json({ message: err.message }); // retornar un mensaje de error
    }
};