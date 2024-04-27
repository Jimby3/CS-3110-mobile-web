class Category {
    constructor(name) {
        this.name = name;
        this.percentage = 0
        this.dollarAmount = 0
        this.trueDollar = false
    }

    // Getter methods
    get name() {
        return this._name;
    }

    get percentage() {
        return this._percentage;
    }

    get dollarAmount() {
        return this._dollarAmount;
    }

    get trueDollar() {
        return this._trueDollar;
    }

    // Setter for trueDollar
    set trueDollar(value) {
        this._trueDollar = value;
    }

    // Setter methods
    set name(name) {
        this._name = name;
    }

    set percentage(percentage) {
        this._percentage = percentage;
    }

    set dollarAmount(dollarAmount) {
        this._dollarAmount = dollarAmount;
    }

    toObject() {
        return {
            name: this.name,
            dollarAmount: this.dollarAmount,
            percentage: this.percentage
        };
    }
}

export default Category;
