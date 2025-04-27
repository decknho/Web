function gerar_senha() {
    var senha = "";
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    var tamanho = 12; // Tamanho da senha

    for (var i = 0; i < tamanho; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    document.getElementById("senha-gerada").innerText = "Senha gerada: " + senha;
}