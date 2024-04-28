class Goal {
    constructor(category) {
        this.category = category;
        this.goalAmount = 0;
        this.currentAmount = 0;
    }

    // Getter methods
    get category() {
        return this._category;
    }

    get goalAmount() {
        return this._goalAmount;
    }

    get currentAmount() {
        return this._currentAmount;
    }

    // Setter methods
    set category(category) {
        this._category = category;
    }

    set goalAmount(goalAmount) {
        this._goalAmount = goalAmount;
    }

    set currentAmount(currentAmount) {
        this._currentAmount = currentAmount;
    }

    // Method to convert Goal object to a plain object
    toObject() {
        return {
            category: this.category,
            goalAmount: this.goalAmount,
            currentAmount: this.currentAmount
        };
    }
}

export default Goal;
