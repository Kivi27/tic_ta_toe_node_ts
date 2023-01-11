export class StyleController {

    public static addStyleCells(allCells: HTMLElement[], nameStyle: string): void {
        allCells.forEach(cell => cell.classList.add(nameStyle));
    }

    public static removeStyleCells(allCells: HTMLElement[], nameStyle: string): void {
        allCells.forEach(cell => cell.classList.remove(nameStyle));
    }

    public static addStyleField(Field: HTMLElement[][], nameStyle: string): void {
        Field.forEach(row => {
            row.forEach(cell => cell.classList.add(nameStyle));
        });
    }

    public static removeStyleField(Field: HTMLElement[][], nameStyle: string): void {
        Field.forEach(row => {
            row.forEach(cell => cell.classList.remove(nameStyle));
        });
    }
}
