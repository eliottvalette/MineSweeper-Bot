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

    let botEnabled = true;

    // Hot-spot pile pour cliquer sans déplacer la souris
    const HOT_LEFT = 20;      // px depuis la gauche
    const HOT_TOP  = 200;     // px depuis le haut
    const HOT_SIZE = 48;      // largeur/hauteur des cellules empilées

    const TARGET_COL = 8.5;
    const TARGET_ROW = 12.5;

    let probeCell = null; // cellule "sonde" quand plus aucune rouge

    /** Ensemble des cellules "rouges" actuellement cliquables */
    const redCells = new Set();

    // distance^2 au point cible (évite sqrt)
    function distance2ToTarget(el) {
        const col = parseInt(el.getAttribute('data-x') ?? el.id.split('_')[1], 10);
        const row = parseInt(el.getAttribute('data-y') ?? el.id.split('_')[2], 10);
        const dx = col - TARGET_COL, dy = row - TARGET_ROW;
        return dx*dx + dy*dy;
    }

    // trouve la cellule fermée non verte la plus proche de (8.5,12.5)
    function findClosestClosedNonGreenCell() {
        const areaBlock = document.getElementById('AreaBlock');
        if (!areaBlock) return null;
        const candidates = Array.from(areaBlock.querySelectorAll('.cell.hdn_closed:not(.hdn_flag)'));
        let best = null, bestD2 = Infinity;

        for (const el of candidates) {
            // exclure explicitement les vertes (style inline posé par le bot)
            const isGreen = el.style.backgroundColor === 'rgba(0, 255, 0, 0.7)' || el.style.border === '2px solid green';
            if (isGreen) continue;

            const d2 = distance2ToTarget(el);
            if (d2 < bestD2) { bestD2 = d2; best = el; }
        }
        return best;
    }

    // place une cellule au hot spot et arme le "mode sonde"
    function armProbeMode(cell) {
        // nettoyer toute pile rouge
        redCells.forEach(el => resetCellLayout(el));
        redCells.clear();

        // désactiver les clics partout, sauf la sonde
        const areaBlock = document.getElementById('AreaBlock');
        if (areaBlock) {
            areaBlock.querySelectorAll('.cell').forEach(c => { c.style.pointerEvents = 'none'; });
        }

        // styliser la sonde (ne PAS la colorer en vert)
        probeCell = cell;
        probeCell.style.position = 'fixed';
        probeCell.style.left = HOT_LEFT + 'px';
        probeCell.style.top  = HOT_TOP  + 'px';
        probeCell.style.width  = HOT_SIZE + 'px';
        probeCell.style.height = HOT_SIZE + 'px';
        probeCell.style.margin = '0';
        probeCell.style.transform = 'none';
        probeCell.style.boxSizing = 'border-box';
        probeCell.style.zIndex = '20000';
        probeCell.style.pointerEvents = 'auto';

        // désactiver le bot (UI + état)
        botEnabled = false;
        const tb = document.getElementById('toggleBot');
        if (tb) tb.textContent = 'Enable Bot';

        // au 1er clic sur la sonde : on réactive le bot et on relance solve
        const onProbeClick = () => {
            // petite remise à zéro du layout de la sonde
            resetCellLayout(probeCell);
            probeCell = null;

            // réactiver les clics par défaut
            if (areaBlock) {
                areaBlock.querySelectorAll('.cell').forEach(c => { c.style.pointerEvents = ''; });
            }

            botEnabled = true;
            if (tb) tb.textContent = 'Disable Bot';

            // relancer immédiatement le solve sur l'état courant
            const ab = document.getElementById('AreaBlock');
            if (ab) {
                const m = interpretAreaBlock(ab);
                // relance asynchrone pour sortir proprement du contexte du click
                setTimeout(() => solveAreaBlock(m), 0);
            }

            // enlever ce listener "one-shot"
            probeCell?.removeEventListener('click', onProbeClick, true);
        };
        // capture en phase "true" pour être sûr de passer avant le site
        probeCell.addEventListener('click', onProbeClick, true);
    }

    function getCellRank(el) {
        const col = parseInt(el.getAttribute('data-x') ?? el.id.split('_')[1], 10);
        const row = parseInt(el.getAttribute('data-y') ?? el.id.split('_')[2], 10);
        const distance = Math.sqrt(col - 8.5) ** 2 + Math.sqrt(row - 12.5) ** 2;
        return 1 / distance;
    }

    /** Positionne toutes les cellules rouges exactement au même point (pile) */
    function layoutRedCells() {
        // Trie par rank distance euclidienne au point 8.5, 12.5
        const sorted = [...redCells].sort((a, b) => getCellRank(a) - getCellRank(b));

        // Le plus petit rank sera en dessous, le plus grand au-dessus
        sorted.forEach((el, i) => {
            el.style.position = 'fixed';
            el.style.left = HOT_LEFT + 'px';
            el.style.top  = HOT_TOP  + 'px';
            el.style.width  = HOT_SIZE + 'px';
            el.style.height = HOT_SIZE + 'px';
            el.style.margin = '0';
            el.style.transform = 'none';
            el.style.boxSizing = 'border-box';
            el.style.zIndex = String(100 + i); // i croît avec le rank → au-dessus
            el.style.pointerEvents = 'auto';
        });
    }

    /** Restaure le layout d'origine d'une cellule (sans toucher au DOM ni aux classes) */
    function resetCellLayout(el) {
        el.style.position = '';
        el.style.left = '';
        el.style.top = '';
        el.style.width = '';
        el.style.height = '';
        el.style.margin = '';
        el.style.transform = '';
        el.style.boxSizing = '';
        el.style.zIndex = '';
    }

    function changeStyle(el, button) {
        if (button === 0) { // cellule sûre à cliquer => ROUGE (cliquable)
            el.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
            el.style.border = '2px solid red';
            el.style.pointerEvents = 'auto';
            redCells.add(el);
            layoutRedCells(); // empile au hot-spot
        } else { // cellule à ignorer/flag => VERT (non cliquable ici)
            el.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
            el.style.border = '2px solid green';
            el.style.pointerEvents = 'none';
            if (redCells.has(el)) {
                redCells.delete(el);
                resetCellLayout(el);
                layoutRedCells(); // réajuste la pile
            }
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
                    cursor: move;
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
                <button id="toggleBot"> Disable Bot </button>
                <button id="solve"> Solve </button>
                <button id="log"> Log Advanced Deductions Calculationq </button>
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

        document.getElementById('toggleBot').addEventListener('click', () => {
            botEnabled = !botEnabled;
            document.getElementById('toggleBot').textContent = botEnabled ? 'Disable Bot' : 'Enable Bot';

            // Make all cells clickable when bot is disabled
            const areaBlock = document.getElementById('AreaBlock');
            if (areaBlock) {
                const cells = areaBlock.querySelectorAll('.cell');
                cells.forEach(cell => {
                    cell.style.pointerEvents = 'auto'
                });
            }

            // Clean up red cells when disabling bot
            if (!botEnabled) {
                redCells.forEach(el => resetCellLayout(el));
                redCells.clear();
                if (probeCell) {
                    resetCellLayout(probeCell);
                    probeCell = null;
                }
            }

            console.log('botEnabled', botEnabled);
        });

        document.getElementById('solve').addEventListener('click', () => {
            const areaBlock = document.getElementById('AreaBlock');
            if (areaBlock) {
                const areaBlockMatrix = interpretAreaBlock(areaBlock);
                solveAreaBlock(areaBlockMatrix);
            }
        });

        document.getElementById('log').addEventListener('click', () => {
            const areaBlock = document.getElementById('AreaBlock');
            if (areaBlock) {
                const areaBlockMatrix = interpretAreaBlock(areaBlock);
                advancedDeductions(areaBlockMatrix, true);
            }
        });

        // Make interface draggable
        const nexusInterface = document.querySelector('.nexus-interface');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        nexusInterface.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === nexusInterface) {
                isDragging = true;
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                nexusInterface.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }

        // Keyboard shortcut for spacebar
        document.addEventListener('keydown', (e) => {
            if (e.code === 'KeyD') {
                e.preventDefault();
                botEnabled = !botEnabled;
                document.getElementById('toggleBot').textContent = botEnabled ? 'Disable Bot' : 'Enable Bot';

                // Make all cells clickable when bot is disabled
                const areaBlock = document.getElementById('AreaBlock');
                if (areaBlock) {
                    const cells = areaBlock.querySelectorAll('.cell');
                    cells.forEach(cell => {
                        cell.style.pointerEvents = 'auto'
                    });
                }

                // Clean up red cells when disabling bot
                if (!botEnabled) {
                    redCells.forEach(el => resetCellLayout(el));
                    redCells.clear();
                    if (probeCell) {
                        resetCellLayout(probeCell);
                        probeCell = null;
                    }
                }

                // If bot is enabled, automatically click solve
                if (botEnabled) {
                    const areaBlock = document.getElementById('AreaBlock');
                    if (areaBlock) {
                        const areaBlockMatrix = interpretAreaBlock(areaBlock);
                        solveAreaBlock(areaBlockMatrix);
                    }
                }

                console.log('botEnabled', botEnabled);
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
                    if (redCells.has(cell)) {
                        redCells.delete(cell);
                    }
                    resetCellLayout(cell);
                }
            }
        }


        while (true && botEnabled) {
            // 0. Check if all cells are closed
            let allClosed = true;
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    const cell = document.querySelector(`#cell_${j}_${i}`);
                    if (cell && !cell.classList.contains('hdn_closed')) {
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
                            cell.style.pointerEvents = 'auto';
                        }
                    }
                }
                redCells.forEach(el => resetCellLayout(el));
                redCells.clear();
                return; // Exit the async function if all cells are closed
            } else {
                // Set all closed cells to not clickable
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        const cell = document.querySelector(`#cell_${j}_${i}`);
                        if (cell && cell.classList.contains('hdn_closed')) {
                            cell.style.pointerEvents = 'none';
                        }
                    }
                }
                // Set only red closed cells to clickable
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        const cell = document.querySelector(`#cell_${j}_${i}`);
                        if (cell && cell.classList.contains('hdn_closed') && cell.style.backgroundColor === 'rgba(255, 0, 0, 0.7)') {
                            cell.style.pointerEvents = 'auto';
                        }
                    }
                }
            }


            // 2. If Cell is opened, remove the added style for opened cells
            if (botEnabled) {
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
                                    resetCellLayout(cell);
                                    layoutRedCells();
                                }
                            }
                        }
                    }
                }
            }


            // 4. Click safe cells if all mines are already flagged
            if (botEnabled) {
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        if (areaBlockMatrix[i][j] > 0) {
                            const { hiddenCount, minesCount } = countHiddenAround(areaBlockMatrix, i, j);
                            if (areaBlockMatrix[i][j] === minesCount && hiddenCount > 0) {
                                changeStyleCellsAround(areaBlockMatrix, i, j, false);
                                areaBlockMatrix = interpretAreaBlock(document.getElementById('AreaBlock'));
                                layoutRedCells();
                            }
                        }
                    }
                }
            }

            // 5. Flag mines if all hidden cells must be mines
            if (botEnabled) {
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        if (areaBlockMatrix[i][j] > 0) {
                            const { hiddenCount, minesCount } = countHiddenAround(areaBlockMatrix, i, j);
                            if (areaBlockMatrix[i][j] === hiddenCount + minesCount && hiddenCount > 0) {
                                changeStyleCellsAround(areaBlockMatrix, i, j, true);
                                areaBlockMatrix = interpretAreaBlock(document.getElementById('AreaBlock'));
                                layoutRedCells();
                            }
                        }
                    }
                }
            }

            // 6. Advanced deductions
            if (botEnabled) {
                advancedDeductions(areaBlockMatrix);
            }

            // Re-interpret the board after each round
            areaBlockMatrix = interpretAreaBlock(document.getElementById('AreaBlock'));

            // Si plus aucune rouge, passer en "mode sonde"
            if (redCells.size === 0) {
                const candidate = findClosestClosedNonGreenCell();
                if (candidate) {
                    armProbeMode(candidate);
                    return; // on laisse le click de la sonde relancer solve
                }
            }

            count++;

            await new Promise(resolve => setTimeout(resolve, 60));
        }
    }

    // Initialize interface when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeInterface);
    } else {
        initializeInterface();
    }
})();