namespace tic_tac_toe {
    export interface Savable {
        getStateSave() : any;
        setStateSave(saveState:any) : void;
    }
}
