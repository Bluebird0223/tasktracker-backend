const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { connectToDatabase } = require("./db/db.config");
const morgan = require("morgan");
const http = require("http");
const path = require("path");
const routes = require("./src/routes/routes");

//access .env variable
const port = process.env.PORT || 3018;

//create express app
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", routes)

app.use("/getFiles", express.static(path.join(__dirname, "")));

app.get("/", async (request, response) => {
    response.status(200).json({
        message: "task tracker backend live 🤖🤖",
    });
});

//if routes not found
app.get("*", function (request, response) {
    response.status(404).json({ message: "Route not found" });
});
app.post("*", function (request, response) {
    response.status(404).json({ message: "Route not found" });
});

// error handler
app.use((err, res) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
});

connectToDatabase();

server.listen(port, () => {
    try {
        console.log(`Server is Running 🤖🤖 on port ${port} 🚀🚀 `);
    } catch (err) {
        console.log(err.message);
    }
});
