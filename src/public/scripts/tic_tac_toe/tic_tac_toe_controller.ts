namespace tic_tac_toe {

    type HTMLElementsOrNull = HTMLElement[] | null;

    export class TicTacToeController implements Savable {
        private blockGame:boolean = false;
        private limitWin:number = 3;
        private countRow:number;
        private countColumn:number;
        private readonly players:Player[];
        private currentPlayer:Player;
        private gameField:HTMLElement[][];
        private winCells:HTMLElement[];

        private onWin: ((winner: Player, winCells: HTMLElement[]) => void) | undefined;
        private onReset: ((allCells: HTMLElement[][]) => void) | undefined;
        private onDraw: ((allCells: HTMLElement[][]) => void) | undefined;
        private onUpdateUi: (() => void) | undefined;
        private onLoad: (() => void) | undefined;

        constructor(cells:HTMLElement[], countRow:number, countColumn:number, players:Player[]) {
            this.countRow = countRow;
            this.countColumn = countColumn;
            this.players = players;
            this.currentPlayer = this.players[0];
            this.winCells = [];
            this.gameField = [];
            this.createField(cells);
        }

        private createField(cells:HTMLElement[]) : void {
            this.gameField = [];

            for (let i:number = 0, j:number = 0; j < cells.length; i++, j += this.countColumn) {
                this.gameField[i] = cells.slice(j, j + this.countColumn);
            }
        }

        public dynamicChangeField(cells:HTMLElement[], newCountRow:number, newCountColumn:number) : void {
            this.countRow = newCountRow;
            this.countColumn = newCountColumn;
            this.createField(cells);
        }

        public isFieldFill(): boolean {
            let isFill:boolean = true;

            for (let i:number = 0; i < this.countRow; i++) {
                for (let j:number = 0; j < this.countColumn; j++) {
                    const currentValue:string | null = this.gameField[i][j].textContent;

                    if (currentValue === "") {
                        isFill = false;
                        break;
                    }
                }
            }

            return isFill;
        }

        public clearField() : void {
            for (let i:number = 0; i < this.countRow; i++) {
                for (let j:number = 0; j < this.countColumn; j++) {
                    this.gameField[i][j].textContent = "";
                }
            }
            this.currentPlayer = this.players[0];

            if (!this.onReset || !this.onUpdateUi) return;

            this.onReset(this.gameField);
            this.onUpdateUi();
            this.unlockInput();
        }

        private getImageField() : string[][] {
            let field:string[][] = new Array(this.countRow);

            for (let i = 0; i < this.countRow; i++) {
                field[i] = new Array(this.countColumn);

                for (let j = 0; j < this.countColumn; j++) {
                    const cellContext = this.gameField[i][j].textContent;

                    if (cellContext != null) {
                        field[i][j] = cellContext;
                    }
                }
            }
            return field;
        }

        private setImageField(newField:string[][]) : void {
            for (let i:number = 0; i < this.countRow; i++) {
                for (let j:number = 0; j < this.countColumn; j++) {
                    this.gameField[i][j].textContent = newField[i][j];
                }
            }
        }

        public setLimitWin(value:number) : void {
            if (value > 0) {
                this.limitWin = value;
            }
        }

        public getIndexCurrentPlayer() : number {
            return this.players.findIndex(player => player === this.currentPlayer); //TODO ask to find Index and version
        }

        public setOnUpdateUi(callback:() => void) : void {
            this.onUpdateUi = callback;
            this.onUpdateUi();
        }

        public setOnWin(callback:(winner:Player, winCells:HTMLElement[]) => void) {
            this.onWin = callback;
        }

        public setOnReset(callback:(allCells:HTMLElement[][]) => void) {
            this.onReset = callback;
        }

        public setOnDraw(callback:(allCells:HTMLElement[][]) => void) {
            this.onDraw = callback;
        }

        public setOnLoad(callback:() => void) {
            this.onLoad = callback;
        }

        public getCurrentPlayer() : Player {
            return this.currentPlayer;
        }

        public setCurrentPlayer(idx:number) : void {
            this.currentPlayer = this.players[idx];
        }

        public getField() : HTMLElement[][] {
            return this.gameField;
        }

        private changeCurrentPlayer() : void {
            this.currentPlayer = this.currentPlayer === this.players[0]
                ? this.players[1]
                : this.players[0];
        }

        public getStateSave() : any {
            const stateField:string[][] = this.getImageField();
            const indexCurrentPlayer: number = this.getIndexCurrentPlayer();

            return {
                "stateField": stateField,
                "indexCurrentPlayer": indexCurrentPlayer,
            };
        }

        public setStateSave(saveState:any) : void {
            this.setImageField(saveState.stateField);
            this.setCurrentPlayer(saveState.indexCurrentPlayer);

            if (!this.onLoad || !this.onUpdateUi) return;

            this.onLoad();
        }

        private addWinCellOrClear(cell:HTMLElement, playerSymbol:string) : void {
            if (cell.textContent === playerSymbol) {
                this.winCells.push(cell);
            } else {
                this.winCells = [];
            }
        }

        public getWinCell() : HTMLElement[] | null {
            return this.winCells.length === this.limitWin
                ? this.winCells
                : null;
        }

        public lockInput() : void {
            this.blockGame = true;
        }

        public unlockInput() : void {
            this.blockGame = false;
        }

        public collectWinElementsHorizontal(player:Player) : HTMLElementsOrNull {
            const playerSymbol:string = player.getGameSymbol();

            rowLoop: for (let i:number = 0; i < this.countRow; i++) {
                this.winCells = [];

                for (let j:number = 0; j < this.countColumn; j++) {
                    this.addWinCellOrClear(this.gameField[i][j], playerSymbol);

                    if (this.winCells.length === this.limitWin) {
                        break rowLoop;
                    }
                }
            }

            return this.getWinCell();
        }

        public collectWinElementsVertical(player:Player) : HTMLElementsOrNull {
            const playerSymbol:string = player.getGameSymbol();

            columnLoop: for (let j:number = 0; j < this.countColumn; j++) {
                this.winCells = [];

                for (let i:number = 0; i < this.countRow; i++) {
                    this.addWinCellOrClear(this.gameField[i][j], playerSymbol);

                    if (this.winCells.length === this.limitWin) {
                        break columnLoop;
                    }
                }
            }

            return this.getWinCell();
        }

        public collectWinMainDiagonal(player:Player) : HTMLElementsOrNull {
            return this.collectWinElementUpperMainDiagonal(player)
                || this.collectWinElementDownMainDiagonal(player);
        }

        public collectWinElementUpperMainDiagonal(player:Player) : HTMLElementsOrNull {
            const playerSymbol:string = player.getGameSymbol();

            diagonalLoop: for (let numberDiagonal:number = 0; numberDiagonal < this.countColumn; numberDiagonal++) {
                let rowIndex:number = 0;
                this.winCells = [];

                for (let columnIndex:number = numberDiagonal; columnIndex >= 0; columnIndex--) {
                    this.addWinCellOrClear(this.gameField[rowIndex][columnIndex], playerSymbol);

                    if (this.winCells.length === this.limitWin) {
                        break diagonalLoop;
                    }
                    rowIndex++;
                }
            }

            return this.getWinCell();
        }

        public collectWinElementDownMainDiagonal(player:Player) : HTMLElementsOrNull {
            const playerSymbol:string = player.getGameSymbol();

            diagonalLoop: for (let numberDiagonal:number = 1; numberDiagonal < this.countRow; numberDiagonal++) {
                let rowIndex:number = numberDiagonal;
                this.winCells = [];

                for (let columnIndex:number = this.countColumn - 1; columnIndex > numberDiagonal - 1; columnIndex--) {
                    this.addWinCellOrClear(this.gameField[rowIndex][columnIndex], playerSymbol);

                    if (this.winCells.length === this.limitWin) {
                        break diagonalLoop;
                    }
                    rowIndex++;
                }
            }

            return this.getWinCell();
        }

        public collectWinSlayerDiagonal(player:Player) : HTMLElementsOrNull {
            return this.collectWinSlayerUpperDiagonal(player)
                || this.collectWinSlayerDownDiagonal(player);
        }

        public collectWinSlayerUpperDiagonal(player:Player) : HTMLElementsOrNull {
            const playerSymbol:string = player.getGameSymbol();

            diagonalLoop: for (let numberDiagonal:number = this.countColumn - 1; numberDiagonal >= 0; numberDiagonal--) {
                let columnIndex:number = numberDiagonal;
                this.winCells = [];

                for (let rowIndex:number = 0; columnIndex < this.countColumn; rowIndex++) {
                    this.addWinCellOrClear(this.gameField[rowIndex][columnIndex], playerSymbol);

                    if (this.winCells.length === this.limitWin) {
                        break diagonalLoop;
                    }
                    columnIndex++;
                }
            }

            return this.getWinCell();
        }

        public collectWinSlayerDownDiagonal(player:Player) : HTMLElementsOrNull {
            const playerSymbol:string = player.getGameSymbol();

            diagonalLoop: for (let numberDiagonal:number = 1; numberDiagonal < this.countRow; numberDiagonal++) {
                let rowIndex:number = numberDiagonal;
                this.winCells = [];

                for (let columnIndex:number = 0; columnIndex < this.countRow - numberDiagonal; columnIndex++) {
                    this.addWinCellOrClear(this.gameField[rowIndex][columnIndex], playerSymbol);

                    if (this.winCells.length === this.limitWin) {
                        break diagonalLoop;
                    }
                    rowIndex++;
                }
            }

            return this.getWinCell();
        }

        public collectWinElements(player:Player) : HTMLElementsOrNull {
            return this.collectWinElementsHorizontal(player)
                || this.collectWinElementsVertical(player)
                || this.collectWinMainDiagonal(player)
                || this.collectWinSlayerDiagonal(player)
        }

        public isWin() : boolean {
            const winElements = this.collectWinElements(this.currentPlayer);

            return Boolean(winElements);
        }

        public gameStep(pressedEvent:Event) : void {
            const pressedButton:HTMLElement = pressedEvent.target as HTMLElement;
            const isCellAvailable = this.checkCellAvailable(pressedButton);

            if (!isCellAvailable) return;

            pressedButton.textContent = this.currentPlayer.getGameSymbol();
            const isWin:boolean = this.isWin();

            if (!this.onWin || !this.onUpdateUi || !this.onDraw) return;

            if (isWin) {
                this.lockInput();
                this.onWin(this.currentPlayer, this.winCells);
            } else {
                this.changeCurrentPlayer();
                this.onUpdateUi();

                const isFieldNotFill:boolean = !this.isFieldFill();

                if (isFieldNotFill) return;

                this.onDraw(this.gameField);
            }
        }

        public checkCellAvailable(pressedButton:any) : boolean {
            const isGameUnlock:boolean = !this.blockGame;
            const isCellEmpty:boolean = pressedButton.textContent === "";

            return isGameUnlock && isCellEmpty;
        }

    }
}