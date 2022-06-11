import getMesDiaHoraMinuto from "./getMesDiaHoraMinuto";
import IHoraMinuto from "../interfaces/IHoraMinuto";

const verificarHorario = (tempoDesejadoParaEnvio: IHoraMinuto): boolean => {
  const [mes, dia, hora, minuto] = getMesDiaHoraMinuto();
  //Deve enviar mensagem vai verificar esta na hora de enviar a mensagem, verificando todos os parametros da hora desejada pelo programador
  const deveEnviarMensagem: boolean =
    tempoDesejadoParaEnvio.hora === hora &&
    tempoDesejadoParaEnvio.minuto === minuto;

  return deveEnviarMensagem;
};

export default verificarHorario;
