export class GridController {
    private readonly maxSizeCell: number = 100;
    private readonly grid: HTMLElement;

    constructor(grid: HTMLElement, countRow: number, countColumn: number) {
        this.grid = grid;
        this.changeSizeGrid(countRow, countColumn);
    }

    public changeSizeGrid(countRow: number, countColumn: number): void {
        const sizeCell: number = this.calculateSizeCell(countColumn);
        const countCell: number = countRow * countColumn;
        const columnGrid: string = `repeat(${countColumn}, ${sizeCell + "px"})`;
        const rowGrid: string = `repeat(${countRow}, ${sizeCell + "px"})`;
        this.grid.style.gridTemplateColumns = columnGrid;
        this.grid.style.gridTemplateRows = rowGrid;

        this.deleteAllCells();

        for (let i: number = 0; i < countCell; i++) {
            this.addCell(i, countRow, countColumn, sizeCell);
        }
    }

    private calculateSizeCell(countColumn: number): number {
        const leftIndentation: number = 30;
        let sizeCell: number = (window.innerWidth - leftIndentation) / countColumn;

        if (sizeCell > this.maxSizeCell) {
            sizeCell = this.maxSizeCell;
        }

        return sizeCell;
    }

    public deleteAllCells(): void {
        const selectDelete: string = ".tic_tac-toe__сell";
        const allBlockCells: NodeListOf<Element> = document.querySelectorAll(selectDelete);
        allBlockCells.forEach(cell => cell.remove());
    }

    public addCell(indexCreated: number, countRow: number, countColumn: number, sizeCell: number): void {
        const newCell: HTMLElement = document.createElement("div");
        const newGameButton: HTMLElement = document.createElement("button");
        this.setStyleCell(indexCreated, countRow, countColumn, newCell);
        this.setStyleGameButton(newGameButton, sizeCell);
        newCell.append(newGameButton);
        this.grid.append(newCell);
    }

    private setStyleCell(indexCreated: number, countRow: number, countColumn: number, cell: HTMLElement): void {
        const defaultStyleCell: string = "tic_tac-toe__сell ";
        const topStyleCell: string = "tic-tac-toe__cell_top-border";
        const rightStyleCell: string = "tic-tac-toe__cell_right-border";
        const bottomStyleCell: string = "tic-tac-toe__cell_bottom-border";
        const leftStyleCell: string = "tic-tac-toe__cell_left-border";

        cell.className = defaultStyleCell;

        const isFirstColumn: boolean = indexCreated % countColumn === 0;
        const isFirstRow: boolean = indexCreated < countColumn;

        if (isFirstColumn) {
            cell.className += leftStyleCell + " ";
        }

        if (isFirstRow) {
            cell.className += topStyleCell + " ";
        }
        cell.className += rightStyleCell + " " + bottomStyleCell;
    }

    private setStyleGameButton(gameButton: HTMLElement, sizeCell: number): void {
        gameButton.className = "tic-tac-toe__button";
        gameButton.style.fontSize = this.calculateFontSize(sizeCell) + "rem";
    }

    private calculateFontSize(sizeCell: number): number {
        return 3 * sizeCell / 100;
    }

    public getCells(): HTMLElement[] {
        return Array.from(document.querySelectorAll(".tic-tac-toe__button"));
    }
}
