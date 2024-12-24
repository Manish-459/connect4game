// script.js

const ROWS = 6;
const COLS = 7;
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
let board = [];
let currentPlayer = 'red';

function createBoard() {
    board = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
    renderBoard();
}

function renderBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'empty');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const col = parseInt(event.target.dataset.col);
    const row = getEmptyRow(col);
    if (row !== null) {
        board[row][col] = currentPlayer;
        renderPiece(row, col);
        if (checkWin(row, col)) {
            showMessage(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`);
        } else {
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        }
    }
}

function renderPiece(row, col) {
    const cell = boardElement.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    cell.classList.remove('empty');
    cell.classList.add('piece', currentPlayer);
}

function getEmptyRow(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            return row;
        }
    }
    return null;
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) || // Vertical
        checkDirection(row, col, 0, 1) || // Horizontal
        checkDirection(row, col, 1, 1) || // Diagonal \
        checkDirection(row, col, 1, -1)   // Diagonal /
    );
}

function checkDirection(row, col, rowDelta, colDelta) {
    let count = 1;
    count += countPieces(row, col, rowDelta, colDelta);
    count += countPieces(row, col, -rowDelta, -colDelta);
    return count >= 4;
}

function countPieces(row, col, rowDelta, colDelta) {
    let count = 0;
    let r = row + rowDelta;
    let c = col + colDelta;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
        r += rowDelta;
        c += colDelta;
    }
    return count;
}

function showMessage(message) {
    messageElement.textContent = message;
    messageElement.classList.remove('hidden');
    setTimeout(() => {
        messageElement.classList.add('hidden');
        createBoard();
    }, 3000);
}

createBoard();
