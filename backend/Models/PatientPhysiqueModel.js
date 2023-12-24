import Patient from "./PatientModel.js";
import { Sequelize } from "sequelize";
import database from "../Config/Database.js";

const { DataTypes } = Sequelize;

const PatientPhysique = database.define(
  "PatientPhysique",
  {
    bmi: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bloodPressure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heartRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    respiration: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    complaint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distanceVisionExamination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distanceVisionExaminationWithGlasses: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nearVisionExamination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visualFieldExamination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nightVisionExamination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colorVisionExamination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hearingExamination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodExamination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PatientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: "id",
        field: "id", // Sesuaikan dengan field id di model Patient
      },
    },
  },
  {
    freezeTableName: true,
  }
);

PatientPhysique.belongsTo(Patient);

export default PatientPhysique;
