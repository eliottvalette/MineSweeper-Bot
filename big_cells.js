// ==UserScript==
// @name         Minesweeper.online
// @namespace    http://tampermonkey.net/
// @version      2025-06-03
// @description  Minesweeper.online Cheat
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

    let botEnabled = true;
    let keyWInterval = null; // intervalle pour simuler l'appui de la touche w
    let solveInterval = null; // intervalle pour solve toutes les 500ms

    let probeCell = null; // cellule "sonde" quand plus aucune rouge
    const redCells = new Set();

    let lastActionCell = null; // Dernière cellule sur laquelle on a déclenché F ou C
    let clickCooldownMs = 250; // Cooldown de base entre deux clicks (en ms)
    let lastClickTimestamp = 0; // Timestamp du dernier click simulé
    let hoverListenersInitialized = false; // Pour ne pas attacher plusieurs fois les listeners de hover

    function changeStyle(el, button) {
        if (button === 0) { // cellule sûre à cliquer => ROUGE (no bomb)
                el.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
                el.style.border = '2px solid red';
            redCells.add(el);
        } else { // cellule à ignorer/flag => VERT (bomb)
                el.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
                el.style.border = '2px solid green';
                el.style.pointerEvents = 'none';
            if (redCells.has(el)) {
                redCells.delete(el);
            }
        }
    }

    // Réinitialise tous les styles ajoutés par le bot sur les tuiles
    function resetAllCellStyles() {
        const areaBlock = document.getElementById('AreaBlock');
        if (!areaBlock) return;

        const cells = areaBlock.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.backgroundColor = '';
            cell.style.border = '';
            cell.style.pointerEvents = '';
        });

        redCells.clear();
        lastActionCell = null;
        lastClickTimestamp = 0;
    }

    // Simule l'appui de la touche "w"
    function simulateKeyW() {
        const keyEvent = new KeyboardEvent('keydown', {
            key: 'w',
            code: 'KeyW',
            keyCode: 87,
            which: 87,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(keyEvent);
    }

    // Démarre la simulation de la touche "w" toutes les secondes
    function startKeyWSimulation() {
        if (keyWInterval) {
            clearInterval(keyWInterval);
        }
        keyWInterval = setInterval(() => {
            simulateKeyW();
        }, 1000);
    }

    // Démarre l'intervalle de solve toutes les 500ms
    function startSolveInterval() {
        if (solveInterval) {
            clearInterval(solveInterval);
        }
        solveInterval = setInterval(() => {
            if (botEnabled) {
                const areaBlock = document.getElementById('AreaBlock');
                if (areaBlock) {
                    const areaBlockMatrix = interpretAreaBlock(areaBlock);
                    solveAreaBlock(areaBlockMatrix);
                }
            }
        }, 500);
    }

    // Arrête l'intervalle de solve
    function stopSolveInterval() {
        if (solveInterval) {
            clearInterval(solveInterval);
            solveInterval = null;
        }
    }

    // Simule l'appui de la touche "C" (click - là où il n'y a pas de bombe)
    function simulateKeyC() {
        const keyDownEvent = new KeyboardEvent('keydown', {
            key: 'c',
            code: 'KeyC',
            keyCode: 67,
            which: 67,
            bubbles: true,
            cancelable: true,
            composed: true
        });

        const keyUpEvent = new KeyboardEvent('keyup', {
            key: 'c',
            code: 'KeyC',
            keyCode: 67,
            which: 67,
            bubbles: true,
            cancelable: true,
            composed: true
        });

        // Dispatcher sur window et document pour une meilleure compatibilité
        window.dispatchEvent(keyDownEvent);
        document.dispatchEvent(keyDownEvent);

        // Simuler le relâchement après un court délai
        setTimeout(() => {
            window.dispatchEvent(keyUpEvent);
            document.dispatchEvent(keyUpEvent);
        }, 20);

        // Solve immédiat après C
        setTimeout(() => {
            if (botEnabled) {
                const areaBlock = document.getElementById('AreaBlock');
                if (areaBlock) {
                    const areaBlockMatrix = interpretAreaBlock(areaBlock);
                    solveAreaBlock(areaBlockMatrix);
                }
            }
        }, 50);
    }

    // Initialise l'overlay d'information en haut à droite
    function initializeTileInfoOverlay() {
        // Vérifier si l'overlay existe déjà
        let overlay = document.getElementById('tile-info-overlay');
        if (overlay) {
            return overlay;
        }

        // Créer le style si pas déjà présent
        if (!document.getElementById('tile-info-overlay-style')) {
            const style = document.createElement('style');
            style.id = 'tile-info-overlay-style';
            style.textContent = `
                #tile-info-overlay {
                    position: fixed !important;
                    top: 10px !important;
                    right: 10px !important;
                    z-index: 10000 !important;
                    background: rgba(15, 15, 30, 0.95) !important;
                    border: 1px solid #1a3a5a !important;
                    border-radius: 5px !important;
                    padding: 10px !important;
                    font-family: 'Tahoma', sans-serif !important;
                    font-size: 14px !important;
                    color: #e0e0e0 !important;
                    min-width: 200px !important;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7) !important;
                    pointer-events: auto !important;
                }
                #tile-info-overlay .info-line {
                    margin: 5px 0 !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 6px !important;
                }
                #tile-info-overlay .label {
                    font-weight: bold !important;
                    color: #4a9eff !important;
                    min-width: 70px !important;
                }
                #click-cooldown-slider {
                    flex: 1 1 auto !important;
                    max-width: 140px !important;
                    accent-color: #4a9eff !important;
                }
                #click-cooldown-value {
                    min-width: 50px !important;
                    text-align: right !important;
                    font-weight: bold !important;
                    color: #e0e0e0 !important;
                    font-variant-numeric: tabular-nums !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Créer l'overlay
        overlay = document.createElement('div');
        overlay.id = 'tile-info-overlay';
        overlay.innerHTML = `
            <div class="info-line"><span class="label">State:</span> <span id="tile-state">-</span></div>
            <div class="info-line"><span class="label">Number:</span> <span id="tile-number">-</span></div>
            <div class="info-line"><span class="label">Solved:</span> <span id="tile-solved">-</span></div>
            <div class="info-line">
                <span class="label">Cooldown:</span>
                <input id="click-cooldown-slider" type="range" min="0" max="500" step="10" value="200" />
                <span id="click-cooldown-value">200 ms</span>
            </div>
        `;
        document.body.appendChild(overlay);

        // Initialiser le slider de cooldown
        const slider = document.getElementById('click-cooldown-slider');
        const sliderValue = document.getElementById('click-cooldown-value');
        if (slider && sliderValue) {
            // Valeur par défaut alignée sur clickCooldownMs
            slider.value = String(clickCooldownMs);
            sliderValue.textContent = `${clickCooldownMs} ms`;

            slider.addEventListener('input', () => {
                const value = parseInt(slider.value, 10) || 0;
                clickCooldownMs = value;
                sliderValue.textContent = `${value} ms`;
            });
        }

        return overlay;
    }

    // Met à jour l'overlay avec les informations de la cellule survolée
    function updateTileInfo(cell) {
        const stateElement = document.getElementById('tile-state');
        const numberElement = document.getElementById('tile-number');
        const solvedElement = document.getElementById('tile-solved');

        if (!stateElement || !numberElement || !solvedElement) {
            return; // Overlay pas encore créé
        }

        if (!cell) {
            stateElement.textContent = '-';
            numberElement.textContent = '-';
            solvedElement.textContent = '-';
            lastActionCell = null;
            return;
        }

        const isClosed = cell.classList.contains('hdn_closed');
        const isOpened = cell.classList.contains('hdn_opened');
        const isFlagged = cell.classList.contains('hdn_flag');
        const isRed = cell.style.backgroundColor === 'rgba(255, 0, 0, 0.7)' || cell.style.border === '2px solid red';
        const isGreen = cell.style.backgroundColor === 'rgba(0, 255, 0, 0.7)' || cell.style.border === '2px solid green';

        if (isClosed) {
            if (isFlagged) {
                stateElement.textContent = 'Closed (Flag)';
            } else {
                stateElement.textContent = 'Closed';
            }
            numberElement.textContent = '-';
        } else if (isOpened) {
            stateElement.textContent = 'Opened';
            // Chercher le chiffre dans les classes hdn_type0, hdn_type1, etc.
            let number = '-';
            for (let i = 0; i <= 8; i++) {
                if (cell.classList.contains(`hdn_type${i}`)) {
                    number = String(i);
                    break;
                }
            }
            numberElement.textContent = number;
        } else {
            stateElement.textContent = 'Unknown';
            numberElement.textContent = '-';
        }

        // Détecter si la cellule est résolue (rouge = no bomb, vert = bomb)
        if (isRed) {
            solvedElement.textContent = 'no bomb';
            // Simuler C seulement si c'est une nouvelle cellule, si le bot est activé
            // et si le cooldown (avec jitter de ±10%) est respecté
            if (botEnabled && lastActionCell !== cell) {
                const now = performance.now();
                let effectiveCooldown = clickCooldownMs;
                if (clickCooldownMs > 0) {
                    const jitterFactor = 0.9 + Math.random() * 0.2; // entre 0.9 et 1.1
                    effectiveCooldown = clickCooldownMs * jitterFactor;
                }
                if (now - lastClickTimestamp >= effectiveCooldown) {
                    simulateKeyC();
                    lastActionCell = cell;
                    lastClickTimestamp = now;
                }
            }
        } else if (isGreen) {
            solvedElement.textContent = 'bomb';
        } else {
            solvedElement.textContent = '-';
        }
    }

    // Ajoute les event listeners sur les cellules pour le hover
    function setupTileHoverListeners() {
        if (hoverListenersInitialized) {
            return;
        }
        hoverListenersInitialized = true;

        // Utiliser la délégation d'événements sur le document pour gérer toutes les cellules (existantes et futures)
        document.addEventListener('mouseover', (e) => {
            const cell = e.target.closest('#AreaBlock .cell');
            if (cell) {
                updateTileInfo(cell);
            }
        }, true);

        document.addEventListener('mouseout', (e) => {
            const cell = e.target.closest('#AreaBlock .cell');
            if (cell) {
                const relatedTarget = e.relatedTarget;
                // Si on sort vraiment de la zone de jeu (pas juste vers une autre cellule)
                if (!relatedTarget || !relatedTarget.closest || !relatedTarget.closest('#AreaBlock .cell')) {
                    updateTileInfo(null);
                }
            }
        }, true);
    }

    function initializeInterface() {
        const interfaceContainer = document.createElement('div');
        interfaceContainer.innerHTML = `
            <style>
                #toggleBotButton {
                    position: fixed;
                    top: 10px;
                    left: 10px;
                    z-index: 999;
                    background: #1a3a5a;
                    color: #e0e0e0;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    font-family: 'Tahoma', sans-serif;
                    font-size: 13px;
                    cursor: pointer;
                }
                #toggleBotButton:hover {
                    background: #2a4a6a;
                }
            </style>
            <button id="toggleBotButton">Disable Bot</button>
        `;
        document.body.appendChild(interfaceContainer);

        document.getElementById('toggleBotButton').addEventListener('click', () => {
            botEnabled = !botEnabled;
            document.getElementById('toggleBotButton').textContent = botEnabled ? 'Disable Bot' : 'Enable Bot';

            const areaBlock = document.getElementById('AreaBlock');

            if (!botEnabled) {
                // Désactivation du bot : tout redeviens "normal" et cliquable
                resetAllCellStyles();
                if (areaBlock) {
                    const cells = areaBlock.querySelectorAll('.cell');
                    cells.forEach(cell => {
                        cell.style.pointerEvents = 'auto';
                    });
                }

                if (probeCell) {
                    probeCell.style.position = '';
                    probeCell.style.left = '';
                    probeCell.style.top = '';
                    probeCell.style.width = '';
                    probeCell.style.height = '';
                    probeCell.style.margin = '';
                    probeCell.style.transform = '';
                    probeCell.style.boxSizing = '';
                    probeCell.style.zIndex = '';
                    probeCell = null;
                }
                stopSolveInterval();
            } else {
                // Activation du bot : reset complet + solve immédiat
                resetAllCellStyles();
                startSolveInterval();

                if (areaBlock) {
                    const areaBlockMatrix = interpretAreaBlock(areaBlock);
                    solveAreaBlock(areaBlockMatrix);
                }
            }

            console.log('botEnabled', botEnabled);
        });

        // Keyboard shortcut for KeyD
        document.addEventListener('keydown', (e) => {
            if (e.code === 'KeyD') {
                e.preventDefault();
                const toggleButton = document.getElementById('toggleBotButton');
                if (toggleButton) {
                    toggleButton.click();
                }
            }
        });

        // Initialiser l'overlay d'information
        initializeTileInfoOverlay();

        // Initialiser les listeners de hover (une seule fois, via délégation document)
        function trySetupListeners() {
            setupTileHoverListeners();
        }
        trySetupListeners();

        // Démarrer l'intervalle de solve toutes les 500ms
        startSolveInterval();
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
                    if (cell.classList.contains('hdn_flag') || cell.style.backgroundColor === 'rgba(0, 255, 0, 0.7)') {
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

    function advancedDeductions(area, log = false) {
        const H = area.length, W = area[0].length, MAX = 4;

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

        if (log) {
            console.log('eqs', eqs);
        }


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

        if (log) {
            console.log('groups', groups);
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

        if (log) {
            console.log('sureMine', sureMine);
            console.log('sureSafe', sureSafe);
        }

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

    function solveAreaBlock(areaBlockMatrix) {
        if (!areaBlockMatrix || !botEnabled) return;
        const height = areaBlockMatrix.length;
        const width = areaBlockMatrix[0].length;

            // 2. If Cell is opened, remove the added style for opened cells
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        if (areaBlockMatrix[i][j] > -1) {
                            const cell = document.querySelector(`#cell_${j}_${i}`);
                            if (cell) {
                                cell.style.backgroundColor = '';
                                cell.style.border = '';
                        cell.style.pointerEvents = '';
                        if (redCells.has(cell)) {
                            redCells.delete(cell);
                        }
                    }
                }
            }
        }

            // 4. Click safe cells if all mines are already flagged
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

            // 5. Flag mines if all hidden cells must be mines
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

            // 6. Advanced deductions
                advancedDeductions(areaBlockMatrix);
    }

    // Initialize interface when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeInterface);
    } else {
        initializeInterface();
    }
})();