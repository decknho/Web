function gerar_senha() {
    var senha = "";
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    var tamanho = 12; // Tamanho da senha

    for (var i = 0; i < tamanho; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    document.getElementById("senhagerada").innerText = `Senha gerada | ` + senha + ` |`;
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

  const ssaldoInicial = document.getElementById("inicial").value;
  const ssaldoMensal = document.getElementById("mes").value;
  const aanos = document.getElementById("anos").value;
  const saldoInicial = parseFloat(ssaldoInicial);
  const saldoMensal = parseFloat(ssaldoMensal);
  const anos = parseInt(aanos);
  if ((ssaldoMensal <= "0") && (ssaldoInicial <= "0") && (aanos <= "0")) {
    document.getElementById("resultado").innerText = `Preencha todos os campos corretamente!`;
    return;
  }
  let saldo = saldoInicial;
  let meses = anos * 12;
  const porcentagemSelicMes = parseFloat(selic[selic.length - 1].valor) / 12;
  let contadorDeMes = 0;
  const guardou = saldo + saldoMensal * meses;

  while (meses !== 0) {
    saldo = saldo + saldoMensal + (porcentagemSelicMes / 100 * saldo);
    contadorDeMes++;
    meses--;
  }

  const rendeu = saldo - guardou;
  if (anos == 1) {
    if ((isNaN(saldoInicial) || saldoInicial <= 0) && saldoMensal > 0 && anos > 0) {
      document.getElementById("info").innerText = `Na data de ${selic[selic.length - 1].data} | O valor do selic de ${mes[mes_extenso]} está em ${selic[selic.length - 1].valor}%`;
      document.getElementById("resultado").innerText = `Começando sem saldo inicial guardando R$${saldoMensal} por mês durante ${anos} ano, você terá R$${parseFloat(saldo).toFixed(2).replace('.', ',')} (tendo guardado R$${parseFloat(guardou).toFixed(2).replace('.', ',')} mais os juros de R$${parseFloat(rendeu).toFixed(2).replace('.', ',')})`;
    } else if ((isNaN(saldoInicial) || saldoInicial <= 0) && (isNaN(saldoMensal) || saldoMensal <= 0) && anos > 0){
      document.getElementById("resultado").innerText = `Independente do de quantos ano você colocar, você não terá nada se os valores anteriores forem zero!`;
    } else if (isNaN(anos) || anos <= 0 && saldoInicial > 0 && saldoMensal > 0) {
      document.getElementById("resultado").innerText = `Preencha todos os campos corretamente!`;
    } else if (saldoInicial > 0 && isNaN(saldoMensal) || saldoMensal <= 0 && anos > 0) {
      document.getElementById("info").innerText = `Na data de ${selic[selic.length - 1].data} | O valor do selic de ${mes[mes_extenso]} está em ${selic[selic.length - 1].valor}%`;
      document.getElementById("resultado").innerText = `Começando com R$${parseFloat(saldoInicial).toFixed(2).replace('.', ',')} sem guardar nada mensalmente em ${anos} ano, você terá R$${parseFloat(saldo).toFixed(2).replace('.', ',')} (tendo guardado R$${parseFloat(guardou).toFixed(2).replace('.', ',')} mais os juros de R$${parseFloat(rendeu).toFixed(2).replace('.', ',')})`;
    } else {
      document.getElementById("info").innerText = `Na data de ${selic[selic.length - 1].data} | O valor do selic de ${mes[mes_extenso]} está em ${selic[selic.length - 1].valor}%`;
      document.getElementById("resultado").innerText = `Começando com R$${parseFloat(saldoInicial).toFixed(2).replace('.', ',')} guardando R$${saldoMensal} por mês, durante ${anos} ano você terá R$${parseFloat(saldo).toFixed(2).replace('.', ',')} (tendo guardado R$${parseFloat(guardou).toFixed(2).replace('.', ',')} mais os juros de R$${parseFloat(rendeu).toFixed(2).replace('.', ',')})`;
    }
  } else {
    if ((isNaN(saldoInicial) || saldoInicial <= 0) && saldoMensal > 0 && anos > 0) {
      document.getElementById("info").innerText = `Na data de ${selic[selic.length - 1].data} | O valor do selic de ${mes[mes_extenso]} está em ${selic[selic.length - 1].valor}%`;
      document.getElementById("resultado").innerText = `Começando sem saldo inicial guardando R$${saldoMensal} por mês durante ${anos} anos, você terá R$${parseFloat(saldo).toFixed(2).replace('.', ',')} (tendo guardado R$${parseFloat(guardou).toFixed(2).replace('.', ',')} mais os juros de R$${parseFloat(rendeu).toFixed(2).replace('.', ',')})`;
    } else if ((isNaN(saldoInicial) || saldoInicial <= 0) && (isNaN(saldoMensal) || saldoMensal <= 0) && anos > 0){
      document.getElementById("resultado").innerText = `Independente do de quantos anos você colocar, você não terá nada se os valores anteriores forem zero!`;
    } else if (isNaN(anos) || anos <= 0 && saldoInicial > 0 && saldoMensal > 0) {
      document.getElementById("resultado").innerText = `Preencha todos os campos corretamente!`;
    } else if (saldoInicial > 0 && isNaN(saldoMensal) || saldoMensal <= 0 && anos > 0) {
      document.getElementById("info").innerText = `Na data de ${selic[selic.length - 1].data} | O valor do selic de ${mes[mes_extenso]} está em ${selic[selic.length - 1].valor}%`;
      document.getElementById("resultado").innerText = `Começando com R$${parseFloat(saldoInicial).toFixed(2).replace('.', ',')} sem guardar nada mensalmente em ${anos} anos, você terá R$${parseFloat(saldo).toFixed(2).replace('.', ',')} (tendo guardado R$${parseFloat(guardou).toFixed(2).replace('.', ',')} mais os juros de R$${parseFloat(rendeu).toFixed(2).replace('.', ',')})`;
    } else {
      document.getElementById("info").innerText = `Na data de ${selic[selic.length - 1].data} | O valor do selic de ${mes[mes_extenso]} está em ${selic[selic.length - 1].valor}%`;
      document.getElementById("resultado").innerText = `Começando com R$${parseFloat(saldoInicial).toFixed(2).replace('.', ',')} guardando R$${saldoMensal} por mês, durante ${anos} anos você terá R$${parseFloat(saldo).toFixed(2).replace('.', ',')} (tendo guardado R$${parseFloat(guardou).toFixed(2).replace('.', ',')} mais os juros de R$${parseFloat(rendeu).toFixed(2).replace('.', ',')})`;
    }
  }

}


function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

