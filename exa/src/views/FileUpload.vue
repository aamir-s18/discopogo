<template>
    <h1 class="is-size-3">🤖🌍 Train the model</h1>
    <p>To train please upload a CSV file containing the following rows:</p>
    <div class="tags mt-3">
        <span class="tag">7_Day_EMAverage</span>
        <span class="tag">SalesDayPrevYear</span>
        <span class="tag">is_holiday</span>
        <span class="tag">is_raining</span>
        <span class="tag">has_terrace</span>
        <span class="tag">gps_long</span>
        <span class="tag">gps_lat</span>
        <span class="tag">avg_meal_price</span>
        <span class="tag">is_weekend</span>
        <span class="tag">month</span>
    </div>
    <div class="drop" :class="getClasses" @dragover.prevent="dragOver" @dragleave.prevent="dragLeave"
        @drop.prevent="drop($event)">

        <h1 id="filediv">Drop a file</h1>

        <div class="manual">
            <label for="uploadmyfile">
                <p>or pick from device</p>
            </label>
            <input type="file" id="uploadmyfile" :accept="'csv/*'" multiple @change="requestUploadFile">
        </div>

    </div>
    <button id="lock" class="button is-light mt-2 is-fullwidth">T̵r̵a̵i̵n̵</button>
    <button type="button" v-on:click="train" id="unlock" class="button is-success mt-2 is-fullwidth"
        style="display: none;">Train</button>
    <pre id="debug" class="mt-2 mb-2" style="display: none;"></pre>
</template>
  

  
<script lang="ts">

import { computed, defineProps, ref } from 'vue'
import { data, Task, fetchTasks, browser, tf, Disco, TrainingSchemes } from '@epfml/discojs'
import * as d3 from 'd3'
import { DatasetBuilder, DataSplit } from '@epfml/discojs/dist/core/dataset'


const csvRows = ref<{ filename: string, label: string }[]>()

var dataset;



const readCsv = (files: FileList) => {
    files[0].text().then(file => { csvRows.value = d3.csvParse(file) })
}

class NodeTabularLoader extends data.TabularLoader<string> {
    loadTabularDatasetFrom(source: string, csvConfig: Record<string, unknown>): tf.data.CSVDataset {
        console.log('loading!>>', source)
        return tf.data.csv(source, csvConfig)
    }
}

export default {
    name: 'DropImages',
    data() {
        return {
            isDragging: false,
            imageSources: []
        }
    },
    computed: {
        getClasses() {
            return { isDragging: this.isDragging }
        }
    },
    methods: {
        dragOver() {
            this.isDragging = true
        },
        dragLeave() {
            this.isDragging = false
        },
        drop(e) {

            if (e.dataTransfer.files.length) {
                this.isDragging = false
                this.$emit('files-dropped', [...e.dataTransfer.files])
                console.log(e.dataTransfer.files[0])
                document.getElementById("filediv").textContent = e.dataTransfer.files[0].name;
                readCsv(e.dataTransfer.files)
                console.log(csvRows)

                async function FetchTask(): Promise<[DataSplit, Task]> {
                    try {
                        const tasks = await fetchTasks(new URL("", "http://localhost:8080"))
                        const foodTask = tasks.get("food") as Task
                        console.log(foodTask)
                        console.log(typeof (e.dataTransfer.files[0]))
                        const dataloader = await (new browser.data.WebTabularLoader(foodTask, ",").loadAll(
                            Array.from(e.dataTransfer.files), {
                            features: foodTask.trainingInformation.inputColumns,
                            labels: foodTask.trainingInformation.outputColumns,
                            shuffle: false,
                        })
                        )
                        return [dataloader, foodTask]
                    } catch (e) {
                        console.log(e)
                    }
                }
                FetchTask().then(([datasetBuilder, task]) => {
                    dataset = datasetBuilder
                    document.getElementById("lock").style.display = "none";
                    document.getElementById("unlock").style.display = "block";
                    console.log("dataset", dataset)
                })

            }

        },
        requestUploadFile() {
            var src = document.getElementById("uploadmyfile");
            this.drop({ dataTransfer: src })
        },
        getBase64(file) {
            const reader = new FileReader()
            return new Promise(resolve => {
                reader.onload = ev => {
                    resolve(ev.target.result)
                }
                reader.readAsDataURL(file)
            })
        },
        train() {
            console.log("train")
            async function runUser(url: URL, task: Task, dataset: data.DataSplit): Promise<void> {
                // Start federated training
                const disco = new Disco(task, { url, scheme: TrainingSchemes.FEDERATED },)
                await disco.fit(dataset)


                disco.logs().then((logs) => {
                    document.getElementById("debug").innerText += "Epochs: " + logs.epochs + "\n";
                    document.getElementById("debug").innerText += "Loss: " + logs.loss + "\n";
                    document.getElementById("debug").innerText += "Train Accuracy: " + logs.trainAccuracy + "\n";
                    document.getElementById("debug").innerText += "Validation Accuracy: " + logs.validationAccuracy + "\n";
                })
                // Stop training and disconnect from the remote server
                document.getElementById("unlock").style.display = "none";
                document.getElementById("lock").style.display = "block";
                await disco.close()
            }

            async function runClient(dataset): Promise<void> {
                const serverUrl = new URL('', `http://localhost:8080`)
                const tasks = await fetchTasks(serverUrl)

                // console.log("tasks", tasks)
                // Choose your task to train
                const task = tasks.get('food') as Task

                // Add more users to the list to simulate more clients
                await Promise.all([
                    runUser(serverUrl, task, dataset),
                    //  runUser(serverUrl, task, dataset),
                    //  runUser(serverUrl, task, dataset)
                ])
            }
            document.getElementById("debug").innerText = "";
            document.getElementById("debug").style.display = "block";
            document.getElementById("debug").innerText = "Training Started\n";
            runClient(dataset).then(() => console.log("done"))
        }

    }
}


</script>
  
  
  
<style scoped>
.drop {
    width: 100%;
    height: 300px;
    background-color: #eee;
    border: 10px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    transition: background-color .2s ease-in-out;
    font-family: sans-serif;
    overflow: hidden;
    position: relative;
}

.manual {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: .8rem;
    text-decoration: underline;
}

#uploadmyfile {
    display: none;
}
</style>