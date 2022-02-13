const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const path = require("path");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const { request } = require("express");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send(notes);
// });

// app.get("/blogs", (req, res) => {
//   res.send(notes);
// });

app.use("/", userRoutes);
app.use("/", blogRoutes);
app.use(notFound);
app.use(errorHandler);

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

const PORT = process.env.PORT || 3001;
console.log(PORT);
app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
