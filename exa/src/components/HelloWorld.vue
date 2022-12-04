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
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 110, 120, 150],
        },
      ],
    };
  },
};

</script>

<template>

  <div class="content mt-6">
    <div class="columns">
      <div class="column is-two-thirds">
        <RouterLink to="/">
          <h1 class="h1">👋🏾 Hey Piano!</h1>
        </RouterLink>
      </div>
      <div class="column is-one-third" style="text-align:right">

        <button class="button is-light mr-2">🚀 Stats</button>

        <RouterLink to="/train">
          <button class=" button is-primary">Train your model!</button>
        </RouterLink>

      </div>
    </div>
  </div>
</template>
