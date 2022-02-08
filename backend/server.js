const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(notes);
});

app.get("/blogs", (req, res) => {
  res.send(notes);
});

app.use("/", userRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
console.log(PORT);
app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
