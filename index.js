import express from "express";
import bodyParser from "body-parser";
import indexRouter from "./routes/index.route.js";
import cors from "cors";

const app = express();
var corsOptions = {
  origin: "http://192.168.1.70:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors());
app.use(bodyParser.json());

app.use("/api", indexRouter);

app.listen(5000, () => console.log("server is running on port 5000"));
