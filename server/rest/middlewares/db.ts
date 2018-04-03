import * as mongoose from 'mongoose'

const init = (path: string) => {
    mongoose.connect(path).then(
        () => {
            console.log(`Connected to database: ${path}`);
        },
        error => {
            console.log(`Unable to connect to database: ${path}`)
        }
    )
}

export default init
