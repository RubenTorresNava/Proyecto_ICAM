import  User from '../../models/user.models.js';
import  Role from '../../models/roles.models.js';

export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params; // ID del usuario
        const { role } = req.body; // Nombre del rol (por ejemplo, 'admin', 'moderator', etc.)

        // Validar que el rol sea uno de los roles permitidos (opcional si los roles están bien configurados en la base de datos)
        const validRoles = ['admin', 'moderator', 'regular'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                message: 'Rol no válido',
            });
        }

        // Buscar el ObjectId del rol en la colección de roles
        const roleDoc = await Role.findOne({ name: role }).exec(); // Asumo que los roles tienen un campo 'name'
        if (!roleDoc) {
            return res.status(404).json({
                message: 'Rol no encontrado',
            });
        }

        // Actualizar el rol del usuario con el ObjectId
        const user = await User.findOneAndUpdate(
            { id }, 
            { role: roleDoc._id }, // Aquí asignas el ObjectId del rol
            { new: true }
        ).exec();

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
            });
        }

        res.status(200).json({
            message: 'Rol de usuario actualizado con éxito',
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el rol del usuario',
            error: error.message,
        });
    }
};
