import fs from 'fs';
import path from 'path';
import ServerSettingsModels from '../models/ServerSettings.models.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); //ruta del archivo actual
const __dirname = path.dirname(__filename); //ruta del directorio actual
//ruta al archivo server.properties
const filePath = path.join(__dirname, '..', 'server.properties'); // ruta del archivo server.properties

// Convierte el documento a formato .properties
function convertToPropertiesFormat(settingsObj) {
    let propertiesString = ''; // inicializar la cadena de propiedades
    for (const [key, value] of Object.entries(settingsObj)) { // recorrer el objeto de configuraciones
        propertiesString += `${key}=${value}\n`; // asignar el valor al string de propiedades
    }
    return propertiesString; // retornar la cadena de propiedades
}


//leer archivo server.properties y convertirlo en un json
export const readProperties = () => { // funcion para leer el archivo server.properties
    fs.readFileSync(filePath, 'utf-8', (err, data) => { // Cambia a fs.readFile si no es sincrónico
        if (err) { // condicion de error en caso de que no se pueda leer el archivo
            return callback(err); // Cambia a return reject(err) si no es un callback
        }
        //convertir el contenido del archivo en un json
        const settings = data.split('\n').reduce((acc, line) => { // funcion para convertir el archivo en un json
            if(line.trim() && !line.startsWith('#')) {  // condicion para ignorar las lineas vacias y las que empiezan con #
                const [key, value] = line.split('='); // separar la linea en dos partes
                acc[key] = value; // asignar el valor de la linea al json
            }
            return acc; // retornar el json con los valores del archivo
    },{}); // inicializar el json
    callback(null, settings); // retornar el json con los valores del archivo
    });
};

// funcion para escribir en el archivo server.properties
export async function writeProperties() { 
    try {
        const serversettings = await ServerSettingsModels.findOne(); // buscar las configuraciones del servidor
        if (serversettings) { // condicion para verificar si se encontraron las configuraciones del servidor
            const serverSettingsObj = serversettings.toObject(); // Convierte a objeto simple
            const propertiesContent = convertToPropertiesFormat(serverSettingsObj); // convertir las configuraciones en formato .properties
            fs.writeFileSync(filePath, propertiesContent); // escribir las configuraciones en el archivo server.properties
            console.log('Archivo server.properties actualizado.'); 
        } else { // condicion en caso de que no se encuentren las configuraciones del servidor
            console.error('No se encontraron configuraciones del servidor.');
        }
    } catch (error) {
        console.error('Error al escribir el archivo server.properties:', error);
    }
}

//actualizar las configuraciones del servidor en la base de datos
export const updateServerSettings = async (settings) => { // funcion para actualizar las configuraciones del servidor
    try{
        await ServerSettingsModels.findOneAndUpdate({}, settings, { upsert: true, new: true}); // buscar y actualizar las configuraciones del servidor
    } catch (err){
        throw new Error(err); // condicion de error en caso de que no se pueda actualizar las configuraciones
    }
};

//cargar las configuraciones del servidor de la base de datos
export const loadServerSettings = async () => { // funcion para cargar las configuraciones del servidor
    try{
        return await ServerSettingsModels.findOne({}); // buscar y retornar las configuraciones del servidor
    } catch (err){
        throw new Error(err); // condicion de error en caso de que no se pueda cargar las configuraciones
    }
};

