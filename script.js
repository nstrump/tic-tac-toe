let currPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const statDisplay = document.querySelector('.game-status');
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

const winMsg = () => `${currPlayer} has won!`;
const drawMsg = () => `The game has ended in a draw!`;
const playerMsg = () => `It's ${currPlayer}'s turn!`;

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', clickCell));
document.querySelector('.game-reset').addEventListener('click', gameReset);

function clickCell(clickCellTarget) {
    const clickedCell = clickCellTarget.target;
    const clickedCellIdx = clickedCell.getAttribute('data-cell-index');

    if (!gameActive || clickedCell.innerHTML !== '') {
        return;
    }

    updateCell(clickedCell, clickedCellIdx);
    validateResults();
}

function updateCell(clickedCell, clickedCellIdx) {
    clickedCell.innerHTML = currPlayer;
    gameState[clickedCellIdx] = currPlayer;
}

function validateResults() {
    let gameWon = false;
    for (let i=0; i <= 7; i++) {
        let winningSet = winCombos[i];
        let a = gameState[winningSet[0]];
        let b = gameState[winningSet[1]];
        let c = gameState[winningSet[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b & b === c) {
            gameWon = true;
            break;
        }
    }
    if (gameWon) {
        gameActive = false;
        statDisplay.innerHTML = winMsg();
        return;
    }
    if (!gameState.includes("")) {
        gameActive = false;
        statDisplay.innerHTML = drawMsg();
        return;
    }
    changePlayer();
}

function changePlayer() {
    currPlayer = currPlayer === "X" ? "O" : "X";
    statDisplay.innerHTML = playerMsg();
}

function gameReset() {
    currPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statDisplay.innerHTML = "";
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}