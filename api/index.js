const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect("mongodb+srv://amrit:091002GURAMRIT@cluster.fddqvf2.mongodb.net/netflix?retryWrites=true&w=majority")
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(8800, () => {
    console.log("Backend server is running!");
});