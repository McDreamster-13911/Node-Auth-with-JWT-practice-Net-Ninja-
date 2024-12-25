const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require("./routes/authRoutes")
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());



// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((result) => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch((err) => console.error('Database connection error:', err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies
app.get("/set-cookies", (req,res) => {

  // Setting the cookie
  // res.setHeader("Set-Cookie", "newUser=true");

  res.cookie("newUser", false);
  res.cookie("isEmployee", true, { maxAge : 1000*60*60*24, httpOnly:true});
  res.send("You got the cookies");
  
});

app.get("/read-cookies", (req,res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);
});