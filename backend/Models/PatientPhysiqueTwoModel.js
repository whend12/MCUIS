import database from "../Config/Database.js";
import { Sequelize } from "sequelize";
import Patient from "./PatientModel.js";

const { DataTypes } = Sequelize;

const PatientPhysiqueTwo = database.define("PatientPhysiqueTwo", {
  head: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  neck: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eyes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nose: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abdomen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  extremities: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lymph_nodes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

PatientPhysiqueTwo.belongsTo(Patient); // Mendefinisikan relasi PatientPhysique memiliki satu pasien (belongsTo Patient)

export default PatientPhysiqueTwo;
