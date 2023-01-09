namespace tic_tac_toe {
   export class Player {

        private readonly name:string;
        private readonly gameSymbol:string;

        constructor(name:string, gameSymbol:string) {
            this.name = name;
            this.gameSymbol = gameSymbol;
        }

        public getName() : string {
            return this.name;
        }

        public getGameSymbol() : string {
            return this.gameSymbol;
        }

    }
}