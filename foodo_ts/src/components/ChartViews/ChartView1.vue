<template>
       <div class="content">
        <h2><b>1010</b> Meals today!</h2>
      <div style=" width:75%; margin: 0 auto; ">
        <apexchart class="chart" width="100%" type="bar" :options="chartOptions" :series="series">
        </apexchart>
      </div>
    </div>
</template>

<style scoped>

.content{
background: #eeefeb;  
border-radius: 0 .25em .25em .25em;
min-height: 20em;  
position: relative;
width: 100%;
z-index: 5;
border-style: hidden;
}
</style>
<script>

export default {
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
          toolbar: {
            show: false}
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