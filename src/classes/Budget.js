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
            json.categories.forEach(categoryData => {
                const { _name, _dollarAmount, _percentage, _trueDollar } = categoryData;
                const newCategory = new Category(_name);
                newCategory.dollarAmount = parseFloat(_dollarAmount); // Parse dollarAmount as a number
                newCategory.percentage = parseFloat(_percentage); // Parse percentage as a number
                newCategory.trueDollar = _trueDollar;
                budget.addCategory(newCategory);
            });
        }

        // Deserialize chart instance
        if (json && json.chartInstance) {
            budget.chartInstance = json.chartInstance;
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


    // this takes the categories that are filled with a percentage or dollar amount and fills the other respectively
    correctBudgetOffIncome() {
        // Iterate through each category
        this.categories.forEach(category => {
            if (category.trueDollar === true) {
                // Set percentage based on dollars
                category.percentage = (category.dollarAmount / this.income) * 100;
            } else {
                // Set dollars based on percentage
                category.dollarAmount = (category.percentage / 100) * this.income;
            }
        });

        // Log the categories after updating to check their values
        console.log("Categories after correction:", this.categories);
    }

    generatePieChartData() {
        const labels = this.categories.map(category => category.name);
        const data = this.categories.map(category => category.percentage); // Assuming categories have a percentage property
        return { labels, data };
    }


    // Method to create a pie chart
    createPieChart() {
        try {
            const ctx = document.getElementById('pie-chart').getContext('2d');
            const pieChartData = this.generatePieChartData();

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
            console.log(error)
            this.updatePieChart()

        }
    }


    // Method to update the pie chart with current data
    updatePieChart() {
        if (this.chartInstance) {
            const pieChartData = this.generatePieChartData();

            // Update chart data
            this.chartInstance.data.labels = pieChartData.labels;
            this.chartInstance.data.datasets[0].data = pieChartData.data;

            // Update the chart
            this.chartInstance.update();
        } else {
            console.error('Pie chart has not been created yet.');
        }
    }

}

    export default Budget;