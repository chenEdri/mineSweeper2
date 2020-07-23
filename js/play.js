'use strict';

var gTimeOut = null;
var gTimeInterval = null;

function cellClicked(elCell, i, j) {
    // check if gameover
    if (gGame.isOn === false) {
        return;
    }
    var dataset = elCell.dataset;
    var pos = { i: +dataset.i, j: +dataset.j };
    var cell = gField[pos.i][pos.j];

    // if hint buttom is played
    if (gSpecialClick !== 0) return hintIsActivated();

    // else all the other rules
    if (checkIfFirstClick() === true) {
        gTimeInterval = setInterval(timer, 333);
        firstClickPass(cell, pos);
    } else if (cell.isShown === false) {
        cell.isShown = true;
    }
    expandShown(gField, elCell, i, j);
    renderField();
    if (!checkGameOver(i, j)) {
        gGame.isOn = false;
    }
    return;
}

function cellMarked(i, j) {
    if (gGame.isOn === false) {
        return;
    }
    var cell = gField[i][j];
    if (cell.isShown && !cell.isMarked) return;
    if (!cell.isMarked) {
        cell.isMarked = true;
        gGame.markedCount++;
    } else {
        cell.isShown = false;
        cell.isMarked = false;
        gGame.markedCount--;
    }
    renderField();
    if (!checkGameOver(i, j)) {
        gGame.isOn = false;
    }
    return;
}

// first option:


function expandShown(field, elCell, i, j) {
    if (gGame.isOn === false) {
        return;
    }
    var dataset = elCell.dataset;
    var pos = { i: +dataset.i, j: +dataset.j };

    if (field[i][j].isMine) return;
    if (!field[i][j].isMine && field[i][j].minesAroundCount === 0) {  //if EMPTY open evrything around except mines
        for (var i = pos.i - 1; i <= pos.i + 1; i++) {
            for (var j = pos.j - 1; j <= pos.j + 1; j++) {
                if (i === pos.i && j === pos.j) continue;
                if (!checkIfInfield(field, { i: i, j: j })) continue;
                if (field[i][j].isMarked) continue;
                if (field[i][j].isMine !== true) {
                    field[i][j].isShown = true;
                }
            }
        }
        renderField();
    } else return; //if number open only the number
}
//if mine- open all mines around
// if (field[i][j].isMine) {
//     for (var i = pos.i - 1; i <= pos.i + 1; i++) {
//         for (var j = pos.j - 1; j <= pos.j + 1; j++) {
//             if (i === pos.i && j === pos.j) continue;
//             if (!checkIfInfield(field, { i: i, j: j })) continue;
//             if (field[i][j].isMarked) continue;
//             if (field[i][j].isMine) {
//                 field[i][j].isShown = true;
//             }
//         }
//     }
//     renderField();
// second option recursion:



// game-over function
function checkGameOver(idx1, idx2) {
    if (!gGame.isOn) return true;

    if ((!gField[idx1][idx2].isShown) && gField[idx1][idx2].isMarked && gField[idx1][idx2].isMine) {
        gLevel.mines--;
    }
    if (gLevel.mines === 0 && (checkOpenCells())) {
        clearInterval(gTimeInterval);
        gSmiley.innerText = WINSMILEY;
        setTimeout(function () {
            gTimeOut = uploadModal('YOU WON!');
        }, 1000);
        return false;
    } else if (gField[idx1][idx2].isShown && gField[idx1][idx2].isMine) {
        takeLifePicOut(gCountLifes);
        gCountLifes--;
        console.log('less life', gCountLifes);
        if (gCountLifes === 0) {
            clearInterval(gTimeInterval);
            gSmiley.innerText = BLOWUPSMILEY;
            changeMinesToBombs();
            gTimeOut = setTimeout(function () {
                uploadModal('GAME OVER!');
            }, 2000);
            return false;
        }
    }
    else if (checkOpenCells()) {
        setTimeout(function () {
            gTimeOut = uploadModal('DRAW');
        }, 1000);
        clearInterval(gTimeInterval);
        return false;
    }
    return true;
}

function checkOpenCells() {
    for (var i = 0; i < gSizeOfEdge; i++) {
        for (var j = 0; j < gSizeOfEdge; j++) {
            if (!gField[i][j].isShown && !gField[i][j].isMine) return false;
        }
    }
    return true;
}

function checkIfFirstClick() {
    for (var i = 0; i < gSizeOfEdge; i++) {
        for (var j = 0; j < gSizeOfEdge; j++) {
            if (gField[i][j].isShown) return false;
        }
    }
    return true;
}

function firstClickPass(cell, pos) {
    if (cell.isMine) {
        cell.isMine = false;
        cell.isShown = true;
        gField = changSmallFieldMinesCount(gField, pos);
        renderField();
    } else {
        cell.isShown = true;
    }
}

function changSmallFieldMinesCount(field, pos) {
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i === pos.i && j === pos.j) continue;
            if (checkIfInfield(gField, { i: i, j: j })) {
                field[i][j].minesAroundCount = setMinesNegsCount(field, { i: i, j: j });
            }
        }
    }
    return field;
}