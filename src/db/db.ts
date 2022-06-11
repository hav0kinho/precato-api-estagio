//=========================LIBS E ARQUIVOS===========================
import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
//================FUNÇÃO DE ORGANIZAÇÃO===============
const criaBancoDeDadosSeNaoExistir = () => {
  const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
  });

  connection.query(`CREATE DATABASE IF NOT EXISTS administracao`);
  connection.end();
};
//=================================DB=================================
criaBancoDeDadosSeNaoExistir();

const sequelize: Sequelize = new Sequelize("administracao", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch(() => {
    console.log("Conexão com banco de dados não foi realizada com sucesso!");
  });

export default sequelize;
