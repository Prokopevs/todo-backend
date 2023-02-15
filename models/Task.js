const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'must provide title'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters'],
    },
    subtitle: {
        type: String,
        required: [true, 'must provide subtitle'],
        trim: true,
        maxlength: [100, 'name can not be more than 100 characters'],
    },
    files: {
        type: [String],
        required: true
    },
    finishedDate: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model("Task", TaskSchema)