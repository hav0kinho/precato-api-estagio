const getMesDiaHoraMinuto = (): Number[] => {
  const horarioAtual = new Date();
  const minuto = horarioAtual.getMinutes();
  const hora = horarioAtual.getHours();
  const dia = horarioAtual.getDate();
  const mes = horarioAtual.getMonth() + 1;

  return [mes, dia, hora, minuto];
};

export default getMesDiaHoraMinuto;
