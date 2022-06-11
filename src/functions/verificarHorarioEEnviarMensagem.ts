//Outros Arquivos
import ITempo from "../interfaces/ITempo";
import verificarHorario from "./verificarHorario";
import IHoraMinuto from "../interfaces/IHoraMinuto";
import enviarMensagens from "./enviarMensagens";
import IMensagem from "../interfaces/IMensagem";
import IInscrito from "../interfaces/IInscrito";

const horarioParaEnviarMensagens: IHoraMinuto = {
  hora: 18,
  minuto: 43,
};

//===========================FUNÇÃO=======================================
const verificarHorarioEEnviarMensagem = async () => {
  const deveEnviarMensagens = verificarHorario(horarioParaEnviarMensagens);
  if (deveEnviarMensagens) {
    console.log(
      "verificarHorarioEEnviarMensanges: **HORA DE ENVIAR AS MENSAGENS**"
    );
    enviarMensagens();
  } else {
    console.log(
      "verificarHorarioEEnviarMensanges: **Ainda não é hora de enviar as mensagens**"
    );
  }
};

export default verificarHorarioEEnviarMensagem;
