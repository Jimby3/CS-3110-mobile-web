import Goal from "./Goal";

class SavingsGoals {
    constructor() {
        this.goals = [];
    }

    // Method to add a new savings goal
    addGoal(goal) {
        this.goals.push(goal);
    }

    // Method to remove a savings goal by category
    removeGoalByCategory(category) {
        this.goals = this.goals.filter(goal => goal.category !== category);
    }

    // Method to update a savings goal by category
    updateGoalByCategory(category, updatedGoal) {
        const index = this.goals.findIndex(goal => goal.category === category);
        if (index !== -1) {
            this.goals[index] = updatedGoal;
        } else {
            throw new Error("Goal not found");
        }
    }

    // Method to get a savings goal by category
    getGoalByCategory(category) {
        return this.goals.find(goal => goal.category === category);
    }

    static fromJSON(json) {
        const savingsGoals = new SavingsGoals();
        if (json && Array.isArray(json.goals)) {
            json.goals.forEach(goalData => {
                const { category, goalAmount, currentAmount } = goalData;
                const newGoal = new Goal(category);
                newGoal.goalAmount = parseFloat(goalAmount);
                newGoal.currentAmount = parseFloat(currentAmount);
                savingsGoals.addGoal(newGoal);
            });
        }
        console.log("Savings Goals Object:", savingsGoals);
        return savingsGoals;
    }




}

export default SavingsGoals;
