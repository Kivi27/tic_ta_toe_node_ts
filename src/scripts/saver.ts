namespace tic_tac_toe {
    export class Saver {

        public static saveObj(keySave:string, saveObj:Savable) : void {
            const saveState = saveObj.getStateSave();
            localStorage.setItem(keySave, JSON.stringify(saveState));
        }

        static loadObj(keySave, saveObj:Savable) : void {
            const saveState = JSON.parse(localStorage.getItem(keySave));
            saveObj.setStateSave(saveState);
        }
    }
}