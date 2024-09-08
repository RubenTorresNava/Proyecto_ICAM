import mongoose from "mongoose";

const serverAccesLogsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    action: { 
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now
    },
    details: {
        type: String
    },
    logDate: {
        type: Date,
        default: function() {
            return new Date().setHours(0, 0, 0, 0);
        },
    }
});

export default mongoose.model("ServerAccesLogs", serverAccesLogsSchema);