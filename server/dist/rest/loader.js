"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
class Loader {
    constructor(app) {
        this.router = new Router();
        this.controller = {};
        this.app = app;
    }
    /**
     * read all config in config dir and concat
     * append to Koa instance(app)
     * @memberof Loader
     */
    loadConfig() {
        const isProEnv = process.env.NODE_ENV === 'production';
        const configDef = path.join(__dirname, '../config/config.default.js');
        const configEnv = path.join(__dirname, isProEnv ? '../config/config.pro.js' : '../config/config.dev.js');
        const conf = require(configEnv);
        const confDef = require(configDef);
        const merge = Object.assign({}, conf, confDef);
        Object.defineProperty(this.app, 'config', {
            get: () => {
                return merge;
            },
        });
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
        const self = this;
        const service = fs.readdirSync(__dirname + '/service');
        Object.defineProperty(this.app.context, 'service', {
            get() {
                // set cache
                if (!this['cache']) {
                    ;
                    this['cache'] = {};
                }
                const loaded = this['cache'];
                if (!loaded['service']) {
                    loaded['service'] = {};
                    service.forEach(dir => {
                        const splits = dir.split('.');
                        if (!splits.includes('map') &&
                            !splits.includes('DS_Store')) {
                            const name = splits[0];
                            const mod = require(__dirname + '/service/' + dir);
                            loaded['service'][name] = new mod(this, self.app);
                        }
                    });
                    return loaded.service;
                }
                return loaded.service;
            },
        });
    }
    /**
     * set this.controller.filename.method
     * scan controllers dir and set property
     * @memberof Loader
     */
    loadController() {
        // read all dirs
        const dirs = fs.readdirSync(__dirname + '/controllers');
        dirs.forEach(filename => {
            // filename as controller's property
            const splits = filename.split('.');
            if (!splits.includes('map') && !splits.includes('DS_Store')) {
                const property = splits[0];
                // mod: [Function: Controller] [Function: User]
                const mod = require(__dirname + '/controllers/' + filename)
                    .default;
                if (mod) {
                    // find all property
                    const methodNames = Object.getOwnPropertyNames(mod.prototype).filter(names => {
                        if (names !== 'constructor') {
                            return names;
                        }
                    });
                    Object.defineProperty(this.controller, property, {
                        get() {
                            const merge = {};
                            methodNames.forEach(name => {
                                merge[name] = {
                                    type: mod,
                                    methodName: name,
                                };
                            });
                            return merge;
                        },
                    });
                }
            }
        });
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
        this.loadController();
        this.loadService();
        this.loadConfig();
        const mod = require(__dirname + '/router.js');
        const routers = mod(this.controller);
        Object.keys(routers).forEach(key => {
            const [method, path] = key.split(' ');
            this.router[method](path, async (ctx) => {
                const _class = routers[key].type;
                const handle = routers[key].methodName;
                const instance = new _class(ctx, this.app);
                instance[handle]();
            });
        });
        return this.router.routes();
    }
}
exports.default = Loader;