import Patient from "./PatientModel.js";
import { Sequelize } from "sequelize";
import database from "../Config/Database.js";

const { DataTypes } = Sequelize;

const HasilAnalisis = database.define(
  "HasilAnalisis", // Pastikan menggunakan nama tabel yang benar
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    saran: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kesimpulan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PatientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: "id",
        field: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

HasilAnalisis.sync();

export default HasilAnalisis;
