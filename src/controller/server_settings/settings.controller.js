import { readProperties, writeProperties, loadServerSettings, updateServerSettings } from "../../services/file.Service.js";

// funcion para obtener las configuraciones del servidor y parsear la fecha a dd/mm/yyyy del campo createdAt
export const getServerSettings = async (req, res) => {
    try {
        const settings = await loadServerSettings(); // cargar las configuraciones del servidor
        if (!settings) { // condicion para verificar si se encontraron las configuraciones del servidor
            return res.status(404).json({ message: 'No se encontraron configuraciones del servidor.' }); // retornar un mensaje de error
        }
        res.status(200).json({ // retornar las configuraciones del servidor
            settings: {
                ...settings._doc,
                createdAt: new Date(settings.createdAt).toLocaleDateString(),
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message }); // retornar un mensaje de error
    }
};

// funcion para actualizar las configuraciones del servidor
export const updateServerSettingsFromFile = async (req, res) => {
    try {
        const settings = req.body; // obtener las configuraciones del servidor
        await updateServerSettings(settings); // actualizar las configuraciones del servidor
        await writeProperties(); // escribir las configuraciones en el archivo server.properties
        res.status(200).json({ message: 'Configuraciones actualizadas.' }); // retornar un mensaje de exito
    } catch (err) {
        res.status(500).json({ message: err.message }); // retornar un mensaje de error
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