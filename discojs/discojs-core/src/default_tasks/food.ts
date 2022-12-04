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
                    /*
                    7_Day_EMAverage', 'SalesDayPrevYear', 'is_holiday', 'is_raining',
                    'has_terrace', 'gps_long', 'gps_lat', 'avg_meal_price', 'is_weekend',
                    'month'
                    */
                    { columnName: '7_Day_EMAverage', columnData: '0.0' },
                    { columnName: 'SalesDayPrevYear', columnData: '0.5' },
                    { columnName: 'is_holiday', columnData: '0' },
                    { columnName: 'is_raining', columnData: '0' },
                    { columnName: 'has_terrace', columnData: '0' },
                    { columnName: 'gps_long', columnData: '0.0' },
                    { columnName: 'gps_lat', columnData: '0.0' },
                    { columnName: 'avg_meal_price', columnData: '0.0' },
                    { columnName: 'is_weekend', columnData: '0' },
                    { columnName: 'month', columnData: '0' },
                    { columnName: 'item_cnt_day', columnData: '2' },
                ],
                headers: [
                    '7_Day_EMAverage',
                    'SalesDayPrevYear',
                    'is_holiday',
                    'is_raining',
                    'has_terrace',
                    'gps_long',
                    'gps_lat',
                    'avg_meal_price',
                    'is_weekend',
                    'month',
                    'item_cnt_day',
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
                    optimizer: 'adam',
                    loss: 'meanSquaredError',
                    metrics: ['accuracy']
                },
                dataType: 'tabular',
                inputColumns: [
                    '7_Day_EMAverage',
                    'SalesDayPrevYear',
                    'is_holiday',
                    'is_raining',
                    'has_terrace',
                    'gps_long',
                    'gps_lat',
                    'avg_meal_price',
                    'is_weekend',
                    'month',
                ],
                outputColumns: [
                    'item_cnt_day'
                ],
                scheme: 'Federated', // secure aggregation not yet implemented for FeAI
                noiseScale: undefined,
                clippingRadius: undefined
            }
        }
    },

    async getModel(): Promise<tf.LayersModel> {
        const model = tf.sequential()
        model.add(tf.layers.dense({ units: 1, inputShape: [10] }))
        return model
    }
}
