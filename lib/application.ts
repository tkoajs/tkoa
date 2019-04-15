'use strict';

/**
 * Module dependencies.
 */

import onFinished = require('on-finished');
import compose = require('koa-compose');
import isJSON = require('koa-is-json');
import statuses = require('statuses');
import Emitter = require('events');
import util = require('util');
import Stream = require('stream');
import http = require('http');
import only = require('only');
import context = require('./context');
import request = require('./request');
import response = require('./response');
const debug = require('debug')('koa:application');

/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */

export = class Application extends Emitter {

    /**
     * Initialize a new `Application`.
     *
     * @api public
     */

    proxy: boolean;
    middleware: any[];
    subdomainOffset: number;
    env: string;
    context: any;
    request: any;
    response: any;
    silent: any;

    constructor() {
        super();

        this.proxy = false;
        this.middleware = [];
        this.subdomainOffset = 2;
        this.env = process.env.NODE_ENV || 'development';
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
        if (util.inspect.custom) {
            this[util.inspect.custom] = this.inspect;
        }
    }

    /**
     * Shorthand for:
     *
     *    http.createServer(app.callback()).listen(...)
     *
     * @param {Mixed} ...
     * @return {Server}
     * @api public
     */

    listen(...args: any[]): object {
        debug('listen');
        const server = http.createServer(this.callback());
        return server.listen(...args);
    }

    /**
     * Return JSON representation.
     * We only bother showing settings.
     *
     * @return {Object}
     * @api public
     */

    toJSON(): object {
        return only(this, [
            'subdomainOffset',
            'proxy',
            'env'
        ]);
    }

    /**
     * Inspect implementation.
     *
     * @return {Object}
     * @api public
     */

    inspect(): object {
        return this.toJSON();
    }

    /**
     * Use the given middleware `fn`.
     *
     * Old-style middleware will not be converted.
     *
     * @param {Function} fn
     * @return {Application} self
     * @api public
     */

    use(fn: (ctx: object, next: Function) => void): this {
        debug('use %s', fn.name || '-');
        this.middleware.push(fn);
        return this;
    }

    /**
     * Return a request handler callback
     * for node's native http server.
     *
     * @return {Function}
     * @api public
     */

    callback(): object {
        const fn = compose(this.middleware);

        if (!this.listenerCount('error')) this.on('error', this.onerror);

        const handleRequest = (req: object, res: object) => {
            const ctx = this.createContext(req, res);
            return this.handleRequest(ctx, fn);
        };

        return handleRequest;
    }

    /**
     * Handle request in callback.
     *
     * @api private
     */

    handleRequest(ctx: any, fnMiddleware: any): any {
        const res = ctx.res;
        res.statusCode = 404;
        const onerror = (err: any) => ctx.onerror(err);
        const handleResponse = () => respond(ctx);
        onFinished(res, onerror);
        return fnMiddleware(ctx).then(handleResponse).catch(onerror);
    }

    /**
     * Initialize a new context.
     *
     * @api private
     */

    createContext(req: any, res: any): object {
        const context = Object.create(this.context);
        const request = context.request = Object.create(this.request);
        const response = context.response = Object.create(this.response);
        context.app = request.app = response.app = this;
        context.req = request.req = response.req = req;
        context.res = request.res = response.res = res;
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        context.originalUrl = request.originalUrl = req.url;
        context.state = {};
        return context;
    }

    /**
     * Default error handler.
     *
     * @param {Error} err
     * @api private
     */

    onerror(err: any): void {

        if (404 == err.status || err.expose) return;
        if (this.silent) return;

        const msg = err.stack || err.toString();
        console.error();
        console.error(msg.replace(/^/gm, '  '));
        console.error();
    }
}

/**
 * Response helper.
 */

function respond(ctx: any): any {
    // allow bypassing koa
    if (false === ctx.respond) return;

    if (!ctx.writable) return;

    const res = ctx.res;
    let body = ctx.body;
    const code = ctx.status;

    // ignore body
    if (statuses.empty[code]) {
        // strip headers
        ctx.body = null;
        return res.end();
    }

    if ('HEAD' == ctx.method) {
        if (!res.headersSent && isJSON(body)) {
            ctx.length = Buffer.byteLength(JSON.stringify(body));
        }
        return res.end();
    }

    // status body
    if (null == body) {
        if (ctx.req.httpVersionMajor >= 2) {
            body = String(code);
        } else {
            body = ctx.message || String(code);
        }
        if (!res.headersSent) {
            ctx.type = 'text';
            ctx.length = Buffer.byteLength(body);
        }
        return res.end(body);
    }

    // responses
    if (Buffer.isBuffer(body)) return res.end(body);
    if ('string' == typeof body) return res.end(body);
    if (body instanceof Stream) return body.pipe(res);

    // body: json
    body = JSON.stringify(body);
    if (!res.headersSent) {
        ctx.length = Buffer.byteLength(body);
    }
    res.end(body);
}
