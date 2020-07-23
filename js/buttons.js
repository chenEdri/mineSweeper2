'use strict';
var gCellClueInterval = null;
var gSpecialClick = 0;


function hint(elCell) {
    if (elCell.style.boxShadow === 'rgba(174, 232, 235, 0.4) 14px 14px 5px 0px') return;
    else {
        elCell.style.boxShadow = '14px 14px 5px 0px rgba(174,232,235,0.4)';
        elCell.style.cursor = 'none';
        gSpecialClick++;
        console.log('gspecialclick in hint', gSpecialClick);
    }
}

function hintIsActivated(){
    console.log('hintisactive');
for (var i = (pos.i - 1); i <= (pos.i + 1); i++) {
    for (var j = (pos.j - 1); j <= (pos.j + 1); j++) {
        if (!checkIfInfield(gField, { i: i, j: j })) continue;
        if (gField[i][j].isShown){
            gField[i][j].isHint = false;
        }
        gField[i][j].isShown = true;
    }
}
renderField();
setTimeout(function () {
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (!checkIfInfield(gField, { i: i, j: j })) continue;
            if(gField[i][j].isHint === false) continue;
            gField[i][j].isShown = false;
        }
    }
    renderField();
}, 1000);
gSpecialClick--;
return;
}