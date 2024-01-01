const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cloudinary = require("cloudinary")
const { connectDb } = require("./config/database")
const cookieparser = require("cookie-parser")
require("dotenv").config({
    path: "./config/config.env"
});
const morgan = require('morgan');
const ErrorMiddleware = require("./middlewares/Error")
app.use(express.json());
morgan.token('host', function (req, res) {
    return req.hostname;
});

app.use(morgan(':method :host :status :res[content-length] - :response-time ms'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser())


connectDb();

cloudinary.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
})



const userroute = require("./routes/Userroutes");
const adminRoute = require("./routes/adminroutes")


app.use("/user", userroute);
app.use("/admin",adminRoute)

app.use(ErrorMiddleware);


app.listen(process.env.PORT, () => {
    console.log("working")
})
