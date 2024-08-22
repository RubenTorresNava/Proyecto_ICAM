import mongoose from "mongoose";

const serverAccesLogsSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    action: {
        type: String,
        required: true,
    },
    Timestamp: {
        type: Date,
        default: Date.now,
    },
    details: {
        type: String,
    },
});

export default mongoose.model("ServerAccesLogs", serverAccesLogsSchema);