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

const saveSocalUserDetailsDB = async (email, name, role) => {
  try {
    return await User.create({ name: name, email: email });
  } catch (error) {
    console.log(error.message);
  }
};

const updateStripeCustomerIdByEmailDB = async (email, stripeCustomerId) => {
  try {
    await User.update(
      { stripe_customer_id: stripeCustomerId },
      {
        where: {
          email: email,
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update stripe customer ID');
  }
};

module.exports = {
  getUserByEmailDB,
  saveUserDetailsDB,
  updateUserPasswordDB,
  saveSocalUserDetailsDB,
  updateStripeCustomerIdByEmailDB
};
