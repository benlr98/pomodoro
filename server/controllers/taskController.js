import Task from '../models/Task.js';

export async function readTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function createTask(req, res) {
    try {
        let newTask = new Task(req.body);
        let savedTask = await newTask.save();
        res.json(savedTask)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' })
    }
}

export async function updateTask(req, res) {
    try {
        let newTask = new Task(req.body);
        let savedTask = await newTask.save();
        res.json(savedTask)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' })
    }
}

export async function deleteTask(req, res) {
    let taskId = req.params.id

    try {
        let deletedTask = await Task.findByIdAndDelete(taskId);
        res.json(deletedTask)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' })
    }
}

