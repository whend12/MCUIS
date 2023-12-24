import Patient from "../Models/PatientModel.js"; // Mengimpor model Patient

import database from "../Config/Database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

const HasilAnalisis = database.define("HasilAnalisis", {
  saran: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kesimpulan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

HasilAnalisis.belongsTo(Patient); // Mendefinisikan relasi HasilAnalisis memiliki satu pasien (belongsTo Patient)

export default HasilAnalisis;
