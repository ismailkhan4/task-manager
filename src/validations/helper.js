const yup = require("yup");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function encryptPassword(plainPassword) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error;
  }
}

async function comparePasswords(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
}

const generateOtp = () => {
  let digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

const userSchema = yup.object().shape({
  name: yup.string().required("Name is a required field."),
  email: yup
    .string()
    .email("Must be a valied email")
    .required("Email is a required field"),
  password: yup.string().required("Password is required").min(6)
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valied email")
    .required("Email is a required field"),
  password: yup.string().required("Password is required").min(6),
});

const taskSchema = yup.object().shape({
  taskDescription: yup
    .string()
    .required("Task description is required."),
  dueDate: yup.string().required("Due Date is required"),
});

module.exports = {
  loginSchema: loginSchema,
  taskSchema:taskSchema,
  userSchema: userSchema,
  generateOtp: generateOtp,
  encryptPassword: encryptPassword,
  comparePasswords: comparePasswords,
};
