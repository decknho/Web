// Tic-Tac-Toe Game Script
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const condicoesDeVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function jogarNaCelula(indiceCelula) {
    tabuleiro[indiceCelula] = jogadorAtual;
}

function mudarJogador() {
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
}

function verificarVencedor() {
    for (let condicao of condicoesDeVitoria) {
        const [a, b, c] = condicao;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return true;
        }
    }
    return false;
}

function verificarEmpate() {
    return tabuleiro.every(celula => celula !== '');
}

function validarResultado() {
    if (verificarVencedor()) {
        alert(`Jogador ${jogadorAtual} venceu!`);
        jogoAtivo = false;
    } else if (verificarEmpate()) {
        alert('O jogo empatou!');
        jogoAtivo = false;
    }
}

function clicarNaCelula(indiceCelula) {
    if (tabuleiro[indiceCelula] !== '' || !jogoAtivo) return;

    jogarNaCelula(indiceCelula);
    validarResultado();

    if (jogoAtivo) {
        mudarJogador();
    }
}

function reiniciarJogo() {
    tabuleiro.fill('');
    jogadorAtual = 'X';
    jogoAtivo = true;
    alert('Jogo reiniciado!');
}

// Exemplo de uso: Chame clicarNaCelula(indice) quando uma célula for clicada
// Chame reiniciarJogo() para reiniciar o jogo