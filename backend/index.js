require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const signup = require("./models/signup");
const fs = require("fs");
const path = require("path");
const data = require("./values.json");
const axios = require("axios");

const app = express();
const PORT = 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB ✅");
  })
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());

const JSON_PATH = path.join(__dirname, "values.json");
app.post("/update-values", (req, res) => {
  const { pH_value, turbidity_value, timestamp } = req.body;
  let fileData = [];
  if (fs.existsSync(JSON_PATH)) {
    fileData = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));
  }

  const latestData = fileData.length
    ? fileData[fileData.length - 1]
    : { pH: [], turbidity: [], timestamp: [] };

  latestData.pH.push(pH_value);
  latestData.turbidity.push(turbidity_value);
  latestData.timestamp.push(timestamp);

  if (latestData.pH.length > 5) {
    latestData.pH.shift();
    latestData.turbidity.shift();
    latestData.timestamp.shift();
  }
  if (!fileData.length || fileData[fileData.length - 1] !== latestData) {
    fileData.push(latestData);
  }

  fs.writeFileSync(JSON_PATH, JSON.stringify(fileData, null, 2));
  res.json({ message: "Data updated successfully", data: fileData });
});
app.post("/sens-data", async (req, res) => {
  try {
    res.header("Content-Type", "application/json");
    res.json(data);
  } catch (error) {
    console.error("Error fetching sensor data:", error.message);
    res.status(500).json({ error: "Failed to fetch sensor data" });
  }
});
app.post("/signup", async (req, res) => {
  const { username, password, email, phone, name } = req.body;
  // const existingUser = await signup.findOne({ username });
  // if (existingUser) {
  //   return res.status(400).json({ error: "Username already exists" });
  // }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new signup({
      username,
      email,
      phone,
      name,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await signup.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(403).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
    res.json({ token, username: user.username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
