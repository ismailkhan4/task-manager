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
const { createTask, updateTask, deleteTask, getTasks } = require("./src/task/controller");

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

// USER Endopoints
app.post("/register", validateUserDetails, registerUser);
app.post("/login", validateLoginDetails, login);


// TASK Endpoints
app.post('/create_task', validateTaskDetails, createTask)
app.put('/update_task', validateTaskDetails, updateTask)
app.delete('/delete_task', deleteTask)
app.get('/tasks', getTasks)


app.listen(port, (error) => {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log(`Server running on port ${port}...`);
  }
});
