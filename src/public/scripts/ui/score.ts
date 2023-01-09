namespace tic_tac_toe {
    export class Score {

        private readonly player:Player;
        private labelScore:HTMLElement;
        private onUpdateUi: (() => void) | undefined;

        constructor(labelScore:HTMLElement, player: Player) {
            this.labelScore = labelScore;
            this.player = player;
        }

        public setOnUpdateUi(callback: () => void) : void {
            this.onUpdateUi = callback;
        }

        public getLabelScoreValue() : number {
            return Number(this.labelScore.textContent);
        }

        public setLabelScoreValue(newValue:string) : void {
            this.labelScore.textContent = newValue;

            if (!this.onUpdateUi) return;

            this.onUpdateUi();
        }

        public getPlayer() : Player {
            return this.player;
        }
    }
}