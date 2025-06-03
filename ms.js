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
        // Sélectionne toutes les cases du nouveau format
        const squares = game.querySelectorAll('.square');
        const areaBlockMatrix = Array(9).fill().map(() => Array(9).fill(0));

        squares.forEach(square => {
            // id du type '1_1', '2_3', etc.
            const [rowStr, colStr] = square.id.split('_');
            const row = parseInt(rowStr, 10) - 1; // index 0-based
            const col = parseInt(colStr, 10) - 1;

            if (row < 0 || row > 8 || col < 0 || col > 8) return;

            if (square.classList.contains('bombflagged')) {
                areaBlockMatrix[row][col] = 'X';
            } else if (square.classList.contains('blank')) {
                areaBlockMatrix[row][col] = -1;
            } else {
                // Cherche open0, open1, ... open8
                for (let k = 0; k <= 8; k++) {
                    if (square.classList.contains(`open${k}`)) {
                        areaBlockMatrix[row][col] = k;
                        break;
                    }
                }
            }
        });
        console.log(areaBlockMatrix);
        return areaBlockMatrix;
    }

    function countHiddenAround(areaBlockMatrix, i, j) {
        if (!areaBlockMatrix || i < 1 || j < 1 || i >= 10 || j >= 10) {
            return { hiddenCount: 0, minesCount: 0 };
        }

        let hiddenCount = 0;
        let minesCount = 0;

        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                const newI = i + k;
                const newJ = j + l;
                
                if (newI < 1 || newI >= 10 || newJ < 1 || newJ >= 10) {
                    continue;
                }

                if (areaBlockMatrix[newI - 1][newJ - 1] === -1) {
                    hiddenCount++;
                } else if (areaBlockMatrix[newI - 1][newJ - 1] === 'X') {
                    minesCount++;
                }
            }
        }
        return { hiddenCount, minesCount };
    }

    function clickCellsAround(areaBlockMatrix, i, j, flag) {
        if (!areaBlockMatrix || i < 1 || j < 1 || i >= 10 || j >= 10) return;

        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                const newI = i + k;
                const newJ = j + l;
                if (newI >= 1 && newI < 10 && newJ >= 1 && newJ < 10) {
                    if (areaBlockMatrix[newI - 1][newJ - 1] === -1) {
                        // ids sont du type 'ligne_colonne', index 1-based
                        const cell = document.getElementById(`${newI+1}_${newJ+1}`);
                        if (cell) {
                            dispatchClick(cell, flag ? 2 : 0);
                            console.log(`clicked cell ${newI+1}_${newJ+1}`);
                        }
                    }
                }
            }
        }
    }

    function solveAreaBlock(areaBlockMatrix) {
        if (!areaBlockMatrix) return;

        let changed = true;
        let count = 0;
        while (changed && count < 3) {
            changed = false;
            // 1. Click safe cells if all mines are already flagged
            for (let i = 1; i < 10; i++) {
                for (let j = 1; j < 10; j++) {
                    if (areaBlockMatrix[i - 1][j - 1] > 0) {
                        const { hiddenCount, minesCount } = countHiddenAround(areaBlockMatrix, i, j);
                        console.log(`areaBlockMatrix[${i - 1}][${j - 1}] = ${areaBlockMatrix[i - 1][j - 1]} coordinates: ${i}, ${j}`);
                        console.log(`hiddenCount: ${hiddenCount}, minesCount: ${minesCount}`);
                        if (areaBlockMatrix[i - 1][j - 1] === minesCount && hiddenCount > 0) {
                            clickCellsAround(areaBlockMatrix, i, j, false);
                            changed = true;
                        }
                    }
                }
            }
            // 2. Flag mines if all hidden cells must be mines
            for (let i = 1; i < 10; i++) {
                for (let j = 1; j < 10; j++) {
                    if (areaBlockMatrix[i - 1][j - 1] > 0) {
                        const { hiddenCount, minesCount } = countHiddenAround(areaBlockMatrix, i, j);

                        if (areaBlockMatrix[i - 1][j - 1] === hiddenCount + minesCount && hiddenCount > 0) {
                            clickCellsAround(areaBlockMatrix, i, j, true);
                            changed = true;
                        }
                    }
                }
            }
            // Re-interpret the board after each round
            areaBlockMatrix = interpretGameBlock(document.getElementById('game'));
            count++;
        }
    }

    // Initialize interface when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeInterface);
    } else {
        initializeInterface();
    }
})();