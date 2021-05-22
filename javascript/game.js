const MINES = '💥';
const NORMAL = '😃';
const SAD_DEAD = '😵';
const WINNER = '😎';
const FLAG = '🚩';

var gBoard;
var gGame;
var gLevel = { SIZE: 4, MINES: 2 };
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gTimeInterval;


function initGame() {
    gBoard = buildBoard()
    plantMines(gLevel)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    randomCell()
    setInterval()
    clearInterval(gInterval)
    gInterval = null
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function randomCell() {
    var idxI = getRandomInt(0, gLevel.SIZE)
    var idxJ = getRandomInt(0, gLevel.SIZE)
    console.log('i', idxI, 'j', idxJ);
    return { idxI, idxJ }
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell;
        }
    }
    for (var i = 0; i < gLevel.MINES; i++) {
        var locationRandomCell = randomCell();
        board[locationRandomCell.idxI][locationRandomCell.idxJ].isMine = true;
    }

    return board
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellID = 'cell-' + i + '-' + j;
            strHTML += `<td id="${cellID}" class="cell"
            onclick="cellClicked(this,${i},${j})"
            oncontextmenu="cellMarked(event,this)"></td>`;
        }
        strHTML += '</tr>';
    }
    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;
}

function difficulty(mineNum, boardSize) {
    gLevel.SIZE = boardSize;
    gLevel.MINES = mineNum;
    gFlagCount = mineNum;
    initGame()
    console.log('hi');
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = {
                i,
                j
            }
            if (board[cell.i][cell.j].isMine === true) continue;
            for (var x = cell.i - 1; x <= cell.i + 1; x++) {
                if (x < 0 || x >= board.length) continue;
                for (var y = cell.j - 1; y <= cell.j + 1; y++) {
                    if (x === cell.i && y === cell.j) continue;
                    if (y < 0 || y >= board[x].length) continue;
                    if (board[x][y].isMine === true) {
                        board[cell.i][cell.j].minesAroundCount++
                    }
                }
            }
        }
    }
}

function cellClicked(elCell, i, j) {
    var currCell = gBoard[i][j];
    elCell.innerText = currCell.isMine ? MINES : currCell.minesAroundCount;
    gBoard[i][j].isShown = true
    console.log(gBoard[i][j].minesAroundCount);
}

function plantMines(gLevel) {

}

function cellMarked(elCell) {

}

function checkGameOver() {

}
