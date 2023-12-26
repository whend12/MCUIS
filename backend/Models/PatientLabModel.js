import database from "../Config/Database.js";
import { Sequelize } from "sequelize";
import Patient from "./PatientModel.js";

const { DataTypes } = Sequelize;

const PatientLab = database.define("PatientLab", {
  hemoglobin: {
    type: DataTypes.FLOAT,
  },
  hematocrit: {
    type: DataTypes.FLOAT,
  },
  leukocyte: {
    type: DataTypes.FLOAT,
  },
  trombocyte: {
    type: DataTypes.FLOAT,
  },
  erythrocyte: {
    type: DataTypes.FLOAT,
  },
  mcv: {
    type: DataTypes.FLOAT,
  },
  mch: {
    type: DataTypes.FLOAT,
  },
  mchc: {
    type: DataTypes.FLOAT,
  },
  basofil: {
    type: DataTypes.FLOAT,
  },
  eosinofil: {
    type: DataTypes.FLOAT,
  },
  neutrofil: {
    type: DataTypes.FLOAT,
  },
  limfosit: {
    type: DataTypes.FLOAT,
  },
  monosit: {
    type: DataTypes.FLOAT,
  },
  led: {
    type: DataTypes.FLOAT,
  },
  urinecolor: {
    type: DataTypes.STRING,
  },
  urineph: {
    type: DataTypes.FLOAT,
  },
  urineprotein: {
    type: DataTypes.STRING,
  },
  nitrit: {
    type: DataTypes.STRING,
  },
  leukocyteUrine: {
    type: DataTypes.FLOAT,
  },
  bloodurine: {
    type: DataTypes.STRING,
  },
  glucoseUrine: {
    type: DataTypes.FLOAT,
  },
  eritrositUrine: {
    type: DataTypes.STRING,
  },
  eritrositSedimen: {
    type: DataTypes.FLOAT,
  },
  leukositSedimen: {
    type: DataTypes.FLOAT,
  },
  crystalUrine: {
    type: DataTypes.STRING,
  },
});

PatientLab.belongsTo(Patient);

export default PatientLab;
