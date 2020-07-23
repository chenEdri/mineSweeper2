'use strict';
var gTime = 0;
var gLifePic = 3;

function checkIfInfield(field, pos) {
    return (pos.i >= 0 && pos.i < gSizeOfEdge &&
        pos.j >= 0 && pos.j < gSizeOfEdge);
}

function getInexlusiveRandomNum(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.oncontextmenu = function () {
    return false;     // cancel default menu
}

function uploadModal(msg) {
    document.querySelector('.modal').style.display = 'block';
    document.querySelector('.modal h2').innerText = msg;
    clearTimeout(gTimeOut);
}

function resetTime() {
    gTime = 0;
    var elTime = document.querySelector('.timer');
    elTime.innerText = 'Time: ';
}


function timer() {
    gTime += 0.33;
    var elTime = document.querySelector('.timer');
    elTime.innerText = 'Time: ' + gTime.toFixed(2);
}

function startSmiley() {
    gSmiley = document.querySelector('.smiley');
    gSmiley.innerText = STARTSMILEY;
}

function resetLifes() {
    gCountLifes = 3;
    var elLife = document.querySelector('.lifes');
    // elLife.style.display= '';
}

function takeLifePicOut(num){
    if(num === 3){
    var elLife = document.querySelector('.lifes3');
    console.log('elLife',elLife);
    elLife.style.display = 'none';
    }else if(num === 2){
        var elLife = document.querySelector('.lifes2');
        console.log('elLife',elLife);
        elLife.style.display = 'none';
    }else{
        var elLife = document.querySelector('.lifes1');
        console.log('elLife',elLife);
        elLife.style.display = 'none';
    }
}

function changeMinesToBombs(){
    var htmlStr = '';
    for (var i = 0; i < gSizeOfEdge; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < gSizeOfEdge; j++) {
            var item = ' ';
            if (gField[i][j].isMine) {
                item = BLOWMINE;
                gField[i][j].isShown = true;
            } else if (!gField[i][j].isShown || gField[i][j].isMarked) {
                if (gField[i][j].isMarked === true) {
                    item = FLAG;
                } else if (gField[i][j].minesAroundCount !== 0) {
                    item = gField[i][j].minesAroundCount;
                } else {
                    item = EMPTY;
                }
            }
            var className = (item + '');
            var bgc = '';
            if (gField[i][j].isShown) bgc += 'cell2';
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