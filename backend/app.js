const express = require("express");
const app= express();
const home= require("./routes/home");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/userModel");
const multer = require("multer");
const aculty = require("./models/faculty");
const db = require("./config/database");

const profile =  require("./routes/profile");
const bodyParser = require("body-parser");
const placement  = require("./routes/placementData");
const faculty = require("./routes/faculty");
const Notice = require('./models/notice');
const Event = require('./models/event');

// const TrRecord = require('./models/trSheet');
const Academic = require('./models/academic');
const Student = require('./models/student');
const Faculty = require('./models/faculty');
const notice = require("./routes/notice");
const ConnectDB = require("./config/database");
const trData = require("./routes/trData");
const student = require("./routes/studentRoutes");
const eventRoutes = require("./routes/eventRoutes");
const cookieParser = require("cookie-parser");
const feedbackRoutes = require("./routes/feedbackRoutes");
const academicRoutes = require("./routes/academicRoutes");
const path = require('path');
require("dotenv").config();


// Set EJS as the templating engine
app.set('view engine', 'ejs');


// Set the directory where your EJS files will be stored
app.set('views', path.join(__dirname, 'views'));


// // Serve static files (CSS, JS, Images, etc.)
// app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const cors = require("cors");
// const corsOptions = {
//   origin: ['https://uitrgpv.netlify.app', 'http://localhost:5174'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
//   credentials: true, // Allow cookies to be sent with requests
//   optionsSuccessStatus: 200 // For legacy browser support
// };

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));



ConnectDB();


app.use("/" ,home);

app.use("/events", eventRoutes);
app.use("/profile", profile);
app.use("/faculty", faculty);
app.use("/placement",placement);
app.use("/notice", notice);
app.use("/trData", trData);
app.use("/student", student);
app.use("/academics", academicRoutes);
app.use("/feedback", feedbackRoutes);





// Route to render EJS template with notices
app.get('/admin/notice',isLogIn, async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 });
        res.render('notices', { notices });
    } catch (error) {
        res.status(500).send("Error loading notices");
    }
});

app.get('/admin/events',isLogIn, async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.render('events', { events });
    } catch (error) {
        res.status(500).send("Error loading events");
    }
});

app.get('/admin/faculty',isLogIn, async (req, res) => {
    try {
        const faculties = await Faculty.find().sort({ date: -1 });
        res.render('faculties', { faculties });
    } catch (error) {
        res.status(500).send("Error loading faculties");
    }
});

app.get('/admin/academics',isLogIn , async (req, res) => {
    try {
        const academics = await Academic.find().sort({ date: -1 });
        res.render('academics', { academics });
    } catch (error) {
        res.status(500).send("Error loading academics");
    }
});







//try and hit 

app.get("/admin", (req, res) => {
    res.render("register");
  });
  app.post("/admin/register", async (req, res) => {
    const { username, email, password } = req.body;
    // const admin= await userModel.findOne();
    // if(!admin){
    const user = await userModel.findOne({ username });
    
    if (user) {
     res.render("login", { message: "User already exists" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          const user = await userModel.create({
            username,
            email,
            password: hash,
          });
          let token = jwt.sign({ username, email }, process.env.SECRET_KEY);
          res.cookie("token", token, { httpOnly: true, expiresIn: "1m" });
          res.render("login");
        });
      });
    }
  // } 
  // else{
  //   res.render("login", { message: "Admin already exists" });
  // }
  });
  
  app.get("/admin/login", (req, res) => {
    if (req.cookies.token == " " || req.cookies.token == undefined)
      res.render("login");
    else res.redirect("/admin/dashboard");
  });
  app.post("/admin/verify", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign({ username, email: user.email }, process.env.SECRET_KEY);
          res.cookie("token", token, { httpOnly: true, expiresIn: "1h" });
  
          res.redirect("/admin/dashboard");
        } else res.render("login", { message: "wrong password" });
      });
    } else res.send("some thing wend worng");
  });
  
  app.get("/admin/logout", (req, res) => {
    res.cookie("token", " ");
    res.redirect("/admin/login");
  });
  
  app.get("/admin/dashboard", isLogIn, (req, res) => {
    res.render("AdminDashboard", req.user);
  });
  

  function isLogIn(req, res, next) {
    if (req.cookies["token"] == " " || req.cookies.token == undefined) {
      return res.redirect("/admin/login"); // Add return to stop execution
    } else {
      jwt.verify(req.cookies["token"], process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
          // Handle token verification error
          return res.redirect("/admin/login");
        }
        req.user = decoded;
        next(); // Only call next() if authentication is successful
      });
    }
  }
  

// Route to render EJS template with manageStudent
app.get('/admin/manageStudent', isLogIn,async (req, res) => {
    try {
        const students = await Student.find().sort({ date: -1 });
        res.render('students', { students });
    } catch (error) {
        res.status(500).send("Error loading students");
    }
});

// Route to render EJS template with to upload data
app.get('/admin/student/upload', isLogIn, (req, res) => {
    res.render('uploadData');
});

app.get('/admin/placement/upload', isLogIn, (req, res) => {
  res.render('uploadPlacementData');
});


app.listen(process.env.PORT || 5000, ()=>{
    console.log("connected to server "); 
    
})