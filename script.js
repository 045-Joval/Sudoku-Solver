let numSelected = null;
let tileSelected = null;
let board;

function generate9x9Array() {
    const array = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            row.push(0);
        }
        array.push(row);
    }
    return array;
}

window.onload = function() {
    setGame();
}

function setGame() {
    board=generate9x9Array();

    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }
    
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r + "-" + c;
            
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function clearBoard() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const id=r + "-" + c;
            const tile=document.getElementById(id);
            tile.classList.remove("tile-start");
            tile.innerText="";
            board[r][c]=0;
        }
    }
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        let x=parseInt(numSelected.id);

        if(isValid(r,c,x)) {
            this.innerText = x;
            board[r][c]=x;
            this.classList.add("tile-start");
        }
    }
}

function isValid(row, col, x) {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] == x) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] == x) return false;
    }

    // Check 3x3 sub-grid
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[boxRow + i][boxCol + j] == x) return false;
        }
    }

    return true;
}

function solve() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                for (let x = 1; x <= 9; x++) {
                    if (isValid(i, j, x)) {
                        board[i][j] = x;
                    
                        let tile=document.getElementById(i+"-"+j);
                        tile.innerText = x;

                        if (solve()) {
                            return true;
                        } else {
                            board[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveBoard() {
    solve();
    console.log(board);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const clearBtn = document.getElementById("clear");
    const solveBtn = document.getElementById("solve");

    solveBtn.addEventListener('click', solveBoard);
    clearBtn.addEventListener('click', clearBoard);
});
