const { Task } = require("../../models")
const { getAllTasks } = require("./service")

const getTasks = async (req, res) => {
    try {
        const jw = verifyJwtTown(req.headers.authorization.split(' ')[1])
        if (jw) {
            const tasks = await getAllTasks()
            if (!tasks) {
                res.status(401).send({ message: "Tasks does not exists." });
                return
            }
            res.status(200).send(tasks)
        }
        res.status(401).send({ message: 'You are not authorized to get all Task.' })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

const createTask = async (req, res) => {
    try {
        const jw = verifyJwtTown(req.headers.authorization.split(' ')[1])
        if (jw) {
            await Task.create(req.body)
            return res.status(200).send({ message: 'Task created successfully' })
        }
        res.status(401).send({ message: 'You are not authorized to create Task.' })
        console.log(req.body, jw)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

const updateTask = async (req, res) => {
    try {
        const jw = verifyJwtTown(req.headers.authorization.split(' ')[1])
        if (jw) {
            if (req.body?.taskDescription || req.body?.dueDate) {
                await Task.update(req.body, {
                    where: {
                        id: req.body.id,
                    },
                })
                return res.status(200).send({ message: 'Task updated successfully' })
            }
            res.status(401).send({ message: 'Task description or due date is required.' })
        }
        res.status(403).send({ message: 'You are not authorized to update Task.' })
        console.log(req.body, jw)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const jw = verifyJwtTown(req.headers.authorization.split(' ')[1])
        if (jw) {
            await Task.destroy({
                where: {
                    id: req.body.id,
                },
            })
            return res.status(200).send({ message: 'Task deleted successfully' })
        }
        res.status(403).send({ message: 'You are not authorized to delete Task.' })
        console.log(req.body, jw)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getTasks
}