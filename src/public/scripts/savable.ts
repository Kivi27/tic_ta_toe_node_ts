export interface Savable {
    getStateSave(): any;

    setStateSave(saveState: any): void;
}
