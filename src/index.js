import { PORT } from "./config.js";
import  app  from "./app.js";
import { connection } from "./services/connection.Service.js";

const incioServidor = async () => {
    try {
        await connection();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto: ${PORT}`);
        });
    } catch (error) {
        console.log("Error al iniciar el servidor", error);
    }
};

incioServidor();