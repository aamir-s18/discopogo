<script>
import { tf, browser, EmptyMemory, Memory, Path, Task, data, ModelType, client as clients, fetchTasks } from '@epfml/discojs'
    import { watch, computed, shallowRef, onActivated, onMounted } from 'vue'
    import { useMemoryStore } from '../memory'       
    const memoryStore = useMemoryStore()
    const memory = computed(() =>
    memoryStore.useIndexedDB ? new browser.IndexedDB() : new EmptyMemory())
    const serverUrl = new URL('', `http://localhost:8080`)
    async function getDatas() {
        const task = await FetchTask(serverUrl)
        const source = {
            type: ModelType.SAVED,
            taskID: task.taskID,
            name: task.trainingInformation.modelID
        }
        return [source, task]
    }

    async function FetchTask(serverUrl) {
        try {
            const tasks = await fetchTasks(serverUrl)
            const foodTask = tasks.get("food")            
            return foodTask
        } catch (e) {
            console.log(e)
        }
    }

    const downloadModel = async (source, task) => {    
        const client = new clients.Local(serverUrl, task)
        const model = await client.getLatestModel()    
        await memory.value.saveModel(source, model)
        await memoryStore.initModels()
    }

    const getModel = async (source, task) => {
        if (source !== undefined && await memory.value.contains(source)) {
            return await memory.value.getModel(source)
        }
    }

    const predict = async (source, task) => {
        const model = await getModel(source, task)
        const data = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [12, 1])
        const prediction = model.predict(data)
        console.log(prediction)        
    }

export default {
    beforeMount(){        
        getDatas().then(([source, task]) => {
            downloadModel(source, task)
            predict(source, task)
        })
    },       
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
                    data: [25, 37, 500, 470, 261, 70, 97, 220, 250, 135, 30, 15],
                },
            ],
        };
    },
};

</script>

<template>


    <div class="columns mt-4">
        <div class="column is-one-half">
            <h4 class="is-size-4">
                Predicted total: <strong>2110</strong> meals.
            </h4>
        </div>

        <div class="column is-one-half has-text-right">
            <p class="is-size-4">
                <RouterLink to="/">
                    ◀️
                </RouterLink>
                <strong>05.12.2022</strong>
                <RouterLink to="/yesterday">
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
        <div class="column is-one-third has-text-centered"><strong>Curry</strong></div>
        <div class="column is-one-third has-text-centered"><strong>Rui's rice</strong></div>
        <div class="column is-one-third has-text-centered"><strong>Mai Love</strong></div>
    </div>

</template>
