import Category from "./Category"
import Chart from 'chart.js/auto';

class Budget {
    constructor() {
        this.categories = [];
        this.chartInstance = null;
        this.income = 0;
    }

    // Getter for income
    get income() {
        return this._income;
    }

    // Setter for income
    set income(value) {
        // Perform validation or additional logic if needed
        this._income = value;
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





    fillBudget() {
        // Calculate total dollar amount
        const totalDollarAmount = this.categories.reduce((total, category) => total + category.dollarAmount, 0);

        // Log the total dollar amount to check its value
        console.log("Total Dollar Amount:", totalDollarAmount);

        // Iterate through each category and fill it based on its type
        this.categories.forEach(category => {
            if (category.percentage !== 0) {
                // Fill category based on percentage
                category.dollarAmount = (category.percentage / 100) * this.income;
            } else {
                // Fill category based on dollar amount
                category.percentage = (category.dollarAmount / totalDollarAmount) * 100;
            }
        });

        // Log the categories after filling to check their values
        console.log("Categories after filling:", this.categories);
    }



    // Method to generate pie chart data
    generatePieChartData() {
        const labels = this.categories.map(category => category.name);
        const data = this.categories.map(category => category.percentage);
        return { labels, data };
    }

    // Method to visualize the budget as a pie chart
    async visualizeAsPieChart(pieChartData) {
        const ctx = document.getElementById('pie-chart');

        try {
            // Destroy existing chart synchronously
            if (this.chartInstance) {
                this.chartInstance.destroy();
            }

            // Wait for the destruction of the existing chart to complete
            await new Promise(resolve => setTimeout(resolve, 0));

            // Create new chart
            this.chartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: pieChartData.labels,
                    datasets: [{
                        label: 'Budget Distribution',
                        data: pieChartData.data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                            // Add more colors as needed
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Budget Distribution'
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error visualizing pie chart:', error);
        }
    }
}

    export default Budget;