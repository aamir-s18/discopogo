import { data, Disco, fetchTasks, Task } from '@epfml/discojs-node'
import { run } from 'node:test'

// import { startServer } from './start_server'
import { foodData } from './data'

/**
 * Example of discojs API, we load data, build the appropriate loggers, the disco object
 * and finally start training.
 */
async function runUser(url: URL, task: Task, dataset: data.DataSplit): Promise<void> {
  // Start federated training
  const disco = new Disco(task, { url })
  await disco.fit(dataset)

  // Stop training and disconnect from the remote server
  await disco.close()
}

export async function runClient(): Promise<void> {
  const serverUrl = new URL('', `http://localhost:8080`)
  const tasks = await fetchTasks(serverUrl)

  // console.log("tasks", tasks)
  // Choose your task to train
  const task = tasks.get('food') as Task


  const dataset = await foodData(task)

  // Add more users to the list to simulate more clients
  await Promise.all([
    runUser(serverUrl, task, dataset),
    //  runUser(serverUrl, task, dataset),
    //  runUser(serverUrl, task, dataset)
  ])
}


// async function main (): Promise<void> {

//   const [server, serverUrl] = await startServer()
//   const tasks = await fetchTasks(serverUrl)

//   // Choose your task to train
//   const task = tasks.get('food') as Task

//   const dataset = await foodData(task)

//   // Add more users to the list to simulate more clients
//   await Promise.all([
//     runUser(serverUrl, task, dataset),
//     runUser(serverUrl, task, dataset),
//     runUser(serverUrl, task, dataset)
//   ])

//   await new Promise((resolve, reject) => {
//     server.once('close', resolve)
//     server.close(reject)
//   })
// }

runClient().catch(console.error)
