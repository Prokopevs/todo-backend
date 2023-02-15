const Task = require('../models/Task')
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req, res) => {
    console.log(req.query)
    const tasks = await Task.find(req.query)
    
    res.status(200).json({ tasks })
})

const createTask =  async (req, res) => {
    try {
        console.log(req.body)
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const getTask = asyncWrapper( async (req, res) => {
    const id = req.params.id
    const task = await Task.findOne({_id:id})
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
      }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper( async (req, res) => {
    const id = req.params.id
    const task = await Task.findOneAndUpdate({_id:id}, req.body, {new: true, runValidators: true})
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findOneAndDelete({_id:id})
        if(!task) {
            return res.status(404).json({msg: `No task with id: ${id}`})
        }
        res.status(200).json({ task })
        //res.status(200).send()
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask, 
}