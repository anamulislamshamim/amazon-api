const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully 🥰")
    }
    catch (err) {
        console.log("Database connection error 😥")
    }
};


module.exports = dbConnect;