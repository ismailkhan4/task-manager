const express = require("express");
const bodyParser = require("body-parser");
const { Task } = require("./models/index")

require("./src/cron");

const dotenv = require("dotenv");
dotenv.config();

const createValidator = require("./src/validations/yupvalidation");
const {
  userSchema,
  loginSchema,
  taskSchema,
} = require("./src/validations/helper");
const {
  registerUser,
  login,
} = require("./src/user/controller");
const { verifyJwtTown } = require("./src/validations/jwttoken");

const validateUserDetails = createValidator(userSchema);
const validateLoginDetails = createValidator(loginSchema);
const validateTaskDetails = createValidator(taskSchema);


const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS");
    res.set("Access-Control-Allow-Headers", "*");
    res.status(200).send();
  } else {
    next();
  }
});

app.post("/register", validateUserDetails, registerUser);
app.post("/login", validateLoginDetails, login);

app.post('/create_task', validateTaskDetails, async (req, res) => {
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
})

app.put('/update_task', async (req, res) => {
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
    res.status(403).send({ message: 'You are not authorized to create Task.' })
    console.log(req.body, jw)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

app.delete('/delete_task', async (req, res) => {
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
    res.status(403).send({ message: 'You are not authorized to create Task.' })
    console.log(req.body, jw)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})


app.listen(port, (error) => {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log(`Server running on port ${port}...`);
  }
});
