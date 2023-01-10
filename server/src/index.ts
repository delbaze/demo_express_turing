import express from "express";
import db from "./db";
import skillsController from "./controller/skills";
import cors from "cors";
import wilderRoutes from "./routes/wilders.route";
import skillRoute from "./routes/skills.route";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/wilders", wilderRoutes);
app.use("/skills", skillRoute)

async function start(): Promise<void> {
  await db.initialize();
  app.listen(4000, () => {
    console.log("server ready");
  });
}

start().catch(console.error);
