console.log("The script is running")

const GameController = function(name1, name2) {
    const domBoard = document.querySelector(".board");
    const playerO = name1;
    const playerX = name2;
    let moves = 0;
    let turn = 'O';
    let win = '';
    const board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

    function redrawDom() {
        domBoard.replaceChildren();
        for (let i = 0; i < board.length; ++i) {
            for (let j = 0; j < board[i].length; ++j) {
                const newChild = document.createElement("button");
                if (board[i][j] != ' ' || win != '') {
                    newChild.setAttribute("disabled", "");
                } else {
                    newChild.addEventListener("click", () => {
                        makeMove(i, j);
                        redrawDom();
                    })
                }
                newChild.textContent = board[i][j];
                domBoard.appendChild(newChild);
            }
        }
    }

    function toString() {
        let res = '';
        for (let i = 0; i < board.length; ++i) {
            for (let j = 0; j < board[i].length; ++j) {
                res += board[i][j];
            }
            res += '\n';
        }
        return res;
    }

    function checkWin() {
        let mark = ' ';
        for (let i = 0; i < board.length; ++i) {
            mark = board[i][0];
            if (mark != ' ' && mark == board[i][1] && mark == board[i][2]) {
                return mark;
            }
        }
        for (let i = 0; i < board[0].length; ++i) {
            mark = board[0][i];
            if (mark != ' ' && mark == board[1][i] && mark == board[2][i]) {
                return mark;
            }
        }
        mark = board[1][1];
        if (mark != ' ') {
            if (mark == board[0][0] && mark == board[2][2]) {
                return mark;
            }
            if (mark == board[0][2] && mark == board[2][0]) {
                return mark;
            }
        }
        if (moves == 9) {
            return ' ';
        }
        return '';
    }

    function makeMove(x, y) {
        if (win != '') {
            return;
        }
        if (x < 0 || x > 2 || y < 0 || y > 2) {
            return;
        }
        if (board[x][y] != ' ') {
            return;
        }
        board[x][y] = turn;
        if (turn == 'O') {
            turn = 'X';
        } else {
            turn = 'O';
        }
        ++moves;
        win = checkWin();
        if (win != '') {
            if (win == ' ') {
                console.log("Nobody wins");
            } else if (win == 'O') {
                console.log(`${playerO} wins`);
            } else {
                console.log(`${playerX} wins`);
            }
            console.log(toString());
        }
    }

    function clear() {
        for (let i = 0; i < board.length; ++i) {
            for (let j = 0; j < board[i].length; ++j) {
                board[i][j] = ' ';
            }
        }
        turn = 'O';
        moves = 0;
        win = '';
    }

    redrawDom();
    return {
        toString,
        makeMove,
        clear
    }
};

GameController("A", "B");
