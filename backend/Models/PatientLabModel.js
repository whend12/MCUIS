import database from "../Config/Database.js";
import { Sequelize } from "sequelize";
import Patient from "./PatientModel.js";

const { DataTypes } = Sequelize;

const PatientLab = database.define("PatientLab", {
  hemoglobin: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  hematocrit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  leukocyte: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  trombocyte: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  erythrocyte: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  mcv: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  mch: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  mchc: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  basofil: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  eosinofil: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  neutrofil: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  limfosit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  monosit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  led: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  urinecolor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urineph: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  urineprotein: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nitrit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leukocyteUrine: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  bloodurine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  glucoseUrine: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  eritrositUrine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eritrositSedimen: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  leukositSedimen: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  crystalUrine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

PatientLab.belongsTo(Patient);

export default PatientLab;
