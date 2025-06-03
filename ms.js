// ==UserScript==
// @name         Minesweeper.online Nexus Interface
// @namespace    http://tampermonkey.net/
// @version      2025-06-03
// @description  Nexus Interface for Minesweeper.online
// @author       You
// @match        https://minesweeper.online/fr/
// @match        https://minesweeper.online/fr/game/*
// @match        https://minesweeper.online/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minesweeper.online
// @grant        none
// ==/UserScript==

// Do Not Touch This Structure
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

(function() {
    'use strict';

    function simulateMouse(el, button = 0) {
        const r = el.getBoundingClientRect();
        const opts = {
            bubbles: true,
            cancelable: true,
            view: window,
            button,
            buttons: button === 2 ? 2 : 1,
            clientX: r.left + 1,
            clientY: r.top + 1
        };
        el.dispatchEvent(new MouseEvent('mousedown', opts));
        el.dispatchEvent(new MouseEvent('mouseup',   opts));
        if (button === 0) {
            el.dispatchEvent(new MouseEvent('click', opts));      // ouverture
        } else {
            el.dispatchEvent(new MouseEvent('contextmenu', opts)); // drapeau
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
                <button id="flag"> Flag </button>
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

        document.getElementById('flag').addEventListener('click', () => {
            const cell_0_0 = document.querySelector(`#cell_0_0`);
            const cell_0_1 = document.querySelector(`#cell_0_1`);
            console.log(cell_0_0);
            console.log(cell_0_1);
            if (cell_0_0) {                 // clic droit (drapeau)
                simulateMouse(cell_0_0, 2);
                cell_0_0.classList.add('test_O');
            }
            if (cell_0_1) {                 // clic gauche (ouverture)
                simulateMouse(cell_0_1, 0);
                cell_0_1.classList.add('test_1');
            }
        });
    }

    function interpretAreaBlock(areaBlock) {
        if (!areaBlock) return null;
        
        const cells = areaBlock.querySelectorAll('.cell');
        const cellsArray = Array.from(cells);
        const areaBlockMatrix = Array(9).fill().map(() => Array(9).fill(0));
        
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = cellsArray[i * 9 + j];
                if (!cell) continue;

                if (cell.classList.contains('hdd_closed')) {
                    if (cell.classList.contains('hdd_flag')) {
                        areaBlockMatrix[i][j] = 'X';
                    } else {
                        areaBlockMatrix[i][j] = -1;
                    }
                } else if (cell.classList.contains('hdd_opened')) {
                    for (let k = 0; k < 9; k++) {
                        if (cell.classList.contains(`hdd_type${k}`)) {
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
        if (!areaBlockMatrix || i < 0 || j < 0 || i >= 9 || j >= 9) {
            return { hiddenCount: 0, minesCount: 0 };
        }

        let hiddenCount = 0;
        let minesCount = 0;

        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                const newI = i + k;
                const newJ = j + l;
                
                if (newI >= 0 && newI < 9 && newJ >= 0 && newJ < 9) {
                    if (areaBlockMatrix[newI][newJ] === -1) {
                        hiddenCount++;
                    } else if (areaBlockMatrix[newI][newJ] === 'X') {
                        minesCount++;
                    }
                }
            }
        }
        return { hiddenCount, minesCount };
    }

    function clickCellsAround(areaBlockMatrix, i, j, flag) {
        if (!areaBlockMatrix || i < 0 || j < 0 || i >= 9 || j >= 9) return;

        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                const newI = i + k;
                const newJ = j + l;
                
                if (newI >= 0 && newI < 9 && newJ >= 0 && newJ < 9) {
                    console.log(`areaBlockMatrix[${newI}][${newJ}] = ${areaBlockMatrix[newI][newJ]}`);
                    if (areaBlockMatrix[newI][newJ] === -1) {
                        const cell = document.querySelector(`#cell_${newJ}_${newI}`);
                        if (cell) {
                            if (flag) {
                                cell.dispatchEvent(new MouseEvent('contextmenu', {
                                    bubbles: true,
                                    cancelable: true,
                                    button: 2
                                }));
                            } else {
                                cell.click();
                            }
                            console.log(`clicked cell ${newJ}_${newI}`);
                        }
                    }
                }
            }
        }
    }

    function solveAreaBlock(areaBlockMatrix) {
        if (!areaBlockMatrix) return;

        let changed = true;
        while (changed) {
            changed = false;
            // 1. Click safe cells if all mines are already flagged
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (areaBlockMatrix[i][j] > 0) {
                        const { hiddenCount, minesCount } = countHiddenAround(areaBlockMatrix, i, j);
                        console.log(`areaBlockMatrix[${i}][${j}] = ${areaBlockMatrix[i][j]} coordinates: ${i}, ${j}`);
                        console.log(`hiddenCount: ${hiddenCount}, minesCount: ${minesCount}`);
                        if (areaBlockMatrix[i][j] === minesCount && hiddenCount > 0) {
                            clickCellsAround(areaBlockMatrix, i, j, false);
                            changed = true;
                        }
                    }
                }
            }
            // 2. Flag mines if all hidden cells must be mines
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (areaBlockMatrix[i][j] > 0) {
                        const { hiddenCount, minesCount } = countHiddenAround(areaBlockMatrix, i, j);

                        if (areaBlockMatrix[i][j] === hiddenCount + minesCount && hiddenCount > 0) {
                            clickCellsAround(areaBlockMatrix, i, j, true);
                            changed = true;
                        }
                    }
                }
            }
        }
    }

    // Initialize interface when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeInterface);
    } else {
        initializeInterface();
    }
})();