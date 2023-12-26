import { Sequelize } from "sequelize";
import database from "../Config/Database.js";

const { DataTypes } = Sequelize;

const ConditionTwo = database.define(
  "ConditionTwo",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    saran: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default ConditionTwo;
