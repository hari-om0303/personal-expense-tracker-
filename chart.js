const chartCanvas = document.getElementById('expense-chart');
let expenseChart = null;

function getChartData() {
    const categoryTotals = {};

    expences.forEach(exp => {
        if (categoryTotals[exp.category]) {
            categoryTotals[exp.category] += exp.amount;
        } else {
            categoryTotals[exp.category] = exp.amount;
        }
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    return { labels, data };
}

function updateChart() {
    const { labels, data } = getChartData();

    if (expenseChart) {
        expenseChart.data.labels = labels;
        expenseChart.data.datasets[0].data = data;
        expenseChart.update();
    } else {
        expenseChart = new Chart(chartCanvas, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Expenses by Category",
                    data: data,
                    backgroundColor: [
                        "#f87171",
                        "#60a5fa",
                        "#34d399",
                        "#fbbf2a",
                        "#a78bfa"
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
    }
}

updateChart();