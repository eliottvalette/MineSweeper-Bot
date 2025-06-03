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



(function() {
    'use strict';

    function changeStyle(el, button) {
        if (button === 0) { // change cell style into red
            el.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
            el.style.border = '2px solid red';
        } else { // change cell style into green
            el.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
            el.style.border = '2px solid green';
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
            const areaBlock = document.getElementById('AreaBlock');
            if (areaBlock) interpretAreaBlock(areaBlock);
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
                console.log(`i = ${i}, j = ${j}`);
                const cell = cellsArray[i * maxCol + j];
                if (!cell) continue;

                console.log(cell.classList);
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
        console.log(areaBlockMatrix);
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
                    console.log(`areaBlockMatrix[${newI}][${newJ}] = ${areaBlockMatrix[newI][newJ]}`);
                    if (areaBlockMatrix[newI][newJ] === -1) {
                        const cell = document.querySelector(`#cell_${newJ}_${newI}`);
                        if (cell) {
                            changeStyle(cell, flag ? 2 : 0);
                            console.log(`clicked cell ${newJ}_${newI}`);
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
        let count = 0;

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const cell = document.querySelector(`#cell_${j}_${i}`);
                if (cell) {
                    cell.style.backgroundColor = '';
                    cell.style.border = '';
                }
            }
        }
        while (true) {

            // 0. Double check and remove the added style for opened cells
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    if (areaBlockMatrix[i][j] !== -1) {
                        const cell = document.querySelector(`#cell_${j}_${i}`);
                        if (cell) {
                            cell.style.backgroundColor = '';
                            cell.style.border = '';
                        }
                    }
                }
            }
            // 1. Click safe cells if all mines are already flagged
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

            // 2. Flag mines if all hidden cells must be mines
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

            // Re-interpret the board after each round
            areaBlockMatrix = interpretAreaBlock(document.getElementById('AreaBlock'));
            count++;

            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    // Initialize interface when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeInterface);
    } else {
        initializeInterface();
    }
})();