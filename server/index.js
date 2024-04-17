const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());

const server = http.createServer(app);

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://adityamehto:OUYjCF06Lmk29cm3@cluster0.gmbipn9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB database');
  }).catch(error => {
    console.error('MongoDB connection error:', error);
  });
  

// Define User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Hash the password before saving to database
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Define User model
const User = mongoose.model('User', userSchema);

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


server.listen(4000, ()=>{
    console.log("Server running on port 4000");
})