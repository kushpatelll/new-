let gridSize = 5;
let mineCount = 3;
let safeCount = 0;
let minePositions = [];
let gameBoard = document.getElementById('grid');
let gameStatus = document.getElementById('gameStatus');
let startButton = document.getElementById('startBtn');
let safeTiles = document.getElementById('safeTiles');

startButton.addEventListener('click', startGame);

function startGame() {
    resetGame();
    generateMines();
    createGrid();
}

function resetGame() {
    minePositions = [];
    safeCount = 0;
    gameStatus.textContent = "Playing";
    safeTiles.textContent = safeCount;
    gameBoard.innerHTML = "";
}

function generateMines() {
    while (minePositions.length < mineCount) {
        let randomTile = Math.floor(Math.random() * gridSize * gridSize);
        if (!minePositions.includes(randomTile)) {
            minePositions.push(randomTile);
        }
    }
}

function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.index = i;
        tile.addEventListener('click', revealTile);
        gameBoard.appendChild(tile);
    }
}

function revealTile(e) {
    if (gameStatus.textContent === "Game Over") return;

    let tile = e.target;
    let tileIndex = parseInt(tile.dataset.index);

    if (minePositions.includes(tileIndex)) {
        tile.classList.add('mine');
        gameStatus.textContent = "Game Over";
        revealAllMines();
    } else {
        tile.classList.add('revealed', 'safe');
        safeCount++;
        safeTiles.textContent = safeCount;

        if (safeCount === (gridSize * gridSize - mineCount)) {
            gameStatus.textContent = "You Win!";
        }
    }
}

function revealAllMines() {
    let tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        let tileIndex = parseInt(tile.dataset.index);
        if (minePositions.includes(tileIndex)) {
            tile.classList.add('mine');
        }
    });
}
