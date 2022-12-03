import { tf, Task, TaskProvider } from '..'

export const food: TaskProvider = {
    getTask(): Task {
        return {
            taskID: 'food',
            displayInformation: {
                taskTitle: 'Food',
                summary: {
                    preview: "Test your model's ability to food consumption.",
                    overview: 'Very simple task to test your model.'
                },
                model: 'Food model',
                tradeoffs: 'Training success strongly depends on label distribution',
                dataFormatInformation: 'Blub',
                dataExampleText: 'Blub',
                dataExample: [
                    { columnName: 'X', columnData: '1' },
                    { columnName: 'Y', columnData: '2' },
                ],
                headers: [
                    'X',
                    'Y',
                ]
            },
            trainingInformation: {
                modelID: 'food-model',
                epochs: 20,
                roundDuration: 10,
                validationSplit: 0,
                batchSize: 1,
                preprocessingFunctions: [],
                modelCompileData: {
                    optimizer: 'rmsprop',
                    loss: 'binaryCrossentropy',
                    metrics: ['accuracy']
                },
                dataType: 'tabular',
                inputColumns: [
                    'X',
                ],
                outputColumns: [
                    'Y'
                ],
                scheme: 'Federated', // secure aggregation not yet implemented for FeAI
                noiseScale: undefined,
                clippingRadius: undefined
            }
        }
    },

    async getModel(): Promise<tf.LayersModel> {
        const model = tf.sequential()
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
        return model
    }
}
