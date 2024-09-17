import express from "express";
import morgan from "morgan";
import ViewsEngine from "./configs/views-engine";
import connectDB from "./configs/connect-db";
import routerWeb from "./routes/web";
const app = express();
routerWeb(app);
app.use(morgan("combined"));
const port = 3000;
ViewsEngine(app);
connectDB();
app.use(express.static("./src/public"));

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
