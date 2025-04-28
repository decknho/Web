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
    
    const saldoMensal = parseFloat(100);
    const anos = parseInt(35);
    
    let saldoInicial = parseInt(5000);
    let saldo = saldoInicial;
    let meses = anos * 12;
    const porcentagemSelicMes = parseFloat(selic[selic.length - 1].valor) / 12;
    let contadorDeMes = 2;
    const guardou = saldoMensal * meses;
  
    while (meses !== 1) {
      saldo = saldo + saldoMensal + (saldo / 100 * porcentagemSelicMes);
      console.log(`${contadorDeMes}° MÊS R$${saldo.toFixed(2).replace('.', ',')}`);
      contadorDeMes++;
      meses--;
    }

    document.getElementById("valor_investido").innerText = `Seu saldo inicial foi de R$${saldoInicial.toFixed(2).replace('.', ',')} e você guardou R$${saldoMensal.toFixed(2).replace('.', ',')} por ${anos} anos`;
    document.getElementById("valor_selic").innerText = `${selic[selic.length - 1].data} | O valor do selic de ${mes[mes_extenso]} está em ${selic[selic.length - 1].valor}%`;
    document.getElementById("selic").innerText = `Você guardou R$${guardou.toFixed(2).replace('.', ',')} e rendeu R$${rendeu.toFixed(2).replace('.', ',')}`;
}