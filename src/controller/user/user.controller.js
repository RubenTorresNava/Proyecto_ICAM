import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../database/models/user.models.js';
import Role from '../../database/models/roles.models.js';
import { JWT_SECRET } from '../../config.js';

//crear usuario
export const createUser = async (req, res) => {
    try {
        const { username, email, password, } = req.body;
        const regularRole = await Role.findOne({ name: 'regular' });
        const user = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            role: regularRole._id,
        });
        await user.save();
        if (user) {
            res.status(201).json({
                message: 'Usuario creado con éxito',
                user,
            });
        } else {
            res.status(400).json({
                message: 'El usuario no pudo ser creado',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el usuario',
            error: error.message,
        });
    }
};

//mostrar todos los usuarios y decir que rol tienen
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role').exec();

        const usersWithRoleName = users.map(user => ({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role ? user.role.name : 'Sin rol asignado',
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));

        res.status(200).json({
            users: usersWithRoleName,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al mostrar los usuarios',
            error: error.message,
        });
    }
};

//login de usuario y generar token de autenticación
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate('role').exec();
        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: 'Contraseña incorrecta',
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 86400,
        });
        res.status(200).json({
            message: 'Usuario logueado con éxito',
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role ? user.role.name : 'Sin rol asignado',
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al loguear el usuario',
            error: error.message,
        });
    }
}