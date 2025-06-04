// ==UserScript==
// @name         Minesweeper.online Nexus Interface
// @namespace    http://tampermonkey.net/
// @version      2025-06-03
// @description  Nexus Interface for Minesweeper.online
// @author       You
// @match        *://minesweeperonline.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minesweeper.online
// @grant        none
// ==/UserScript==

// Do Not Touch This Structure (Old One)
//  <div id="AreaBlock" class="pull-left">
//    <div id="cell_0_0" class="cell size24 hdd_closed" data-x="0" data-y="0"></div>
//    <div id="cell_1_0" class="cell size24 hdd_closed" data-x="1" data-y="0"></div>
//    <div id="cell_2_0" class="cell size24 hdd_closed hdd_flag" data-x="2" data-y="0"></div>
//    <div id="cell_3_0" class="cell size24 hdd_closed hdd_flag" data-x="3" data-y="0"></div>
//    <div id="cell_4_0" class="cell size24 hdd_opened hdd_type1" data-x="4" data-y="0"></div>
//    <div id="cell_5_0" class="cell size24 hdd_opened hdd_type0" data-x="5" data-y="0"></div>
//    <div id="cell_6_0" class="cell size24 hdd_opened hdd_type0" data-x="6" data-y="0"></div>
//    <div id="cell_7_0" class="cell size24 hdd_opened hdd_type0" data-x="7" data-y="0"></div>
//    <div id="cell_8_0" class="cell size24 hdd_opened hdd_type0" data-x="8" data-y="0"></div>
//    <div class="clear"></div>

//    <div id="cell_0_1" class="cell size24 hdd_opened hdd_type2" data-x="0" data-y="1"></div>
//    <div id="cell_1_1" class="cell size24 hdd_opened hdd_type2" data-x="1" data-y="1"></div>
//    <div id="cell_2_1" class="cell size24 hdd_opened hdd_type2" data-x="2" data-y="1"></div>
//    <div id="cell_3_1" class="cell size24 hdd_opened hdd_type1" data-x="3" data-y="1"></div>
//    <div id="cell_4_1" class="cell size24 hdd_opened hdd_type1" data-x="4" data-y="1"></div>
//    <div id="cell_5_1" class="cell size24 hdd_opened hdd_type0" data-x="5" data-y="1"></div>
//    <div id="cell_6_1" class="cell size24 hdd_opened hdd_type0" data-x="6" data-y="1"></div>
//    <div id="cell_7_1" class="cell size24 hdd_opened hdd_type0" data-x="7" data-y="1"></div>
//    <div id="cell_8_1" class="cell size24 hdd_opened hdd_type0" data-x="8" data-y="1"></div>
//    <div class="clear"></div>
//    ...
//  </div>

// New Structure
//  <div id="game"
     // oncontextmenu="return false;"
     // ondrag="return false;"
     // ondragstart="return false;"
     // style="width: 164px; height: 206px;">
    // <div class="bordertl"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertr"></div>
    // <div class="borderlrlong"></div>
    // <div class="time0" id="mines_hundreds"></div>
    // <div class="time0" id="mines_tens"></div>
    // <div class="time8" id="mines_ones"></div>
    // <div class="facesmile" style="margin-left:14px; margin-right: 14px;" id="face"></div>
    // <div class="time0" id="seconds_hundreds"></div>
    // <div class="time1" id="seconds_tens"></div>
    // <div class="time0" id="seconds_ones"></div>
    // <div class="borderlrlong"></div>
    // <div class="borderjointl"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="bordertb"></div>
    // <div class="borderjointr"></div>
    // <div class="borderlr"></div>
    // <div class="square bombflagged" id="1_1"></div>
    // <div class="square bombflagged" id="1_2"></div>
    // <div class="square open0" id="1_3"></div>
    // <div class="square open1" id="1_4"></div>
    // <div class="square blank" id="1_5"></div>
    // <div class="square blank" id="1_6"></div>
    // <div class="square blank" id="1_7"></div>
    // <div class="square blank" id="1_8"></div>
    // <div class="square blank" id="1_9"></div>
    // <div class="borderlr"></div>
    // <div class="borderlr"></div>
    // <div class="square blank" id="2_1"></div>
    // <div class="square open1" id="2_2"></div>
    // <div class="square open0" id="2_3"></div>
    // <div class="square open1" id="2_4"></div>
    // <div class="square blank" id="2_5"></div>
    // <div class="square blank" id="2_6"></div>
    // <div class="square blank" id="2_7"></div>
    // <div class="square blank" id="2_8"></div>
    // <div class="square blank" id="2_9"></div>

    (function() {
        'use strict';

        let forceStop = false;
        console.log('forceStop :', forceStop);

        // Helper universel (pointer + mouse)
        function dispatchClick(el, button = 0) {
            const mask = button === 2 ? 2 : 1; // 1 = gauche, 2 = droit
            const opts = {
                bubbles: true,
                cancelable: true,
                composed: true,
                button,          // 0 ou 2
                buttons: mask,   // état courant des boutons
                pointerId: 1,
                pointerType: 'mouse',
                clientX: 0,
                clientY: 0
            };
    
            // appui
            el.dispatchEvent(new PointerEvent('pointerdown', opts));
            el.dispatchEvent(new MouseEvent  ('mousedown',   opts));
    
            // relâche
            el.dispatchEvent(new PointerEvent('pointerup',   opts));
            el.dispatchEvent(new MouseEvent  ('mouseup',     opts));
    
            // post-traitement : click ou contextmenu
            if (button === 0) {
                el.dispatchEvent(new MouseEvent('click', opts));
            } else {
                el.dispatchEvent(new MouseEvent('contextmenu', opts));
            }
        }
    
        function initializeInterface() {
            const interfaceContainer = document.createElement('div');
            interfaceContainer.innerHTML = `
                <style>
                    .nexus-interface {
                        position: fixed;
                        right: 10px;
                        top: 100px;
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
                    <button id="flag"> Flag 1_1</button>
                    <button id="open"> Open 1_2</button>
                    <button id="stop"> Stop </button>
                    <button id="solve"> Solve </button>
                </div>
            `;
            document.body.appendChild(interfaceContainer);
    
    
            document.getElementById('areaBlock').addEventListener('click', () => {
                const game = document.getElementById('game');
                if (game) interpretGameBlock(game);
            });
    
            document.getElementById('solve').addEventListener('click', () => {
                const game = document.getElementById('game');
                if (game) {
                    const areaBlockMatrix = interpretGameBlock(game);
                    solveAreaBlock(areaBlockMatrix);
                }
            });
    
            document.getElementById('flag').addEventListener('click', () => {
                const cell_1_1 = document.getElementById('1_1');
                console.log(cell_1_1);
                if (cell_1_1) {                // drapeau = clic droit
                    dispatchClick(cell_1_1, 2);
                    cell_1_1.classList.add('test_O');
                }
            });
    
            document.getElementById('open').addEventListener('click', () => {
                const cell_2_1 = document.getElementById('2_1');
                console.log(cell_2_1);
                if (cell_2_1) {
                    dispatchClick(cell_2_1, 0);
                    cell_2_1.classList.add('test_1');
                }
            });

            document.getElementById('stop').addEventListener('click', () => {
                forceStop = true;
            });
        }
    
        function interpretGameBlock(game) {
            if (!game) return null;
            const squares = game.querySelectorAll('.square');
            let maxRow = 0, maxCol = 0;
    
            // Trouver la taille max
            squares.forEach(square => {
                const [rowStr, colStr] = square.id.split('_');
                const row = parseInt(rowStr, 10);
                const col = parseInt(colStr, 10);
                if (row > maxRow) maxRow = row;
                if (col > maxCol) maxCol = col;
            });
    
            // Créer la matrice à la bonne taille
            const areaBlockMatrix = Array(maxRow).fill().map(() => Array(maxCol).fill(0));
    
            squares.forEach(square => {
                const [rowStr, colStr] = square.id.split('_');
                const row = parseInt(rowStr, 10) - 1;
                const col = parseInt(colStr, 10) - 1;
                if (row < 0 || row >= maxRow || col < 0 || col >= maxCol) return;
    
                if (square.classList.contains('bombflagged')) {
                    areaBlockMatrix[row][col] = 'X';
                } else if (square.classList.contains('blank')) {
                    areaBlockMatrix[row][col] = -1;
                } else {
                    for (let k = 0; k <= 8; k++) {
                        if (square.classList.contains(`open${k}`)) {
                            areaBlockMatrix[row][col] = k;
                            break;
                        }
                    }
                }
            });
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
    
        function clickCellsAround(areaBlockMatrix, i, j, flag) {
            if (!areaBlockMatrix || i < 0 || j < 0 || i >= areaBlockMatrix.length || j >= areaBlockMatrix[0].length) return;
            const height = areaBlockMatrix.length;
            const width = areaBlockMatrix[0].length;
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    const newI = i + k;
                    const newJ = j + l;
                    if (newI >= 0 && newI < height && newJ >= 0 && newJ < width) {
                        if (areaBlockMatrix[newI][newJ] === -1) {
                            // ids sont du type 'ligne_colonne', index 1-based
                            const cell = document.getElementById(`${newI+1}_${newJ+1}`);
                            if (cell) {
                                dispatchClick(cell, flag ? 2 : 0);
                                console.log(`${flag ? 'flagged' : 'opened'} cell ${newI+1}_${newJ+1} `);
                            }
                        }
                    }
                }
            }
        }
    
        // === Advanced Deductions from ms_ban_safe.js, adapté pour ms.js ===
        function advancedDeductions(area) {
            const H = area.length, W = area[0].length, MAX = 8;
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
            if (!eqs.length) return false;
            const groupKeys = new Set();
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
                    const uniq = [];
                    const seen = new Set();
                    union.forEach(([r, c]) => {
                        const k = `${r}_${c}`;
                        if (!seen.has(k)) { uniq.push([r, c]); seen.add(k); }
                    });
                    pushGroup(uniq);
                }
            }
            const sureMine = new Set(), sureSafe = new Set();
            groups.forEach(group => {
                const n = group.length;
                const idx = new Map(group.map((p, i) => [`${p[0]}_${p[1]}`, i]));
                const allMine = Array(n).fill(true), allSafe = Array(n).fill(true);
                outer: for (let mask = 0; mask < (1 << n); mask++) {
                    for (const { cells, mines } of eqs) {
                        let inside = 0, outsideUnknown = 0;
                        cells.forEach(([r, c]) => {
                            const k = `${r}_${c}`;
                            if (idx.has(k)) {
                                if (mask & (1 << idx.get(k))) inside++;
                            } else {
                                if (area[r][c] === -1) outsideUnknown++;
                            }
                        });
                        const minPossible = inside;
                        const maxPossible = inside + outsideUnknown;
                        if (mines <  minPossible || mines > maxPossible)
                            continue outer;
                    }
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
            let action = false;
            sureMine.forEach(k => {
                const [r, c] = k.split('_').map(Number);
                const cell = document.getElementById(`${r+1}_${c+1}`);
                if (cell && cell.classList.contains('bombflagged')) return;
                if (cell && area[r][c] === -1) {
                    dispatchClick(cell, 2); // flag
                    action = true;
                }
            });
            sureSafe.forEach(k => {
                const [r, c] = k.split('_').map(Number);
                const cell = document.getElementById(`${r+1}_${c+1}`);
                if (cell && area[r][c] === -1) {
                    dispatchClick(cell, 0); // open
                    action = true;
                }
            });
            return action;
        }
    
        async function solveAreaBlock(areaBlockMatrix) {
            console.log('forceStop :', forceStop);
            if (!areaBlockMatrix) return;
            const height = areaBlockMatrix.length;
            const width = areaBlockMatrix[0].length;
            let changed = true;
            let count = 0;

            while (areaBlockMatrix.some(row => row.some(cell => cell === -1)) && !forceStop) {
                changed = false;
                // 0. Check if there is only closed cells
                let onlyClosedCells = true;
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        if (areaBlockMatrix[i][j] !== -1) {
                            onlyClosedCells = false;
                        }
                    }
                }
                if (onlyClosedCells) {
                    // click randomly a closed cell
                    const closedCells = [];
                    for (let i = 0; i < height; i++) {
                        for (let j = 0; j < width; j++) {
                            if (areaBlockMatrix[i][j] === -1) {
                                closedCells.push([i, j]);
                            }
                        }
                    }
                    if (closedCells.length > 0) {
                        const [randomI, randomJ] = closedCells[Math.floor(Math.random() * closedCells.length)];
                        const cell = document.getElementById(`${randomI + 1}_${randomJ + 1}`);
                        if (cell) {
                            dispatchClick(cell, 0);
                        }
                        areaBlockMatrix = interpretGameBlock(document.getElementById('game'));
                        changed = true;
                    }
                }
                // 1. Click safe cells if all mines are already flagged
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        if (areaBlockMatrix[i][j] > 0) {
                            const { hiddenCount, minesCount } = countHiddenAround(areaBlockMatrix, i, j);
                            if (areaBlockMatrix[i][j] === minesCount && hiddenCount > 0) {
                                clickCellsAround(areaBlockMatrix, i, j, false);
                                areaBlockMatrix = interpretGameBlock(document.getElementById('game'));
                                changed = true;
                            }
                        }
                    }
                }
                // 2. Flag mines if all hidden cells must be mines
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        if (areaBlockMatrix[i][j] > 0) {
                            const { hiddenCount, minesCount } = countHiddenAround(areaBlockMatrix, i, j);
                            if (areaBlockMatrix[i][j] === hiddenCount + minesCount && hiddenCount > 0) {
                                clickCellsAround(areaBlockMatrix, i, j, true);
                                areaBlockMatrix = interpretGameBlock(document.getElementById('game'));
                                changed = true;
                            }
                        }
                    }
                }
    
                // === Nouvelle étape : déductions avancées ===
                if (advancedDeductions(areaBlockMatrix)) {
                    areaBlockMatrix = interpretGameBlock(document.getElementById('game'));
                    changed = true;
                }

                if (!changed) {
                    // click randomly a closed cell
                    const closedCells = [];
                    for (let i = 0; i < height; i++) {
                        for (let j = 0; j < width; j++) {
                            if (areaBlockMatrix[i][j] === -1) {
                                closedCells.push([i, j]);
                            }
                        }
                    }
                    if (closedCells.length > 0) {
                        const [randomI, randomJ] = closedCells[Math.floor(Math.random() * closedCells.length)];
                        const cell = document.getElementById(`${randomI + 1}_${randomJ + 1}`);
                        if (cell) {
                            dispatchClick(cell, 0);
                        }
                    }
                }
    
                // Re-interpret the board after each round
                areaBlockMatrix = interpretGameBlock(document.getElementById('game'));
    
                await new Promise(resolve => setTimeout(resolve, 1));
            }
            forceStop = true;
        }
    
        // Initialize interface when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeInterface);
        } else {
            initializeInterface();
        }
    })();