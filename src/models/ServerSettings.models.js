import mongoose from "mongoose";

const ServerSettingsSchema = new mongoose.Schema({
    maxPlayers: { 
        type: Number, 
        default: 20 
    },
    serverName: { 
        type: String, 
        required: true 
    },
    motd: { 
        type: String 
    },
    whitelist: { 
        type: Boolean, 
        default: false 
    },
    version: { 
        type: String, 
        required: true 
    },
    serverIP: {
        type: String,
        required: true
    },
    serverPort: {
        type: String, // Cambia a Number si es solo numérico
        required: true
    },
    plugins: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("ServerSettings", ServerSettingsSchema);
