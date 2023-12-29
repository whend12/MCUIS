import { Sequelize } from "sequelize";
import database from "../Config/Database.js";

const { DataTypes } = Sequelize;

const QueuePatient = database.define(
  "queuePatients",
  {
    number_queue: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: false,
    timestamps: true,
  }
);

export default QueuePatient;
