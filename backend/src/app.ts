import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import accountRoute from "./routes/accountRoute";
import searchRoute from "./routes/searchRoute";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB connected!"))
  .catch((err: Error) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/account", accountRoute);
app.use("/api/search", searchRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/")));
  app.get("/*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../frontend/", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
