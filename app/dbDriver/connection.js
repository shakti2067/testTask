const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("testTask Databased Connected.....")
    })
    .catch((error) => {
        console.log("Error while connecting to DB", error)
    })