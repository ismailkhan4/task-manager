
const {
  generateOtp,
  encryptPassword,
  comparePasswords,
} = require("../validations/helper");
const { generateJwtToken } = require("../validations/jwttoken");
const { sendOTP } = require("../validations/mailer");
const {
  getUserByEmailDB,
  saveUserDetailsDB,
  updateUserPasswordDB,
  saveSocalUserDetailsDB,
  updateStripeCustomerIdByEmailDB,
} = require("./service");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await getUserByEmailDB(req.body.email);

    if (user) {
      res.status(401).send({ message: "User already exists." });
      return;
    }
    await saveUserDetailsDB({
      name,
      email,
      password: await encryptPassword(password),
    });
    res.status(200).send({ message: "User Created successfully." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const sentOtp = async (req, res) => {
  try {
    const user = await getUserByEmailDB(req.body.email);
    console.log(user);
    if (user) {
      res.status(401).send({ message: "User already exists." });
      return;
    }
    const otp = generateOtp();
    const response = await sendOTP(otp, req.body.email);
    if (!response.status) {
      res.status(400).send({ message: response.message });
      return;
    }
    res.status(200).send({ otp: otp });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const sentResetOtp = async (req, res) => {
  try {
    const user = await getUserByEmailDB(req.body.email);
    if (!user) {
      res.status(401).send({ message: "User does not exists." });
      return;
    }
    const otp = generateOtp();
    const response = await sendOTP(otp, req.body.email);
    if (!response.status) {
      res.status(400).send({ message: response.message });
      return;
    }
    res.status(200).send({ otp: otp });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await getUserByEmailDB(email);
    user = { ...user };
    console.log(user.dataValues);
    if (!user) {
      res.status(400).send({ message: "User does not exit." });
      return;
    }
    const response = await comparePasswords(password, user.dataValues.password);
    if (response) {
      const JWT = generateJwtToken(user.dataValues);
      res.status(200).send({
        jwt: JWT,
        data: { name: user.dataValues.name, email: user.dataValues.email, stripe_customer_id: user.dataValues.stripe_customer_id },
      });
    } else {
      res.status(400).send({ message: "Incorrect email or password." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    await updateUserPasswordDB(email, await encryptPassword(password));
    res.status(200).send({ message: "Password updated" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const socalUserLogin = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await getUserByEmailDB(email);
    if (user) {
      const JWT = generateJwtToken(user.dataValues);
      return res.status(200).send({
        jwt: JWT,
        data: { name: user.dataValues.name, email: user.dataValues.email },
      });
    } else {
      await saveSocalUserDetailsDB(email, name, req?.body?.role);

      const JWT = generateJwtToken({
        email: email,
        name: name,
      });
      return res.status(200).send({
        jwt: JWT,
        data: { name: name, email: email },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const checkUser = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await getUserByEmailDB(email);
    if (!user) {
      res.status(200).send({ newUser: true });
    } else {
      res.status(200).send({ newUser: false });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateStripeCustomerId = async (req, res) => {
  try {
    const { email, stripe_customer_id } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email is required." });
    }

    await updateStripeCustomerIdByEmailDB(email, stripe_customer_id);
    res.status(200).send({ message: "Stripe customer ID updated successfully." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { email, current_password, new_password, confirm_new_password } = req.body;

    if (new_password !== confirm_new_password) {
      return res.status(400).send({ message: "New passwords do not match." });
    }

    let user = await getUserByEmailDB(email);
    if (!user) {
      return res.status(400).send({ message: "User does not exist." });
    }

    const isPasswordMatch = await comparePasswords(current_password, user.dataValues.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ message: "Current password is incorrect." });
    }

    await updateUserPasswordDB(email, await encryptPassword(new_password));
    res.status(200).send({ message: "Password updated successfully." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  registerUser,
  sentOtp,
  login,
  sentResetOtp,
  resetPassword,
  socalUserLogin,
  checkUser,
  updateStripeCustomerId,
  updatePassword
};
