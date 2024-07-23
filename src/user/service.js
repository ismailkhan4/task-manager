const { User } = require("../../models/index");

const getUserByEmailDB = async (email) => {
  const user = await User.findOne({ where: { email: email } });
  return user;
};

const saveUserDetailsDB = async (userDetails) => {
  return await User.create(userDetails);
};

const updateUserPasswordDB = async (email, password) => {
  console.log(password);
  try {
    await User.update(
      { password: password },
      {
        where: {
          email: email,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserByEmailDB,
  saveUserDetailsDB,
  updateUserPasswordDB,
};
