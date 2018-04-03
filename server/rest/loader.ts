import * as fs from 'fs'
import * as path from 'path'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import bp from './blueprint'

class Loader {
    router: Router = new Router()
    controller: any = {}
    app: Koa

    constructor(app: Koa) {
        this.app = app
        this.loadConfig()
    }

    /**
     * read all config in config dir and concat
     * append to Koa instance(app)
     * @memberof Loader
     */
    loadConfig() {
        const isProEnv = process.env.NODE_ENV === 'production'
        const configDef = path.join(__dirname, '../config/config.default.ts')
        const configEnv = path.join(
            __dirname,
            isProEnv ? '../config/config.pro.ts' : '../config/config.dev.ts'
        )
        const conf = require(configEnv)
        const confDef = require(configDef)
        const merge = Object.assign({}, conf, confDef)
        Object.defineProperty(this.app, 'config', {
            get: () => {
                return merge
            },
        })
    }

    loadModel() {
        const dirs = fs.readdirSync(__dirname + '/models')

        Object.defineProperty(this.app.context, 'model', {
            get() {
                // set cache
                if (!(<any>this)['cache']) {
                    ;(<any>this)['cache'] = {}
                }
                const loaded = (<any>this)['cache']

                if (!loaded['model']) {
                    loaded['model'] = {}
                    dirs.forEach(dir => {
                        const splits = dir.split('.')
                        if (
                            !splits.includes('map') &&
                            !splits.includes('DS_Store') &&
                            !splits.includes('base')
                        ) {
                            const name = splits[0]
                            const model = require(__dirname + '/models/' + dir)
                            ;(<any>loaded)[model][name] = model
                        }
                    })
                    return loaded.model
                }
                return loaded.model
            },
        })
    }

    /**
     * set Koa.ctx a global property service
     * you can directly use this.ctx.service.filename.method() in controller
     * scan service dir, bind files' methods to service property
     * use cache to optimize
     * @returns void
     * @memberof Loader
     */
    loadService() {
        const self = this
        const service = fs.readdirSync(__dirname + '/service')

        Object.defineProperty(this.app.context, 'service', {
            get() {
                // set cache
                if (!(<any>this)['cache']) {
                    ;(<any>this)['cache'] = {}
                }
                const loaded = (<any>this)['cache']

                if (!loaded['service']) {
                    loaded['service'] = {}

                    service.forEach(dir => {
                        const splits = dir.split('.')

                        if (
                            !splits.includes('map') &&
                            !splits.includes('DS_Store') &&
                            !splits.includes('base')
                        ) {
                            const name = splits[0]
                            const mod = require(__dirname + '/service/' + dir)
                            loaded['service'][name] = new mod(this, self.app)
                        }
                    })
                    return loaded.service
                }
                return loaded.service
            },
        })
    }

    /**
     * set this.controller.filename.method
     * scan controllers dir and set property
     * @memberof Loader
     */
    loadController() {
        const dirs = fs.readdirSync(__dirname + '/controllers')

        dirs.forEach(filename => {
            if (
                !filename.includes('map') &&
                !filename.includes('DS_Store') &&
                !filename.includes('base')
            ) {
                require(__dirname + '/controllers/' + filename).default
            }
        })
    }

    /**
     * Template [method /api/]: controller[filename][method]
     * this.controller has been create by loadController
     * Resolve template auto
     * note that set new ctx in class everytime
     * @returns router.routes()
     * @memberof Loader
     */
    loadRouter() {
        this.loadModel()
        this.loadService()
        this.loadController()

        const r = bp.getRoute()

        Object.keys(r).forEach(url => {
            r[url].forEach(object => {
                ;(<any>this.router)[object.httpMethod](
                    url,
                    async (ctx: Koa.Context) => {
                        const instance = new object.constructor(ctx, this.app)
                        await instance[object.handler]()
                    }
                )
            })
        })
        return this.router.routes()
    }
}

export default Loader
