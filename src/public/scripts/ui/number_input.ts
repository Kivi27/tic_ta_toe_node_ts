export class NumberInput {

    private controlledInput: HTMLInputElement;
    private lowerLimit: number = 0;
    private upperLimit: number = 0;
    private readonly valueStep: number = 0;

    constructor(controlledInput: HTMLInputElement, lowerLimit: number, upperLimit: number, valueStep: number) {
        this.controlledInput = controlledInput;
        this.valueStep = valueStep;
        this.setUpperLimit(upperLimit);
        this.setLowerLimit(lowerLimit);
    }

    private clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }

    public increase(): void {
        this.controlledInput.value = String(+this.controlledInput.value + this.valueStep);
        this.validateRange();
    }

    public decrease(): void {
        this.controlledInput.value = String(+this.controlledInput.value - this.valueStep);
        this.validateRange();
    }

    public maxIncrease(): void {
        this.controlledInput.value = String(this.upperLimit);
        this.validateRange();
    }

    public maxDecrease(): void {
        this.controlledInput.value = String(this.lowerLimit);
        this.validateRange();
    }

    public validateRange(): void {
        this.controlledInput.value =
            String(this.clamp(+this.controlledInput.value, this.lowerLimit, this.upperLimit));
    }

    public getValidateInput(): string {
        return this.controlledInput.value.replace(/\D/g, '');
    }

    public getValueControlledInput(): number {
        return Number(this.controlledInput.value);
    }

    public setValueControlledInput(value: number): void {
        this.controlledInput.value = String(value);
        this.validateRange();
    }

    public setLowerLimit(value: number): void {
        this.lowerLimit = value;
        this.validateRange();
        this.controlledInput.setAttribute("min", String(this.lowerLimit));
    }

    public setUpperLimit(value: number): void {
        this.upperLimit = value;
        this.validateRange();
        this.controlledInput.setAttribute("max", String(this.upperLimit));
    }
}
