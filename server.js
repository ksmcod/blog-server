const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
require("dotenv").config();

// Initialize app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
// app.use(cors());
app.use(cookieParser());

// Router
app.use("*", (req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// app.listen(port,() => {
//     console.log(`Server listening on port ${port}`);
// })

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`Connected to db & listening on port ${port}`);
  });
});
