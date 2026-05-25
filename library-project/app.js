const express = require("express");

const app = express();

const authRoutes = require("./routes/authRoutes");

const bookRoutes = require("./routes/bookRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Library API Running");
});

module.exports = app;