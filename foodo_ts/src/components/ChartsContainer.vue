<script>
import Monday from './ChartViews/ChartView1.vue'
import Tuesday from './ChartViews/ChartView2.vue'
import Wednesday from './ChartViews/ChartView3.vue'

export default {
  components: {
    Monday,
    Tuesday,
    Wednesday
  },
  data() {
    return {
      currentTab: 'Monday',
      tabs: ['Monday', 'Tuesday', 'Wednesday']
    }
  }
}
</script>

<template>
  <div class="daysales">
    <button
       v-for="tab in tabs"
       :key="tab"
       :class="['tab-button', { active: currentTab === tab }]"
       @click="currentTab = tab"
     >
      {{ tab }}
    </button>
	  <component :is="currentTab" class="tab"></component>
  </div>
  <div class="upload"> 
    hello
  </div>
</template>

<style>
.daysales {
  font-family: sans-serif;
  border-radius: 2px;
  
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 0;
  cursor: pointer;
  background: #ffffff;
  margin-right: 6px;
  margin-bottom: -1px;
  height: 40px;
  width: 20%;

}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #eeefeb;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>