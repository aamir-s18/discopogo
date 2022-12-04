<script>

export default {
    data: function () {
        return {
            chartOptions: {
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        borderRadiusApplication: "end"
                    }
                },
                fill: {
                    opacity: 1,
                    colors: ["#eb6243"]
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                chart: {
                    toolbar: {
                        show: false
                    },
                    id: "vuechart-example",
                },
                xaxis: {
                    categories: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
                    lines: {
                        show: false,
                    }
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    borderRadiusApplication: "around",
                },
            },
            series: [
                {
                    name: "series-1",
                    data: [10, 54, 232, 250, 154, 120, 87, 98, 230, 180, 142, 88],
                },
            ],
        };
    },
};

</script>
<span class="has-text-primary">Real: 1009.</span>
<template>

    <div>
        <div class="columns mt-4">
            <div class="column is-one-half">
                <h4 class="is-size-4">
                    Predicted total: <strong>1645</strong> meals.
                </h4>
            </div>

            <div class="column is-one-half has-text-right">
                <p class="is-size-4">
                    <RouterLink to="/tomorrow">
                        ◀️
                    </RouterLink>
                    <strong>03.12.2022</strong>
                    <RouterLink to="/">
                        ▶️
                    </RouterLink>
                </p>
            </div>
        </div>
        <div>
            <apexchart class="mt-6" width="100%" height="400" type="bar" :options="chartOptions" :series="series">
            </apexchart>
        </div>
        <h5 class="is-size-4 mt-3">The favorite food for today.</h5>
        <p>The past predictions showed that this food is bought the most for today.</p>
        <div class="columns is-centered mt-5">
            <div class="column is-one-third has-text-centered"><strong>Pizza</strong></div>
            <div class="column is-one-third has-text-centered"><strong>Saussy Bucker</strong></div>
            <div class="column is-one-third has-text-centered"><strong>Hot Pents</strong></div>
        </div>
    </div>

</template>
