require("dotenv").config({ path: "../.env" })
const express = require("express");
const app = express()

//database setup
require("./dbDriver/connection")


const port = process.env.PORT ? process.env.PORT : 5000;


app.use(express.json())
app.use("/api/user", require('./api/user'))

app.listen(port, () => {
    console.log(`Server listing at localhost:${port}`)
})