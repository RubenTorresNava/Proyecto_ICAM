import { readProperties, writeProperties, loadServerSettings, updateServerSettings } from "../../services/file.Service.js";

// funcion para obtener las configuraciones del servidor
export const getServerSettings = async (req, res) => {
    try {
        const settings = await loadServerSettings(); // cargar las configuraciones del servidor
        res.status(200).json(settings); // retornar las configuraciones del servidor
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
