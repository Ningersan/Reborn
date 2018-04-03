import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as jwt from 'koa-jwt'
import * as cors from 'kcors'
import * as koaLogger from 'koa-logger'
import * as bodyParser from 'koa-bodyparser'
import { initMongodb, Auth } from './rest/middlewares'
import Loader from './rest/loader'

const app = new Koa()
// include router loader and controller loader
const loader = new Loader(app)

const { config } = <any>app

// mongoose
initMongodb(config.mongodb)

// cors
app.use(
    cors({
        origin: config.cors.origin,
        credentials: config.cors.credentials,
    })
)

// check token
app.use(Auth.errorHandle).use(Auth.verifyToken())

// log
app.use(koaLogger())

// body parse
app.use(bodyParser())

// implement all api
app.use(loader.loadRouter())


app.listen(config.port, () => {
    console.log(`✅ The server is running at http://localhost:${config.port}/`)
})
