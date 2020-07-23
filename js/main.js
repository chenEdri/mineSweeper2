'use strict';

//CONST VARIABLES

const MINE = '💣';
const BLOWMINE = '💥';
const FLAG = '🚩';
const EMPTY = ' ';
const STARTSMILEY = '🧔'
const WINSMILEY = '🦸‍♂️'
const BLOWUPSMILEY = '🤦‍♂️'

// GLOBAL VARIABLES
var gSmiley = null;
var gCountLifes = null;
var gField;
var gSizeOfEdge = null;
var gGame = null;
var gLevel = {
    size: 4,
    mines: 2
}


// LOADDING FUNCTIONS

function init(diff, NumOfMines) {
    startSmiley();
    resetTime();
    document.querySelector('.modal').style.display = 'none';
    resetLifes();
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    if (diff === undefined) {
        gLevel = {
            size: 4,
            mines: 2
        }
        creatField(gLevel.size, gLevel.mines);
    } else {
        gLevel = {
            size: diff,
            mines: NumOfMines
        }
        creatField(gLevel.size, gLevel.mines);
    }
    renderField();
}


function creatField(diff, NumOfMines) {
    creatBoard(diff);
    getMinesOnBoard(NumOfMines);
    for (var i = 0; i < gSizeOfEdge; i++) {
        for (var j = 0; j < gSizeOfEdge; j++) {
            var pos = { i: i, j: j };
            if (gField[i][j] === MINE) continue;
            gField[i][j].minesAroundCount = setMinesNegsCount(gField, pos);
        }
    }
}

function renderField() {
    if (!gGame.isOn) { return };
    var htmlStr = '';
    for (var i = 0; i < gSizeOfEdge; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < gSizeOfEdge; j++) {
            var item = ' ';
            if (gField[i][j].isShown || gField[i][j].isMarked) {
                if (gField[i][j].isMarked === true) {
                    item = FLAG;
                } else if (gField[i][j].isMine === true) {
                    item = MINE;
                } else if (gField[i][j].minesAroundCount !== 0) {
                    item = gField[i][j].minesAroundCount;
                } else {
                    item = EMPTY;
                }
            }
            var className = (item + '');
            var bgc ='';
            if(gField[i][j].isShown) bgc+= 'cell2';
            else bgc += 'cell';
            className += `cell-${i}-${j}`
            htmlStr += `<td class = "${bgc} ${className}" onclick = "cellClicked(this , ${i}, ${j})" data-i = "${i}" data-j = "${j}"  
            oncontextmenu="cellMarked(${i},${j})" data-i = "${i}" data-j = "${j}">${item}</td>`;
        }
        htmlStr += '</tr>';
    }
    var elTable = document.querySelector('.field');
    elTable.innerHTML = htmlStr;
    console.table(gField);
}


function getMinesOnBoard(NumOfMines) {
    while (NumOfMines !== 0) {
        var idx1 = getInexlusiveRandomNum(gSizeOfEdge - 1, 0);
        var idx2 = getInexlusiveRandomNum(gSizeOfEdge - 1, 0);
        if (gField[idx1][idx2].isMine) {
            continue;
        } else {
            gField[idx1][idx2].isMine = true;
            NumOfMines--;
        }
    }
}

function setMinesNegsCount(field, pos) {
    var count = 0;
    for (var i = pos.i - 1; i <= pos.i + 1 ; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1 ; j++) {
            if (i === pos.i && j === pos.j) continue;
            if (!checkIfInfield(field, { i: i, j: j })) continue;
            if (field[i][j].isMine === true) count++;
        }
    }
    return count;
}


function creatBoard(diff) {
    gField = [];
    gSizeOfEdge = diff;
    for (var i = 0; i < gSizeOfEdge; i++) {
        gField[i] = [];
        for (var j = 0; j < gSizeOfEdge; j++) {
            gField[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                // isHint: true
            };
        }
    }
}



