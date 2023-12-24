import { Sequelize } from "sequelize";
import database from "../Config/Database.js";

const { DataTypes } = Sequelize;

const Condition = database.define(
  "Condition",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lowerLimit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upperLimit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    satuan: {
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

export default Condition;
