import { Sequelize } from "sequelize";

const database = new Sequelize("mcu", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default database;
