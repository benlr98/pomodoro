import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notes: String,
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: Number,
        default: 0
    },
    order: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    projectId: {
        type: String,
        default: "-1"
    },
    estPomodoro: {
        type: Number,
        default: 1
    },
    actPomodoro: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
