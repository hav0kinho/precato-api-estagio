import { DataTypes, Sequelize } from "sequelize";
import db from "../db";

const MessageFlow = db.define("message_flow", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  template_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  positions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const criarTabela = async () => {
  await MessageFlow.sync();
};

criarTabela();

export default MessageFlow;
