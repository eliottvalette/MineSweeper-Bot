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
                    <button id="debutant"> Go Debutant </button>
                    <button id="intermediaire"> Go Intermediaire </button>
                    <button id="expert"> Go Expert </button>
                    <button id="areaBlock"> Area Block </button>
                    <button id="flag"> Flag 1_1</button>
                    <button id="open"> Open 1_2</button>
                    <button id="solve"> Solve </button>
                </div>
            `;
            document.body.appendChild(interfaceContainer);
    
            // Add click handlers for buttons using proper CSS selectors
            document.getElementById('debutant').addEventListener('click', () => {
                const targetElement = document.querySelector('.level1-link');
                if (targetElement) targetElement.click();
            });
    
            document.getElementById('intermediaire').addEventListener('click', () => {
                const targetElement = document.querySelector('.level2-link');
                if (targetElement) targetElement.click();
            });
    
            document.getElementById('expert').addEventListener('click', () => {
                const targetElement = document.querySelector('.level3-link');
                if (targetElement) targetElement.click();
            });
    
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
    
        async function solveAreaBlock(areaBlockMatrix) {
            if (!areaBlockMatrix) return;
            const height = areaBlockMatrix.length;
            const width = areaBlockMatrix[0].length;
            let changed = true;
            let count = 0;
            while (changed || count < 10) {
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
    
                // 3. If No change, use probability-based approach
                if (!changed) {
                    count++;
                }
                if (count > 5) {
                    count = 0;
                    // Calculate probabilities for each hidden cell
                    const probabilities = calculateProbabilities(areaBlockMatrix);
    
                    if (probabilities.length > 0) {
                        // Sort by probability (lowest first)
                        probabilities.sort((a, b) => a.probability - b.probability);
    
                        // Click the cell with the lowest probability of being a mine
                        const bestMove = probabilities[0];
                        console.log(`Probability-based move: ${bestMove.i+1}_${bestMove.j+1} (${bestMove.probability.toFixed(3)})`);
    
                        const cell = document.getElementById(`${bestMove.i + 1}_${bestMove.j + 1}`);
                        if (cell) {
                            dispatchClick(cell, 0);
                            areaBlockMatrix = interpretGameBlock(document.getElementById('game'));
                            changed = true;
                        }
                    } else {
                        // Fallback to random selection if no probabilities could be calculated
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
                            console.log(`Random fallback move: ${randomI+1}_${randomJ+1}`);
                            const cell = document.getElementById(`${randomI + 1}_${randomJ + 1}`);
                            if (cell) {
                                dispatchClick(cell, 0);
                                areaBlockMatrix = interpretGameBlock(document.getElementById('game'));
                                changed = true;
                            }
                        }
                    }
                }
    
                // Re-interpret the board after each round
                areaBlockMatrix = interpretGameBlock(document.getElementById('game'));
                count++;
    
                await new Promise(resolve => setTimeout(resolve, 1));
            }
        }
    
        // Calculate probabilities of each hidden cell containing a mine
        function calculateProbabilities(areaBlockMatrix) {
            if (!areaBlockMatrix) return [];
            const height = areaBlockMatrix.length;
            const width = areaBlockMatrix[0].length;
    
            // Track probability estimates for each hidden cell
            const probabilities = [];
            const cellProbabilityMap = new Map(); // Map to track total probability and count for each cell
    
            // For each numbered cell
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    // Only consider numbered cells (1-8)
                    if (areaBlockMatrix[i][j] > 0) {
                        const { hiddenCount, minesCount } = countHiddenAround(areaBlockMatrix, i, j);
    
                        // If there are hidden cells and mines to find
                        if (hiddenCount > 0 && areaBlockMatrix[i][j] - minesCount > 0) {
                            // Calculate probability for this group of cells
                            const probability = (areaBlockMatrix[i][j] - minesCount) / hiddenCount;
    
                            // Assign this probability to each hidden cell around
                            for (let k = -1; k <= 1; k++) {
                                for (let l = -1; l <= 1; l++) {
                                    const newI = i + k;
                                    const newJ = j + l;
    
                                    if (newI >= 0 && newI < height && newJ >= 0 && newJ < width &&
                                        areaBlockMatrix[newI][newJ] === -1) {
    
                                        const cellKey = `${newI},${newJ}`;
                                        if (!cellProbabilityMap.has(cellKey)) {
                                            cellProbabilityMap.set(cellKey, { total: 0, count: 0 });
                                        }
    
                                        const cellData = cellProbabilityMap.get(cellKey);
                                        cellData.total += probability;
                                        cellData.count += 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
    
            // Convert the map to array of probability objects
            cellProbabilityMap.forEach((data, key) => {
                const [i, j] = key.split(',').map(Number);
                const avgProbability = data.total / data.count;
                probabilities.push({ i, j, probability: avgProbability });
            });
    
            // Add border cells with a higher probability
            // These are typically more dangerous as we have less information about them
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    if (areaBlockMatrix[i][j] === -1) {
                        const cellKey = `${i},${j}`;
                        if (!cellProbabilityMap.has(cellKey)) {
                            // Check if this is a cell without any adjacent numbered cells
                            // These are typically more risky, so assign higher probability
                            let hasAdjacentNumber = false;
                            for (let k = -1; k <= 1; k++) {
                                for (let l = -1; l <= 1; l++) {
                                    const newI = i + k;
                                    const newJ = j + l;
                                    if (newI >= 0 && newI < height && newJ >= 0 && newJ < width &&
                                        areaBlockMatrix[newI][newJ] > 0) {
                                        hasAdjacentNumber = true;
                                        break;
                                    }
                                }
                                if (hasAdjacentNumber) break;
                            }
    
                            // Add to probabilities with a higher value if it's an isolated cell
                            probabilities.push({
                                i,
                                j,
                                probability: hasAdjacentNumber ? 0.5 : 0.8 // Isolated cells are more risky
                            });
                        }
                    }
                }
            }
    
            return probabilities;
        }
    
        // Initialize interface when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeInterface);
        } else {
            initializeInterface();
        }
    })();