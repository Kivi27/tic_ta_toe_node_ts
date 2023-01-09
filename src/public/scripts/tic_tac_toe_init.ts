namespace tic_tac_toe {
    type HTMLElementOrNull = HTMLElement | null;

    const saveKeyTicTacToeField:string = "stateGame";
    const saveKeyOldCountColumn:string = "sizeField";
    const saveKeyOldCountWinSymbol:string = "countWinSymbol";
    const nameWinStyle:string = "tic-tac-toe__сell_win";
    const nameDrawStyle:string = "tic-tac-toe__cell_draw";
    const defaultPromptStep:string = "Player's turn:";
    const defaultPromptWin:string = "Winner:";
    const defaultPromptDraw:string = "Draw :)";

    const defaultSizeTicTacToeField:number = 3;
    const defaultCountWinSymbols:number = 2;
    const defaultSizeStepGrid:number = 10;
    const defaultCountWinSymbolStep:number = 1;
    const defaultMaxCountColumn:number = 100;
    const defaultMaxCountSymbolWin:number = defaultSizeTicTacToeField;

    const nameCountWinSymbolBlock:string = "tic-tac-toe-win-symbol";
    const inputCountWinSymbol:HTMLInputElement | null = document.querySelector(`.${nameCountWinSymbolBlock}__input`);
    const buttonUpCount:HTMLElementOrNull = document.querySelector(`.${nameCountWinSymbolBlock}__up-count`);
    const buttonDownCount:HTMLElementOrNull = document.querySelector(`.${nameCountWinSymbolBlock}__down-count`);
    const buttonMaxWinSymbol:HTMLElementOrNull = document.querySelector(`.${nameCountWinSymbolBlock}__max-count`);
    const buttonMinWinSymbol:HTMLElementOrNull = document.querySelector(`.${nameCountWinSymbolBlock}__min-count`);

    const isNotFoundAllHTMlWinSymbolBlock = !buttonUpCount || !buttonDownCount
        || !buttonMinWinSymbol || !buttonMaxWinSymbol || !inputCountWinSymbol;

    if (isNotFoundAllHTMlWinSymbolBlock) {
        throw new Error("Not found HTMLElement from " + nameCountWinSymbolBlock);
    }

    buttonUpCount.addEventListener("click", function () : void {
        countWinSymbolController.increase();
    });

    buttonDownCount.addEventListener("click", function (): void {
        countWinSymbolController.decrease();
    });

    buttonMinWinSymbol.addEventListener("click", function () : void {
        countWinSymbolController.maxDecrease();
    });

    buttonMaxWinSymbol.addEventListener("click", function (): void {
       countWinSymbolController.maxIncrease();
    });

    const countWinSymbolController:NumberInput = new NumberInput(inputCountWinSymbol, defaultCountWinSymbols,
        defaultMaxCountSymbolWin, defaultCountWinSymbolStep);

    const nameResizedBlock:string = "tic-tac-toe-resize-field";
    const inputCountColumnGrid:HTMLInputElement | null = document.querySelector(`.${nameResizedBlock}__input`);
    const buttonUpSize:HTMLElementOrNull = document.querySelector(`.${nameResizedBlock}__up-size`);
    const buttonDownSize:HTMLElementOrNull = document.querySelector(`.${nameResizedBlock}__down-size`);
    const buttonMaxSize:HTMLElementOrNull = document.querySelector(`.${nameResizedBlock}__max-size`);
    const buttonMinSize:HTMLElementOrNull = document.querySelector(`.${nameResizedBlock}__min-size`);
    const buttonApplySetting:HTMLElementOrNull = document.querySelector(".tic-tac-toe-setting__apply-button");

    const isNotFoundAllHTMLResizeField = !inputCountColumnGrid || !buttonUpSize || !buttonUpSize
        || !buttonDownSize || !buttonMaxSize
        || !buttonMinSize || !buttonApplySetting;

    if (isNotFoundAllHTMLResizeField) {
        throw new Error("Not found HTMLElement from " + nameResizedBlock);
    }

    const resizeController:NumberInput = new NumberInput(inputCountColumnGrid, defaultSizeTicTacToeField,
        defaultMaxCountColumn, defaultSizeStepGrid);

    buttonUpSize.addEventListener("click", function () : void {
        resizeController.increase();
        changeCountWinSymbol();
    });

    function changeCountWinSymbol() : void {
        const countColumn:number = Number(resizeController.getValidateInput());
        countWinSymbolController.setUpperLimit(countColumn);
    }

    buttonDownSize.addEventListener("click", function () : void {
        resizeController.decrease();
        changeCountWinSymbol();
    });

    buttonMinSize.addEventListener("click", function () : void {
        resizeController.maxDecrease();
        changeCountWinSymbol();
    });

    buttonMaxSize.addEventListener("click", function (): void {
       resizeController.maxIncrease();
       changeCountWinSymbol();
    });

    buttonApplySetting.addEventListener("click", function () : void {
        const oldCountWinSymbol:number = Number(localStorage.getItem(saveKeyOldCountWinSymbol));
        const oldCountColumn:number = Number(localStorage.getItem(saveKeyOldCountColumn));

        const countWinSymbol:number = countWinSymbolController.getValueControlledInput();
        const countColumn:number = resizeController.getValueControlledInput();

        ticTacToeController.setLimitWin(countWinSymbol);

        const isCountColumnNew:boolean = oldCountColumn !== countColumn;
        const isCountWinNew:boolean = oldCountWinSymbol !== countWinSymbol;

        if (isCountColumnNew || isCountWinNew) {
            changeSizeTicTacToe(countColumn, countColumn);
            Saver.saveObj(saveKeyTicTacToeField, ticTacToeController);
            localStorage.setItem(saveKeyOldCountColumn, String(countColumn));
            localStorage.setItem(saveKeyOldCountWinSymbol, String(countWinSymbol));
        }
    });

    inputCountColumnGrid.addEventListener("input", function () : void {
        this.value = resizeController.getValidateInput();
    });

    inputCountWinSymbol.addEventListener("input", function () : void {
        this.value = countWinSymbolController.getValidateInput();
    });

    inputCountColumnGrid.addEventListener('focusout', function () : void {
        resizeController.validateRange();
        changeCountWinSymbol();
    });

    inputCountWinSymbol.addEventListener('focusout', function () : void {
        countWinSymbolController.validateRange();
        changeCountWinSymbol();
    });

    function changeSizeTicTacToe(countColumn:number, countRow:number) {
        gridController.changeSizeGrid(countColumn, countRow);
        const allCells:HTMLElement[] = gridController.getCells();
        ticTacToeController.clearField();
        initTicTacToeCells(allCells);
        ticTacToeController.dynamicChangeField(allCells, countColumn, countRow);
    }

    const gridTicTacToe:HTMLElementOrNull = document.querySelector(".tic-tac-toe-grid");
    const resetButton:HTMLElementOrNull = document.querySelector(".tic-tac-toe-setting__reset-button");
    const labelPlayerName:HTMLElementOrNull = document.querySelector(".tic-tac-toe-game__player-name");
    const labelStatusStep:HTMLElementOrNull = document.querySelector(".tic-tac-toe-game__status-step");
    const countColumnAndRow:number = resizeController.getValueControlledInput();

    const labelGameFirstPlayerScore:HTMLElementOrNull = document.querySelector(".tic-tac-toe-analytic__game-score-x");
    const labelGameSecondPlayerScore:HTMLElementOrNull = document.querySelector(".tic-tac-toe-analytic__game-score-o");
    const labelSessionFirstPlayerScore:HTMLElementOrNull = document.querySelector(".tic-tac-toe-analytic__session-score-x");
    const labelSessionSecondPlayerScore:HTMLElementOrNull = document.querySelector(".tic-tac-toe-analytic__session-score-o");

    const isNotFoundAllHTMLTicTacToe = !gridTicTacToe || !resetButton;
    const isNotFoundAllLabels = !labelPlayerName || !labelStatusStep || !labelGameFirstPlayerScore
        || !labelGameSecondPlayerScore || !labelSessionFirstPlayerScore || !labelSessionSecondPlayerScore;

    if (isNotFoundAllHTMLTicTacToe || isNotFoundAllLabels) {
        throw new Error("Not found HTMLElement from " + nameResizedBlock);
    }

    const player1:Player = new Player("Player 1", "X");
    const player2:Player = new Player("Player 2", "O");
    const players:Player[] = [player1, player2];

    const scoreGameFirstPlayer:Score = new Score(labelGameFirstPlayerScore, player1);
    const scoreSessionFirstPlayer:Score = new Score(labelSessionFirstPlayerScore, player1);
    const scoreGameSecondPlayer:Score = new Score(labelGameSecondPlayerScore, player2);
    const scoreSessionSecondPlayer:Score = new Score(labelSessionSecondPlayerScore, player2);

    const gameScores:Score[] = [scoreGameFirstPlayer, scoreGameSecondPlayer];
    initScore(gameScores, localStorage);

    const sessionScores:Score[] = [scoreSessionFirstPlayer, scoreSessionSecondPlayer];
    initScore(sessionScores, sessionStorage);

    const scores:Score[] = [...gameScores, ...sessionScores];

    function initScore(scores:Score[], storage:any) : void { // TODO ask a mentor about storage
        assignStorage(scores, storage);
        tryLoadScores(scores, storage);
    }

    function assignStorage(scores:Score[], storage:any) : void {
        for (let score of scores) {
            score.setOnUpdateUi(() => {
                const player:Player = score.getPlayer();
                storage.setItem(player.getGameSymbol(), String(score.getLabelScoreValue()));
            });
        }
    }

    function tryLoadScores(scores:Score[], storage:any) : void {
        for (let score of scores) {
            const player:Player = score.getPlayer();
            let valueStorage:string = storage.getItem(player.getGameSymbol());
            if (valueStorage) {
                score.setLabelScoreValue(valueStorage);
            }
        }
    }

    const gridController:GridController = new GridController(gridTicTacToe, countColumnAndRow, countColumnAndRow);
    const cellsTicTacToe:HTMLElement[] = gridController.getCells();

    initTicTacToeCells(cellsTicTacToe);

    function initTicTacToeCells(cells:HTMLElement[]) : void {
        for (let cell of cells) {
            cell.addEventListener("click", (pressedButton) => {
                ticTacToeController.gameStep(pressedButton);
                Saver.saveObj(saveKeyTicTacToeField, ticTacToeController);
            });
        }
    }

    const ticTacToeController:TicTacToeController = new TicTacToeController(cellsTicTacToe, countColumnAndRow,
        countColumnAndRow, players);

    const currentPlayerInfo:InformationLabel = new InformationLabel(labelPlayerName);
    const statusStepInfo:InformationLabel = new InformationLabel(labelStatusStep);

    ticTacToeController.setOnLoad(() => {
        const isWin:boolean = ticTacToeController.isWin();
        if (isWin) {
            const winCells = ticTacToeController.getWinCell()

            if (!winCells) return;

            StyleController.addStyleCells(winCells, nameWinStyle);
            ticTacToeController.lockInput();
            currentPlayerInfo.clear();
            statusStepInfo.setInfo(defaultPromptWin + " ");
        }

        const isDraw:boolean = ticTacToeController.isFieldFill();

        if (isDraw) {
            const gameField:HTMLElement[][] = ticTacToeController.getField();
            displayDraw(gameField);
        }
    });

    function displayDraw(allCells:HTMLElement[][]) : void {
        StyleController.addStyleField(allCells, nameDrawStyle);
        statusStepInfo.setInfo(defaultPromptDraw);
        currentPlayerInfo.clear();
    }

    ticTacToeController.setOnUpdateUi(() => {
        const currentPlayerName:string = ticTacToeController.getCurrentPlayer().getName();
        currentPlayerInfo.setInfo(currentPlayerName);
    });

    ticTacToeController.setOnWin((winner:Player, winCells:HTMLElement[]) => {
        scores.forEach(score => {
            if (score.getPlayer() === winner) {
                const oldValue = score.getLabelScoreValue();
                score.setLabelScoreValue(String(oldValue + 1));
            }
        });
        StyleController.addStyleCells(winCells, nameWinStyle);
        statusStepInfo.setInfo(defaultPromptWin + " " + winner.getName());
        currentPlayerInfo.clear();
    });

    ticTacToeController.setOnReset(allCells => {
        StyleController.removeStyleField(allCells, nameWinStyle);
        StyleController.removeStyleField(allCells, nameDrawStyle);
        statusStepInfo.setInfo(defaultPromptStep);
    });

    ticTacToeController.setOnDraw(allCells => {
        displayDraw(allCells);
    });

    resetButton.addEventListener("click", () => {
        ticTacToeController.clearField();
        Saver.saveObj(saveKeyTicTacToeField, ticTacToeController);
    });

    window.onstorage = () => {
        tryRestoreTicTacToeState();
        tryLoadScores(gameScores, localStorage);
    }

    tryRestoreTicTacToeState();

    function tryRestoreTicTacToeState() : void {
        const oldSizeField:number = Number(localStorage.getItem(saveKeyOldCountColumn));
        const oldCountWinSymbol:number = Number(localStorage.getItem(saveKeyOldCountWinSymbol));

        if (!oldSizeField) {
            localStorage.setItem(saveKeyOldCountColumn, String(defaultSizeTicTacToeField));
        } else if (!oldCountWinSymbol) {
            localStorage.setItem(saveKeyOldCountColumn, String(defaultCountWinSymbols));
        } else if (localStorage.getItem(saveKeyTicTacToeField) && localStorage.getItem(saveKeyOldCountWinSymbol)) {
            countWinSymbolController.setValueControlledInput(oldCountWinSymbol);
            resizeController.setValueControlledInput(oldSizeField);
            changeSizeTicTacToe(oldSizeField, oldSizeField);
            Saver.loadObj(saveKeyTicTacToeField, ticTacToeController);
        }
    }
}