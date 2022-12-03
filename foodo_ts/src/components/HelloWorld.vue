<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>
<script>
export default {
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },

        grid: {
          show: false
        }

      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
};
</script>
<template>
  <div>
    <h1>👋 Hey foodlab alpine! </h1>
    <div class="p2 bg-white rounded">
      <h2><b>1010</b> Meals today!</h2>
      <div style=" width:75%; margin: 0 auto;">
        <apexchart class="chart" width="100%" type="bar" :options="chartOptions" :series="series">
        </apexchart>
      </div>



    </div>
    <!-- <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3> -->

  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}


👋🏾 h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
