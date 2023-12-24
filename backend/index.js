import express from "express";
import database from "./Config/Database.js";
import UserRoutes from "./Routes/User.js";
import QueueRoutes from "./Routes/Queue.js";
import PatientRoutes from "./Routes/Patient.js";
import ConditionRoutes from "./Routes/Condition.js";
import HasilAnalisisRoutes from "./Models/HasilAnalisModel.js";
import PatientLabRoutes from "./Models/PatientLabModel.js";
import PatientPhysiqueRoutes from "./Models/PatientPhysiqueModel.js";
import PatientPhysiqueTwoRoutes from "./Models/PatientPhysiqueTwoModel.js";
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
  PatientPhysiqueTwoRoutes
);

app.listen(5000, () => console.log("Server Running at port 5000... "));
