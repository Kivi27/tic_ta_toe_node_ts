import { Savable } from "./savable";

export class Saver {

    public static saveObj(keySave: string, saveObj: Savable): void {
        const saveState = saveObj.getStateSave();
        localStorage.setItem(keySave, JSON.stringify(saveState));
    }

    static loadObj(keySave: string, saveObj: Savable): void {
        const objFromStorage: null | string = localStorage.getItem(keySave);

        if (objFromStorage == null) return;

        const saveState = JSON.parse(objFromStorage);
        saveObj.setStateSave(saveState);
    }
}