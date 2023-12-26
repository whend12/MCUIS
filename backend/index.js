import express from "express";
import database from "./Config/Database.js";
import UserRoutes from "./Routes/User.js";
import QueueRoutes from "./Routes/Queue.js";
import PatientRoutes from "./Routes/Patient.js";
import ConditionRoutes from "./Routes/Condition.js";
import ConditionTwo from "./Routes/ConditionTwo.js";
import HasilAnalisisRoutes from "./Routes/HasilAnalisis.js";
import PatientLabRoutes from "./Routes/PatientLab.js";
import PatientPhysiqueRoutes from "./Routes/PatientPhysique.js";
import PatientPhysiqueTwoRoutes from "./Routes/PatientPhysiqueTwo.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

try {
  await database.authenticate();
  console.log("Database Connected...");
} catch (error) {
  console.log("Failed to Connect Database!");
}

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(
  "/api/v1/",
  UserRoutes,
  QueueRoutes,
  PatientRoutes,
  ConditionRoutes,
  HasilAnalisisRoutes,
  PatientLabRoutes,
  PatientPhysiqueRoutes,
  PatientPhysiqueTwoRoutes,
  ConditionTwo
);

app.listen(5000, () => console.log("Server Running at port 5000... "));
