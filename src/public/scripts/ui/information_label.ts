export class InformationLabel {
    private infoLabel: HTMLElement;

    constructor(label: HTMLElement) {
        this.infoLabel = label;
    }

    public setInfo(text: string): void {
        this.infoLabel.textContent = text;
    }

    public getInfo(): string | null {
        return this.infoLabel.textContent;
    }

    public clear(): void {
        this.infoLabel.textContent = "";
    }

}
