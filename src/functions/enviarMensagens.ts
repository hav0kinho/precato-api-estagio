//=========================LIBS E ARQUIVOS===========================
//MySQL
const mysql2 = require("mysql2");
const db = require("../db/db");
import Subscriptions from "../db/models/Subscriptions";
import MessageFlow from "../db/models/MessageFlow";
//Intefaces
import IInscrito from "../interfaces/IInscrito";
import IMensagem from "../interfaces/IMensagem";
//Funções
import getMesDiaHoraMinuto from "./getMesDiaHoraMinuto";

//=========================FUNÇÃO======================================
const enviarMensagens = async () => {
  let mensagensDB: IMensagem[] = [];
  let usuariosDB: IInscrito[] = [];
  let mensagemDoDia: IMensagem;
  const [mes, dia, hora, minuto] = getMesDiaHoraMinuto();

  console.log(dia);

  //Receber todos os usuários e mensagens do banco de dados
  await MessageFlow.findAll()
    .then((mensagens) => {
      mensagens.map((msg) => {
        mensagensDB.push(msg.get() as IMensagem);
      });
    })
    .catch((err) => {
      console.log("Erro ao tentar pegar as mensagens do DB: " + err);
    });

  await Subscriptions.findAll()
    .then((inscritos) => {
      inscritos.map((inscrito) => {
        usuariosDB.push(inscrito.get() as IInscrito);
      });
    })
    .catch((err) => {
      console.log("Erro ao tentar pegar usuarios do DB: " + err);
    });

  //=========Regra ne negocio===========
  //Mensagens *Procura a mensagem do dia*
  mensagensDB.map((mensagem) => {
    if (mensagem.positions === dia) {
      console.log("Mensagem do dia foi encontrada");
      mensagemDoDia = mensagem;
      console.log(mensagemDoDia);
    }
  });
  //Usuarios
  usuariosDB.map(async (usuario) => {
    //Esses dois "if's" verificam se o usuario está ativo e se ele recebeu a ultima mensagem
    if (usuario.active !== false) {
      if (
        usuario.last_message !== mensagensDB[mensagensDB.length - 1].positions
      ) {
        try {
          //=-=-=-=-=-=-=-=-=-=-=-Nessa area ficaria a lógica do envio do email para o usuário-=-=-==-==-=-=-=-=-=
          console.log(
            `**PSEUDO**Enviando mensagem '${mensagemDoDia.template_name}' para ${usuario.name}`
          );

          await Subscriptions.update(
            { last_message: mensagemDoDia.positions },
            { where: { id: usuario.id } }
          );

          usuario.last_message = mensagemDoDia.positions;
          //=-=-=-=-=-=-=-=-=-=-=--=-=-==-==-=-=-=-=-=-=-=-==-==-=-=-=-=-=-=-=-==-==-=-=-=-=-=-=-=-==-==-=-=-=-=-=
        } catch (err) {
          console.log("Erro ao tentar enviar email para usuário: " + err);
        }
      } else {
        await Subscriptions.update(
          { active: false },
          { where: { id: usuario.id } }
        );
        usuario.active = false;
      }
    }
  });
};

export default enviarMensagens;
