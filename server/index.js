const express = require("express");
const cors = require("cors");
const path = require("path")

const app = express();

//using express to serve up static files in client folder (html, css, etc.)
app.use(express.static("client"))


//middleware to serve files from the client folder
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/index.html"))
})

app.get("/styles", (req, res) => {
    res.sendFile(path.join(__dirname, "client/styles.css"))
})

app.get("/js", (req, res) => {
    res.sendFile(path.join(__dirname, "client/main.js"))
})


//top level middleware
app.use(express.json());
app.use(cors())

//controller
const titleController = require("./controller/titleController");
const res = require("express/lib/response");

//endpoints


//port
const port = process.env.Port || 4040

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})