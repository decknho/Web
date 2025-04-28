function gerar_senha() {
    var senha = "";
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    var tamanho = 12; // Tamanho da senha

    for (var i = 0; i < tamanho; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    document.getElementById("senha-gerada").innerText = "Senha gerada: " + senha;
}


async function investimentoSelic() {
  const mes = {
    '01': 'janeiro', '02': 'fevereiro', '03': 'março',
    '04': 'abril', '05': 'maio', '06': 'junho',
    '07': 'julho', '08': 'agosto', '09': 'setembro',
    '10': 'outubro', '11': 'novembro', '12': 'dezembro'
  };

  const response = await fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados?formato=json");
  const selic = await response.json();

  let mes_extenso = selic[selic.length - 1].data;
  mes_extenso = mes_extenso.slice(3, 5); // Pega o mês do formato DD/MM/YYYY

  const saldoInicial = parseFloat(prompt("Qual o valor inicial que você tem?"));

  const saldoMensal = parseFloat(prompt("Quantos reais por mês você pretende investir?"));
  const anos = parseInt(prompt("Quantidade de anos que você pretende investir?"));

  let saldo = saldoInicial;
  let meses = anos * 12;
  const porcentagemSelicMes = parseFloat(selic[selic.length - 1].valor) / 12;
  let contadorDeMes = 2;
  const guardou = saldo + saldoMensal * meses;

  while (meses !== 1) {
    saldo = saldo + saldoMensal + (saldo / 100 * porcentagemSelicMes);
    contadorDeMes++;
    meses--;
  }

  const rendeu = saldo - guardou;

  document.getElementById("info").innerText = `Na data de ${selic[selic.length - 1].data} | O valor do selic de ${mes[mes_extenso]} está em ${selic[selic.length - 1].valor}%`;
  
  if (isNaN(saldoInicial) || saldoInicial <= 0) {
    document.getElementById("resultado").innerText = `Começando sem saldo inicial guardando ${saldoMensal} por mês durante ${anos} anos, você terá R$${parseFloat(saldo).toFixed(2).replace('.', ',')} tendo guardado R$${parseFloat(guardou).toFixed(2).replace('.', ',')} e rendido R$${parseFloat(rendeu).toFixed(2).replace('.', ',')}`;
  } else {
    document.getElementById("resultado").innerText = `Começando com R$${parseFloat(saldoInicial).toFixed(2).replace('.', ',')} guardando ${saldoMensal} por mês, durante ${anos} anos você terá R$${parseFloat(saldo).toFixed(2).replace('.', ',')} tendo guardado R$${parseFloat(guardou).toFixed(2).replace('.', ',')} e rendido R$${parseFloat(rendeu).toFixed(2).replace('.', ',')}`;

  }
}