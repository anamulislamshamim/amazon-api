const express = require('express');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');


// create app instance 
const app = express();

// enable app to read json data
app.use(bodyParser.json());
// enable app to read table content 
app.use(bodyParser.urlencoded({extended: false}))


// test route
app.use("/test", (req, res) => {
    res.send({
        "test status": "Successful",
        "developer": {
            "name": "Shamim",
            "Position": "Junior Web Developer",
            "Technology": "MERN, C/C++, Python, Django, Flask, Cybersecurity, Cloud, DevOps, IT Automation",
            "message": `Hi there! I am Shamim. I am currently working as a junior developer at KreaTech, Dhaka, Bangladesh. I am a tech enthusiast and love to develop innovative software. I would be glad If will get an opportunity to server you. 
            Thank you very much.`,
            "LinkedIn": "https://www.linkedin.com/in/anamul-islam-shamim/",
        },
        "location": "Dhaka, Bangladesh"
    })
});


// connect the database 
dbConnect();


// all necessary routes
app.use("/api/user", authRouter);


// middlewares to handle the invalid routes 
app.use(notFound);
app.use(errorHandler);


// run the server 
app.listen(PORT, () => {
    // show a message "Server run successfully on http://127.0.0.1:4000" like that on console
    console.log(`Server run successfully on http://127.0.0.1:${PORT}`);
});