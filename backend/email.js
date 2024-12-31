require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs");
const mongoose = require("mongoose");
const signup = require("./models/signup");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "workandtest@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailToAllUsers = async (subject, message) => {
  try {
    const users = await signup.find({}, "email");
    const recipientEmails = users.map((user) => user.email);

    if (recipientEmails.length === 0) {
      console.log("No users found to send emails.");
      return;
    }

    const mailOptions = {
      from: '"Water Quality Monitor" <workandtest@gmail.com>',
      to: recipientEmails,
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Emails sent successfully to:", recipientEmails.join(", "));
      }
    });
  } catch (error) {
    console.error("Error fetching users from MongoDB:", error);
  }
};

const checkValuesAndNotify = () => {
  fs.readFileSync("./values.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading values.json:", err);
      return;
    } else {
      console.log("Values.json sent successfully");
    }

    try {
      const values = JSON.parse(data);

      const { ph, turbidity } = values;
      if (ph < 6) {
        sendEmailToAllUsers(
          "Alert: Low pH Level Detected",
          `The water's pH level is ${ph}, which is too acidic. Immediate action is recommended.`
        );
      } else if (ph > 8) {
        sendEmailToAllUsers(
          "Alert: High pH Level Detected",
          `The water's pH level is ${ph}, which is too alkaline. Immediate action is recommended.`
        );
      }

      if (turbidity > 5) {
        sendEmailToAllUsers(
          "Alert: High Turbidity Detected",
          `The water's turbidity level is ${turbidity}, which indicates contamination. Please investigate the source.`
        );
      }
    } catch (parseError) {
      console.error("Error parsing values.json:", parseError);
    }
  });
};

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB for email");
    // Start the interval only after successful connection
    setInterval(checkValuesAndNotify, 30000);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

console.log("Water quality monitoring service is running...");
