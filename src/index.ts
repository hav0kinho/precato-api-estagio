//http://apilayer.net/api/check?access_key=c5118f1f9827f42a5fc4b231932130a8&email=sample%40gmail.com&smtp=1&format=1
//=========================LIBS E ARQUIVOS===========================
import express, { Request, Response } from "express";
const cors = require("cors");
//MySQL
const mysql2 = require("mysql2");
const db = require("./db/db");
import Subscriptions from "./db/models/Subscriptions";
import MessageFlow from "./db/models/MessageFlow";
//Funções
import validarEmail from "./functions/validarEmail";
import verificarHorario from "./functions/verificarHorario";
//Interfaces
import IDiaHoraMinuto from "./interfaces/IDiaHoraMinuto";
import verificarHorarioEEnviarMensagem from "./functions/verificarHorarioEEnviarMensagem";
//================================APP================================
const app = express();
//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//PORTA
const PORT = 8000;
//=====================FUNCIONALIDADES EXTRAS========================
//Também precisamos de um serviço periódico que seja executado uma vez ao dia, sempre no mesmo horário, para atualizar no banco de dados qual a última mensagem disparada para cada inscrição.

//Vai executar essa função a cada 1 minuto, já que a horá pode ser customizada para "hora" e "minuto"
setInterval(verificarHorarioEEnviarMensagem, 60000);
//==============================ROTAS================================
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Pagina Inicial da API");
});
//=============INSCRITOS=============
app.get("/inscritos", async (req: Request, res: Response) => {
  const subscriptions = await Subscriptions.findAll();
  res.status(200).send(subscriptions);
});

app.post("/inscritos", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  //Validação de Email
  console.log(email);
  if ((await Subscriptions.findOne({ where: { name: email } })) === null) {
    if ((await validarEmail(email)) === true) {
      const newUser = await Subscriptions.create({
        name: email,
      });
      res.status(200).send("Inscrito Cadastrado");
    } else {
      res.status(400).send("Esse email não é valido");
    }
  } else {
    res.status(400).send("Esse email já está cadastrado");
  }
});
//=============MENSAGENS=============
app.get("/mensagens", async (req: Request, res: Response) => {
  const messages = await MessageFlow.findAll();
  res.status(200).send(messages);
});

app.post("/mensagens", async (req: Request, res: Response) => {
  const { message, position } = req.body;
  const newMessage = await MessageFlow.create({
    template_name: message,
    positions: position,
  });

  res.status(200).send("Messagem Cadastrada");
});
//============================SERVIDOR===============================
app.listen(PORT, () => {
  console.log("Rodando na porta : " + PORT);
});
