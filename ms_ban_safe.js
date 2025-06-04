// ==UserScript==
// @name         Minesweeper.online Nexus Interface
// @namespace    http://tampermonkey.net/
// @version      2025-06-03
// @description  Nexus Interface for Minesweeper.online
// @author       You
// @match        *://minesweeper.online/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minesweeper.online
// @grant        none
// ==/UserScript==

// Do Not Touch This Structure
//  My Game Area
//  <div id="AreaBlock" class="pull-left">
//    <div id="cell_0_0" class="cell size24 hdn_closed" data-x="0" data-y="0"></div>
//    <div id="cell_1_0" class="cell size24 hdn_closed" data-x="1" data-y="0"></div>
//    <div id="cell_2_0" class="cell size24 hdn_closed hdn_flag" data-x="2" data-y="0"></div>
//    <div id="cell_3_0" class="cell size24 hdn_closed hdn_flag" data-x="3" data-y="0"></div>
//    <div id="cell_4_0" class="cell size24 hdn_opened hdn_type1" data-x="4" data-y="0"></div>
//    <div id="cell_5_0" class="cell size24 hdn_opened hdn_type0" data-x="5" data-y="0"></div>
//    <div id="cell_6_0" class="cell size24 hdn_opened hdn_type0" data-x="6" data-y="0"></div>
//    <div id="cell_7_0" class="cell size24 hdn_opened hdn_type0" data-x="7" data-y="0"></div>
//    <div id="cell_8_0" class="cell size24 hdn_opened hdn_type0" data-x="8" data-y="0"></div>
//    <div class="clear"></div>

//    <div id="cell_0_1" class="cell size24 hdn_opened hdn_type2" data-x="0" data-y="1"></div>
//    <div id="cell_1_1" class="cell size24 hdn_opened hdn_type2" data-x="1" data-y="1"></div>
//    <div id="cell_2_1" class="cell size24 hdn_opened hdn_type2" data-x="2" data-y="1"></div>
//    <div id="cell_3_1" class="cell size24 hdn_opened hdn_type1" data-x="3" data-y="1"></div>
//    <div id="cell_4_1" class="cell size24 hdn_opened hdn_type1" data-x="4" data-y="1"></div>
//    <div id="cell_5_1" class="cell size24 hdn_opened hdn_type0" data-x="5" data-y="1"></div>
//    <div id="cell_6_1" class="cell size24 hdn_opened hdn_type0" data-x="6" data-y="1"></div>
//    <div id="cell_7_1" class="cell size24 hdn_opened hdn_type0" data-x="7" data-y="1"></div>
//    <div id="cell_8_1" class="cell size24 hdn_opened hdn_type0" data-x="8" data-y="1"></div>
//    <div class="clear"></div>
//    ...
//  </div>


// Do Not Touch This Structure
//  My Opponent's Game Area
//  <div id="AreaBlock_g2" class="pull-left">
//      <div id="cell_0_0_g2" class="cell size28 hdn_opened hdn_type0" data-x="0" data-y="0"></div>
//      <div id="cell_1_0_g2" class="cell size28 hdn_opened hdn_type0" data-x="1" data-y="0"></div>
//      <div id="cell_2_0_g2" class="cell size28 hdn_opened hdn_type0" data-x="2" data-y="0"></div>
//      <div id="cell_3_0_g2" class="cell size28 hdn_opened hdn_type0" data-x="3" data-y="0"></div>
//      <div id="cell_4_0_g2" class="cell size28 hdn_opened hdn_type1" data-x="4" data-y="0"></div>
//      <div id="cell_5_0_g2" class="cell size28 hdn_closed hdn_flag" data-x="5" data-y="0"></div>
//      <div id="cell_6_0_g2" class="cell size28 hdn_opened hdn_type2" data-x="6" data-y="0"></div>
//      <div id="cell_7_0_g2" class="cell size28 hdn_closed hdn_flag" data-x="7" data-y="0"></div>
//      <div id="cell_8_0_g2" class="cell size28 hdn_opened hdn_type2" data-x="8" data-y="0"></div>
//      <div id="cell_9_0_g2" class="cell size28 hdn_opened hdn_type1" data-x="9" data-y="0"></div>
//      <div id="cell_10_0_g2" class="cell size28 hdn_opened hdn_type0" data-x="10" data-y="0"></div>
//      <div id="cell_11_0_g2" class="cell size28 hdn_opened hdn_type0" data-x="11" data-y="0"></div>
//      <div id="cell_12_0_g2" class="cell size28 hdn_opened hdn_type1" data-x="12" data-y="0"></div>
//      <div id="cell_13_0_g2" class="cell size28 hdn_opened hdn_type2" data-x="13" data-y="0"></div>
//      <div id="cell_14_0_g2" class="cell size28 hdn_opened hdn_type3" data-x="14" data-y="0"></div>
//      <div id="cell_15_0_g2" class="cell size28 hdn_opened hdn_type2" data-x="15" data-y="0"></div>
//      <div class="clear"></div>
//      <div id="cell_0_1_g2" class="cell size28 hdn_opened hdn_type1" data-x="0" data-y="1"></div>
//      <div id="cell_1_1_g2" class="cell size28 hdn_opened hdn_type1" data-x="1" data-y="1"></div>
//      <div id="cell_2_1_g2" class="cell size28 hdn_opened hdn_type0" data-x="2" data-y="1"></div>
//      <div id="cell_3_1_g2" class="cell size28 hdn_opened hdn_type1" data-x="3" data-y="1"></div>
//      <div id="cell_4_1_g2" class="cell size28 hdn_opened hdn_type3" data-x="4" data-y="1"></div>
//      <div id="cell_5_1_g2" class="cell size28 hdn_opened hdn_type3" data-x="5" data-y="1"></div>
//      <div id="cell_6_1_g2" class="cell size28 hdn_opened hdn_type3" data-x="6" data-y="1"></div>
//      <div id="cell_7_1_g2" class="cell size28 hdn_opened hdn_type2" data-x="7" data-y="1"></div>
//      <div id="cell_8_1_g2" class="cell size28 hdn_closed hdn_flag" data-x="8" data-y="1"></div>
//      <div id="cell_9_1_g2" class="cell size28 hdn_opened hdn_type1" data-x="9" data-y="1"></div>
//      <div id="cell_10_1_g2" class="cell size28 hdn_opened hdn_type0" data-x="10" data-y="1"></div>
//      <div id="cell_11_1_g2" class="cell size28 hdn_opened hdn_type1" data-x="11" data-y="1"></div>
//      <div id="cell_12_1_g2" class="cell size28 hdn_opened hdn_type2" data-x="12" data-y="1"></div>
//      <div id="cell_13_1_g2" class="cell size28 hdn_closed hdn_flag" data-x="13" data-y="1"></div>
//      <div id="cell_14_1_g2" class="cell size28 hdn_closed hdn_flag" data-x="14" data-y="1"></div>
//      <div id="cell_15_1_g2" class="cell size28 hdn_closed hdn_flag" data-x="15" data-y="1"></div>
//      <div class="clear"></div>



(function() {
    'use strict';

    let g2_usage = true;

    function changeStyle(el, button) {
        if (button === 0) { // change cell style into red
            el.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
            el.style.border = '2px solid red';
            el.style.zIndex = '1000';
        } else { // change cell style into green
            el.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
            el.style.border = '2px solid green';
            el.style.zIndex = '1000';
        }
    }

    function initializeInterface() {
        const interfaceContainer = document.createElement('div');
        interfaceContainer.innerHTML = `
            <style>
                .nexus-interface {
                    position: fixed;
                    left: 10px;
                    bottom: 100px;
                    z-index: 999;
                    display: flex;
                    flex-direction: column;
                    font-family: 'Tahoma', sans-serif;
                    font-size: 13px;
                    color: #e0e0e0;
                    width: 260px;
                    user-select: none;
                    border: 1px solid #1a3a5a;
                    background: rgba(15, 15, 30, 0.9);
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
                    border-radius: 5px;
                    overflow: hidden;
                }
                .nexus-interface-content {
                    padding: 10px;
                }
                button {
                    background: #1a3a5a;
                    color: #e0e0e0;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 5px;
                    margin: 5px;
                    cursor: pointer;
                }
                button:hover {
                    background: #2a4a6a;
                }
            </style>
            <div class="nexus-interface">
                <button id="areaBlock"> Area Block </button>
                <button id="areaBlock_g2"> Area Block G2 </button>
                <button id="toggle_g2"> Toggle G2 Usage </button>
                <button id="solve"> Solve </button>
            </div>
        `;
        document.body.appendChild(interfaceContainer);

        document.getElementById('areaBlock').addEventListener('click', () => {
            const areaBlock = document.getElementById('AreaBlock');
            if (areaBlock) {
                const areaBlockMatrix = interpretAreaBlock(areaBlock);
                console.log(areaBlockMatrix);
            }
        });

        document.getElementById('areaBlock_g2').addEventListener('click', () => {
            const areaBlock = document.getElementById('AreaBlock_g2');
            if (areaBlock) {
                const areaBlockMatrix = interpretOpponentAreaBlock(areaBlock);
                console.log(areaBlockMatrix);
            }
        });

        document.getElementById('toggle_g2').addEventListener('click', () => {
            g2_usage = !g2_usage;
        });

        document.getElementById('solve').addEventListener('click', () => {
            const areaBlock = document.getElementById('AreaBlock');
            if (areaBlock) {
                const areaBlockMatrix = interpretAreaBlock(areaBlock);
                solveAreaBlock(areaBlockMatrix);
            }
        });
    }

    function interpretAreaBlock(areaBlock) {
        if (!areaBlock) return null;

        const cells = areaBlock.querySelectorAll('.cell');
        let maxRow = 0, maxCol = 0;

        cells.forEach(cell => {
            const [cellStr, colStr, rowStr] = cell.id.split('_');
            const row = parseInt(rowStr, 10);
            const col = parseInt(colStr, 10);
            if (row > maxRow) maxRow = row;
            if (col > maxCol) maxCol = col;
        });

        maxRow++;
        maxCol++;

        const cellsArray = Array.from(cells);
        const areaBlockMatrix = Array(maxRow).fill().map(() => Array(maxCol).fill(0));

        for (let i = 0; i < maxRow; i++) {
            for (let j = 0; j < maxCol; j++) {
                const cell = cellsArray[i * maxCol + j];
                if (!cell) continue;
                if (cell.classList.contains('hdn_closed')) {
                    if (cell.classList.contains('hdn_flag')) {
                        areaBlockMatrix[i][j] = 'X';
                    } else {
                        areaBlockMatrix[i][j] = -1;
                    }
                } else if (cell.classList.contains('hdn_opened')) {
                    for (let k = 0; k < maxCol; k++) {
                        if (cell.classList.contains(`hdn_type${k}`)) {
                            areaBlockMatrix[i][j] = k;
                            break;
                        }
                    }
                }
            }
        }
        return areaBlockMatrix;
    }

    function interpretOpponentAreaBlock(areaBlock) {
        if (!areaBlock) return null;

        const cells = areaBlock.querySelectorAll('.cell');
        let maxRow = 0, maxCol = 0;

        cells.forEach(cell => {
            const [cellStr, colStr, rowStr] = cell.id.split('_');
            const row = parseInt(rowStr, 10);
            const col = parseInt(colStr, 10);
            if (row > maxRow) maxRow = row;
            if (col > maxCol) maxCol = col;
        });

        maxRow++;
        maxCol++;

        const cellsArray = Array.from(cells);
        const areaBlockMatrix = Array(maxRow).fill().map(() => Array(maxCol).fill(0));

        for (let i = 0; i < maxRow; i++) {
            for (let j = 0; j < maxCol; j++) {
                const cell = cellsArray[i * maxCol + j];
                if (!cell) continue;
                if (cell.id.includes('g2')) {
                    if (cell.classList.contains('hdn_closed')) {
                        if (cell.classList.contains('hdn_flag')) {
                            areaBlockMatrix[i][j] = 'X';
                        } else {
                            areaBlockMatrix[i][j] = -1;
                        }
                    } else if (cell.classList.contains('hdn_opened')) {
                        for (let k = 0; k < maxCol; k++) {
                            if (cell.classList.contains(`hdn_type${k}`)) {
                                areaBlockMatrix[i][j] = k;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return areaBlockMatrix;
    }

    function countHiddenAround(areaBlockMatrix, i, j) {
        if (!areaBlockMatrix || i < 0 || j < 0 || i >= areaBlockMatrix.length || j >= areaBlockMatrix[0].length) {
            return { hiddenCount: 0, minesCount: 0 };
        }
        const height = areaBlockMatrix.length;
        const width = areaBlockMatrix[0].length;
        let hiddenCount = 0;
        let minesCount = 0;
        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                const newI = i + k;
                const newJ = j + l;
                if (newI < 0 || newI >= height || newJ < 0 || newJ >= width) continue;
                if (areaBlockMatrix[newI][newJ] === -1) {
                    hiddenCount++;
                } else if (areaBlockMatrix[newI][newJ] === 'X') {
                    minesCount++;
                }
            }
        }
        return { hiddenCount, minesCount };
    }

    function changeStyleCellsAround(areaBlockMatrix, i, j, flag) {
        if (!areaBlockMatrix || i < 0 || j < 0 || i >= areaBlockMatrix.length || j >= areaBlockMatrix[0].length) return;
        const height = areaBlockMatrix.length;
        const width = areaBlockMatrix[0].length;
        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                const newI = i + k;
                const newJ = j + l;
                if (newI >= 0 && newI < height && newJ >= 0 && newJ < width) {
                    if (areaBlockMatrix[newI][newJ] === -1) {
                        const cell = document.querySelector(`#cell_${newJ}_${newI}`);
                        if (cell) {
                            changeStyle(cell, flag ? 2 : 0);
                        }
                    }
                }
            }
        }
    }

    function advancedDeductions(area) {
        const H = area.length, W = area[0].length, MAX = 8;

        /* 1) collecte des équations (“numéro” → inconnues, mines restantes) */
        const eqs = [];
        for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
            const v = area[r][c];
            if (v <= 0) continue;
            const unknown = [], flags = [];
            for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
                if (!dr && !dc) continue;
                const nr = r + dr, nc = c + dc;
                if (nr < 0 || nr >= H || nc < 0 || nc >= W) continue;
                const n = area[nr][nc];
                if (n === -1) unknown.push([nr, nc]);
                else if (n === 'X') flags.push([nr, nc]);
            }
            const rest = v - flags.length;
            if (unknown.length && rest >= 0)
                eqs.push({ cells: unknown, mines: rest });
        }
        if (!eqs.length) return;

        /* 2) génère des groupes de taille ≤ MAX : (i) chaque équation seule,
            (ii) union de deux équations si ça tient dans MAX.             */
        const groupKeys = new Set();                 // évite doublons
        const groups = [];

        const pushGroup = (cellsArr) => {
            if (cellsArr.length === 0 || cellsArr.length > MAX) return;
            const key = cellsArr.map(([r, c]) => `${r}_${c}`).sort().join('|');
            if (groupKeys.has(key)) return;
            groupKeys.add(key);
            groups.push(cellsArr);
        };

        eqs.forEach(eq => pushGroup(eq.cells));

        for (let i = 0; i < eqs.length; i++) {
            for (let j = i + 1; j < eqs.length; j++) {
                const union = [...eqs[i].cells, ...eqs[j].cells];
                /* retire doublons */
                const uniq = [];
                const seen = new Set();
                union.forEach(([r, c]) => {
                    const k = `${r}_${c}`;
                    if (!seen.has(k)) { uniq.push([r, c]); seen.add(k); }
                });
                pushGroup(uniq);
            }
        }

        /* 3) énumération sur chaque groupe */
        const sureMine = new Set(), sureSafe = new Set();

        groups.forEach(group => {
            const n = group.length;
            const idx = new Map(group.map((p, i) => [`${p[0]}_${p[1]}`, i]));
            const allMine = Array(n).fill(true), allSafe = Array(n).fill(true);

            outer: for (let mask = 0; mask < (1 << n); mask++) {
                for (const { cells, mines } of eqs) {
                    /* compte mines assignées À L’INTÉRIEUR du groupe       */
                    let inside = 0, outsideUnknown = 0;
                    cells.forEach(([r, c]) => {
                        const k = `${r}_${c}`;
                        if (idx.has(k)) {
                            if (mask & (1 << idx.get(k))) inside++;
                        } else {
                            if (area[r][c] === -1) outsideUnknown++;   // inconnue hors groupe
                        }
                    });
                    const minPossible = inside;                       // si tout le reste est safe
                    const maxPossible = inside + outsideUnknown;      // si tout le reste est mine
                    if (mines <  minPossible || mines > maxPossible)
                        continue outer;                                // masque incompatible
                }
                /* masque compatible → met à jour les certitudes          */
                for (let i = 0; i < n; i++) {
                    if (mask & (1 << i)) allSafe[i] = false;
                    else                 allMine[i] = false;
                }
            }

            allMine.forEach((m, i) => {
                if (!m) return;
                sureMine.add(`${group[i][0]}_${group[i][1]}`);
            });
            allSafe.forEach((s, i) => {
                if (!s) return;
                sureSafe.add(`${group[i][0]}_${group[i][1]}`);
            });
        });

        /* 4) coloration (identique à l’ancienne version) */
        sureMine.forEach(k => {
            const [r, c] = k.split('_').map(Number);
            const el = document.querySelector(`#cell_${c}_${r}`);
            if (el && el.classList.contains('hdn_closed')) {
                changeStyle(el, 1)
            };
        });
        sureSafe.forEach(k => {
            const [r, c] = k.split('_').map(Number);
            const el = document.querySelector(`#cell_${c}_${r}`);
            if (el && el.classList.contains('hdn_closed')) {
                changeStyle(el, 0);
            };
        });
    }

    async function solveAreaBlock(areaBlockMatrix) {
        if (!areaBlockMatrix) return;
        const height = areaBlockMatrix.length;
        const width = areaBlockMatrix[0].length;
        let count = 0;
        let handMode = false;

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const cell = document.querySelector(`#cell_${j}_${i}`);
                if (cell) {
                    cell.style.backgroundColor = '';
                    cell.style.border = '';
                }
            }
        }

        let areaBlockMatrix_g2 = null;
        if (document.getElementById('AreaBlock_g2')) {
            areaBlockMatrix_g2 = interpretOpponentAreaBlock(document.getElementById('AreaBlock_g2'));
        }

        while (true) {

            if (Math.random() < 0.01) {
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        const cell = document.querySelector(`#cell_${j}_${i}`);
                        if (cell) {
                            cell.style.backgroundColor = '';
                            cell.style.border = '';
                        }
                    }
                }
            }

            // 1. If all cells are closed, remove the added style for opened cells
            let allClosed = true;
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    if (areaBlockMatrix[i][j] !== -1) {
                        allClosed = false;
                        break;
                    }
                }
                if (!allClosed) break;
            }

            if (allClosed) {
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        const cell = document.querySelector(`#cell_${j}_${i}`);
                        if (cell) {
                            cell.style.backgroundColor = '';
                            cell.style.border = '';
                        }
                    }
                }
            }

            // 2. If Cell is opened, remove the added style for opened cells
            if (handMode) {
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        if (areaBlockMatrix[i][j] > -1) {
                            const cell = document.querySelector(`#cell_${j}_${i}`);
                            if (cell) {
                                cell.style.backgroundColor = '';
                                cell.style.border = '';
                            }
                        }
                    }
                }
            }
            // 3. Look for the cells that are opened in the opponent's area block
            if (g2_usage && areaBlockMatrix_g2 && handMode) {
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        if (!(areaBlockMatrix[i][j] > -1 || areaBlockMatrix[i][j] === 'X' || areaBlockMatrix_g2[i][j] === -1)) {
                            if (areaBlockMatrix_g2[i][j] === 'X') {
                                const cell = document.querySelector(`#cell_${j}_${i}`);
                                if (cell) {
                                    changeStyle(cell, 1);
                                }
                            } else {
                                const cell = document.querySelector(`#cell_${j}_${i}`);
                                if (cell) {
                                    changeStyle(cell, 0);
                                }
                            }
                        }
                    }
                }
            }

            // 4. Click safe cells if all mines are already flagged
            if (handMode) {
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        if (areaBlockMatrix[i][j] > 0) {
                            const { hiddenCount, minesCount } = countHiddenAround(areaBlockMatrix, i, j);
                            if (areaBlockMatrix[i][j] === minesCount && hiddenCount > 0) {
                                changeStyleCellsAround(areaBlockMatrix, i, j, false);
                                areaBlockMatrix = interpretAreaBlock(document.getElementById('AreaBlock'));
                            }
                        }
                    }
                }
            }

            // 5. Flag mines if all hidden cells must be mines
            if (handMode) {
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        if (areaBlockMatrix[i][j] > 0) {
                            const { hiddenCount, minesCount } = countHiddenAround(areaBlockMatrix, i, j);
                            if (areaBlockMatrix[i][j] === hiddenCount + minesCount && hiddenCount > 0) {
                                changeStyleCellsAround(areaBlockMatrix, i, j, true);
                                areaBlockMatrix = interpretAreaBlock(document.getElementById('AreaBlock'));
                            }
                        }
                    }
                }       
            }  

            // 6. Advanced deductions
            advancedDeductions(areaBlockMatrix);

            // Re-interpret the board after each round
            areaBlockMatrix = interpretAreaBlock(document.getElementById('AreaBlock'));
            if (document.getElementById('AreaBlock_g2')) {
                areaBlockMatrix_g2 = interpretOpponentAreaBlock(document.getElementById('AreaBlock_g2'));
            }
            count++;

            await new Promise(resolve => setTimeout(resolve, 600));
        }
    }

    // Initialize interface when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeInterface);
    } else {
        initializeInterface();
    }
})();