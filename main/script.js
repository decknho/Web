// Tic-Tac-Toe Game Script
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellPlayed(cellIndex) {
    board[cellIndex] = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function handleResultValidation() {
    if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
        gameActive = false;
    } else if (checkDraw()) {
        alert('Game is a draw!');
        gameActive = false;
    }
}

function handleCellClick(cellIndex) {
    if (board[cellIndex] !== '' || !gameActive) return;

    handleCellPlayed(cellIndex);
    handleResultValidation();

    if (gameActive) {
        handlePlayerChange();
    }
}

function restartGame() {
    board.fill('');
    currentPlayer = 'X';
    gameActive = true;
    alert('Game restarted!');
}

// Example usage: Call handleCellClick(index) when a cell is clicked
// Call restartGame() to reset the game