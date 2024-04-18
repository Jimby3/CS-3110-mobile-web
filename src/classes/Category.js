class Category {
    constructor(name) {
        this.name = name;
        this.percentage = 0
        this.dollarAmount = 0
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
}

export default Category;
