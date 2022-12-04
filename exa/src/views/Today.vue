<script>

export default {
  data: function () {
    return {
      chartOptions: {
        title: {
          text: 'Traffic Sources'
        },
        yaxis: {
          title: {
            text: 'Sales',
          },
          lines: {
            show: false,
          }

        },
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
          categories: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"],
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
          data: [12, 47, 160, 271, 280, 110, 98, 80, 170, 135, 74, 55],
        },
      ],
    };
  },
};

</script>

<template>

  <div>



    <div class="columns mt-4">
      <div class="column is-one-half">
        <h4 class="is-size-4">
          Predicted total: <strong>1492</strong> meals.
        </h4>
      </div>

      <div class="column is-one-half has-text-right">
        <p class="is-size-4">
          <RouterLink to="/yesterday">
            ◀️
          </RouterLink>
          <strong>04.12.2022</strong>
          <RouterLink to="/tomorrow">
            ▶️
          </RouterLink>
        </p>
      </div>
    </div>

    <div>
      <apexchart class="mt-6" width="100%" height="400" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
    <h5 class="is-size-4 mt-3">The favorite food for today.</h5>
    <p>The past predictions showed that this food is bought the most for today.</p>
    <div class="columns is-centered mt-5">
      <div class="column is-one-third has-text-centered"><strong>Noodles</strong></div>
      <div class="column is-one-third has-text-centered"><strong>Sushi</strong></div>
      <div class="column is-one-third has-text-centered"><strong>Hot Pot</strong></div>

    </div>
  </div>

</template>
