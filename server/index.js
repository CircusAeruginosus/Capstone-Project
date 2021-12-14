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
const omdbController = require("./controller/omdbController");
const titleController = require("./controller/titleController");
const { Sequelize } = require("sequelize/dist");


//endpoints
app.get("/api/title/search/", omdbController.searchTitle)
app.post("/api/save/title/", titleController.saveToDb)


//defining port for heroku, or if not connected to heroku, on port 4040
const port = process.env.Port || 4040

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})