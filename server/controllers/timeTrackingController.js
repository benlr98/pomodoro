import TrackedTime from '../models/TrackedTime.js';


export async function createTracking(req, res) {
    try {
        let newTracking = new TrackedTime(req.body);
        let savedTracking = await newTracking.save();
        res.json(savedTracking)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' })
    }
}
/** 
export async function readTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
export async function updateTask(req, res) {
    let taskId = req.params.id;
    let updates = req.body;
    try {
        let updatedTask = await Task.findByIdAndUpdate(taskId, updates, { returnDocument: "after" });
        res.json(updatedTask)

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
*/

