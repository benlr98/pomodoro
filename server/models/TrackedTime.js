import mongoose, { Mongoose } from "mongoose";

const timeTracked = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
        default: "64adc7c384c60cf6e46e6a2c"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default: "64adc72c84c60cf6e46e6a2a"
    },
    projectId: {
        type: String,
        default: "-1"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const TimeTracked = mongoose.model("time_tracked", timeTracked, "time_tracked");

export default TimeTracked;
