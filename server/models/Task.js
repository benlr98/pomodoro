import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    priority: Number,
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
