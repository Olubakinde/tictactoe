var board;
var playerO = "O";
var playerX = "X";
var currentPlayer = playerO;
var gameOver = false;

window.onload = function() {
    setGame();
    document.getElementById("reset").addEventListener("click", restart);
}

function setGame(){
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    for (let r = 0; r < 3; r++){
        for (let i = 0; i < 3; i++){
            // <div></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + i.toString()
            tile.classList.add('tile');
            if (r == 0 || r == 1){
                tile.classList.add("horizontal-line");
            }
            if (i == 0 || i == 1){
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", setTile);
            document.getElementById("board").append(tile);
        }
    }
}

function setTile(){
    if (gameOver){
        return;
    }

    let cordinates = this.id.split("-"); //"1-1" --> ["1", "1"]

    let r = parseInt(cordinates[0])
    let c = parseInt(cordinates[1]);

    if (board[r][c] != ""){
        return;
    }

    board[r][c] = currentPlayer;
    this.innerText = currentPlayer;

    if (currentPlayer == playerO){
        currentPlayer = playerX;
    } else {
        currentPlayer = playerO;
    }
    
    checkWinner();
}

function checkWinner() {
    // check horizontally
    for (let r = 0; r < 3; r++){
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ''){
            for (let i = 0; i < 3; i++){
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }
    //check vertically
    for (let c = 0; c < 3; c++){
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ''){
            for (let i = 0; i < 3; i++){
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //check diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ''){
        for (let i = 0; i < 3; i++){
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    //check anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ""){
        let tile = document.getElementById("0-2");
        tile.classList.add("winner");

        tile = document.getElementById("1-1");
        tile.classList.add("winner");

        tile = document.getElementById("2-0");
        tile.classList.add("winner");
        
        gameOver = true;
        return;
    }
}

function restart() {
    // Clear the board array and reset UI
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let tiles = document.getElementsByClassName("tile");
    for (let tile of tiles) {
        tile.innerText = '';
        tile.classList.remove("winner");
    }

    gameOver = false;
    currentPlayer = playerO;
}
