import { DataTypes, Sequelize } from "sequelize";
import db from "../db";

const Subscriptions = db.define("subscriptions", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  subscription_date: {
    type: "TIMESTAMP",
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  last_message: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
  },
  active: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: true,
  },
});

const criarTabela = async () => {
  await Subscriptions.sync();
};

criarTabela();

export default Subscriptions;
