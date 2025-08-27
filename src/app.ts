import express from "express";
import type { Application } from "express";
import routes from "./routes/routes";

const app: Application = express();
app.use(express.json());
app.use("/", routes);

export default app;
