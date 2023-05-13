import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware";
import initDashboard from "./dashboard";
import router from "./routes";

const app = express();
//moddlewares
app.use(cors());
app.use(express.json());

//apps
app.use("/api", router);
app.use(errorHandler);
initDashboard(app).then(() => {});
//err handler

export default app;
