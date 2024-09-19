import express from "express";
import morgan from "morgan";
import ViewsEngine from "./configs/views-engine";
import connectDB from "./configs/connect-db";
import routerWeb from "./routes/web";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser());

routerWeb(app);
app.use(morgan("combined"));
ViewsEngine(app);
connectDB();
app.use(express.static("./src/public"));
const port = 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
