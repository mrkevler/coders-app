
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import uri from "./db/db.js";
import userRouters from "./routers/userRouters.js";
import contentRouters from "./routers/contentRouters.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", userRouters);
app.use("/content", contentRouters);

app.listen(port, () => {
  console.log(`Auth app listening on port ${port}`);
});
