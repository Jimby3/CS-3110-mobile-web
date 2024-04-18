import Category from "./Category";
class Budget {
    constructor() {
        this.categories = [];
    }

    // Method to add a category to the budget
    addCategory(category) {
        this.categories.push(category);
    }

    // Method to remove a category from the budget by name
    removeCategoryByName(name) {
        this.categories = this.categories.filter(category => category.name !== name);
    }

    // Method to get total budget amount
    getTotalBudgetAmount() {
        return this.categories.reduce((total, category) => total + category.dollarAmount, 0);
    }

    // Method to print budget details
    printBudget() {
        console.log("Budget:\n===================");
        this.categories.forEach(category => {
            console.log(`Category: ${category.name}`);
            console.log(`Dollar Amount: ${category.dollarAmount}`);
            console.log(`Percentage: ${category.percentage}`);
            console.log("-----------------------------");
        });
    }

    // Static method to construct a Budget object from a JSON representation
    static fromJSON(json) {
        const budget = new Budget();
        if (json && Array.isArray(json.categories)) {
            json.categories.forEach(category => {
                const { _name, _dollarAmount, _percentage } = category;
                const newCategory = new Category(_name);
                newCategory.dollarAmount = parseFloat(_dollarAmount); // Parse dollarAmount as a number
                newCategory.percentage = parseFloat(_percentage); // Parse percentage as a number
                budget.addCategory(newCategory);
            });
        }
        return budget;
    }

    editCategoryByIndex(index, updatedCategory) {
        if (index >= 0 && index < this.categories.length) {
            this.categories[index] = updatedCategory;
        } else {
            throw new Error("Invalid category index");
        }
    }

    getCategoryByIndex(index) {
        if (index >= 0 && index < this.categories.length) {
            return this.categories[index];
        } else {
            throw new Error("Invalid category index");
        }
    }



}

export default Budget;