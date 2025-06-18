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
const port = process.env.PORT || 3040;

//create express app
const app = express();
const server = http.createServer(app);

// Middlewares
// app.use(cors({ origin: "*" }))

const allowedOrigins = [
  "https://tasktracker-frontend-x2io-g9xihpblw-blubrds-projects.vercel.app",
  "http://localhost:3000",
  "https://tasktracker-backend-self.vercel.app"
  // Add other frontend URLs you trust, e.g. staging, prod, local frontend if needed
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow tools like Postman, curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // If you need cookies / auth headers
}));

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
