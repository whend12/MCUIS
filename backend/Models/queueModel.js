import { Sequelize } from "sequelize";
import database from "../Config/Database.js";

const { DataTypes } = Sequelize;

const Queue = database.define(
  "queues",
  {
    number_queque: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: false,
    timestamps: true,
  }
);

export default Queue;
