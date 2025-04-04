//import cors from "cors";
//import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/geminiroutes.js";
import express from "express";

const app = express();
const PORT = 4000;
//app.use(cors());
//app.use(json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/gemini", dalleRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .json("Hello Aayush, Cloud Backend Server is running successfully");
});
//connectDB(process.env.MONGODB_URL);
app.listen(process.env.PORT || 5000, () => console.log("Server started"));

module.exports = app;
