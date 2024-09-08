import jwt from 'jsonwebtoken';
import User from '../../models/user.models.js';
import { JWT_SECRET } from '../../config.js';

export const validateUser = async (req, res, next) => { // función para validar el usuario
    try {
        // Obtener el token del encabezado Authorization
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'No se ha enviado un token.' });
        }

        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Asignar el usuario a la solicitud
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'El token ha expirado.' });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido.' });
        }
        res.status(500).json({ message: 'Error del servidor: ' + err.message });
    }
};


//verificar un rol específico con el token
export const verifyRole = (requiredRole) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(403).json({ message: 'No se ha enviado un token.' });
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.role !== requiredRole){
            return res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido.' });
    }
};