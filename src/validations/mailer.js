const nodemailer = require("nodemailer");

async function sendOTP(otp, email) {
  // Create a transporter object using Gmail SMTP
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "otp@thehouserapp.com",
      pass: "ttsehkjxllrddqku",
    },
  });

  // Email content
  let mailOptions = {
    from: "otp@thehouserapp.com", // Sender address
    to: email, // List of recipients
    subject: "One-Time Password (OTP)", // Subject line
    text: `Your OTP is: ${otp}`, // Plain text body
  };

  try {
    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent: " + info.response);
    return { status: true, message: "Otp Send" };
  } catch (error) {
    console.error("Error occurred: " + error);
    return { status: false, message: error.message };
  }
}

module.exports = { sendOTP };
