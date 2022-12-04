import cors from 'cors'
import express from 'express'
import expressWS from 'express-ws'

import { CONFIG } from './config'
import { Router } from './router'
import { TasksAndModels } from './tasks'
import { tf, Task, TaskProvider } from '@epfml/discojs-node'
import * as http from 'http'

export class Disco {
  private readonly _app: express.Application
  private readonly tasksAndModels: TasksAndModels

  constructor() {
    this._app = express()
    this.tasksAndModels = new TasksAndModels()
  }

  public get server(): express.Application {
    return this._app
  }

  // Load tasks provided by default with disco server
  async addDefaultTasks(): Promise<void> {
    await this.tasksAndModels.loadDefaultTasks()
  }

  // If a model is not provided, its url must be provided in the task object
  async addTask(task: Task | TaskProvider, model?: tf.LayersModel | URL): Promise<void> {
    await this.tasksAndModels.addTaskAndModel(task, model)
  }

  serve(port?: number): http.Server {
    const wsApplier = expressWS(this.server, undefined, { leaveRouterUntouched: true })
    const app = wsApplier.app

    app.enable('trust proxy')
    app.use(cors())
    app.use(express.json({ limit: '50mb' }))
    app.use(express.urlencoded({ limit: '50mb', extended: false }))

    const baseRouter = new Router(wsApplier, this.tasksAndModels, CONFIG)
    app.use('/', baseRouter.router)

    const server = app.listen(port ?? CONFIG.serverPort, () => {
      console.log(`Disco Server listening on ${CONFIG.serverUrl.href}`)
    })

    console.info('Disco Server initially loaded the tasks below\n')
    console.table(
      Array.from(this.tasksAndModels.tasksAndModels).map(t => {
        return {
          ID: t[0].taskID,
          Title: t[0].displayInformation.taskTitle,
          'Data Type': t[0].trainingInformation.dataType,
          Scheme: t[0].trainingInformation.scheme
        }
      })
    )
    console.log()

    return server
  }
}

// const food  = {
//   getTask(): Task {
//       return {
//           taskID: 'food',
//           displayInformation: {
//               taskTitle: 'Food',
//               summary: {
//                   preview: "Test your model's ability to food consumption.",
//                   overview: 'Very simple task to test your model.'
//               },
//               model: 'Food model',
//               tradeoffs: 'Training success strongly depends on label distribution',
//               dataFormatInformation: 'Blub',
//               dataExampleText: 'Blub',
//               dataExample: [
//                   { columnName: 'X', columnData: '1' },
//                   { columnName: 'Y', columnData: '2' },
//               ],
//               headers: [
//                   'X',
//                   'Y',
//               ]
//           },
//           trainingInformation: {
//               modelID: 'food-model',
//               epochs: 20,
//               roundDuration: 10,
//               validationSplit: 0,
//               batchSize: 1,
//               preprocessingFunctions: [],
//               modelCompileData: {
//                   optimizer: 'adam',
//                   loss: 'meanSquaredError',
//                   metrics: ['accuracy']
//               },
//               dataType: 'tabular',
//               inputColumns: [
//                   'X',
//               ],
//               outputColumns: [
//                   'Y'
//               ],
//               scheme: 'Federated', // secure aggregation not yet implemented for FeAI
//               noiseScale: undefined,
//               clippingRadius: undefined
//           }
//       }
//   },

//   async getModel(): Promise<tf.LayersModel> {
//       const model = tf.sequential()
//       model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
//       return model
//   }
// }

export async function runDefaultServer(port?: number): Promise<http.Server> {
  const disco = new Disco()
  await disco.addDefaultTasks()
  // await disco.addTask(food)
  return disco.serve(port)
}


// async function runServer() {
//   const disco = new Disco()
//   // Add default tasks provided by the server
//   await disco.addDefaultTasks()
//   // Add your own custom task
//   await disco.addTask(customTask)

//   // You can also provide your own task object containing the URL of the model
//   await disco.addTask({
//     ...
//     trainingInformation: {
//         modelID: 'test-model',
//         epochs: 5,
//         modelURL: 'https://example.com/path/to/your/model.json',
//     }
//     ...
//   })

//   // Or provide an URL separately
//   await disco.addTask(customTask.getTask(), new URL('https://example.com/path/to/your/model.json'))

//   // You can access the underlying Express Application if needed
//   disco.server.use(yourMiddleware)

//   // Start the server
//   disco.serve()
// }

// runServer()
