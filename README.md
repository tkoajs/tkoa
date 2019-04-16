![tkoa logo](https://raw.githubusercontent.com/tkoajs/tkoa/master/source/logo.png)

<p align="center">
    <img alt='tkoa build badge' src='https://travis-ci.org/tkoajs/tkoa.svg?branch=master'>
    <img alt='tkoa npm badge' src='https://img.shields.io/npm/v/tkoa.svg'>
    <a href='https://gitter.im/tkoa-js/community?utm_source=share-link&utm_medium=link&utm_campaign=share-link'><img alt='tkoa gitter badge' src='https://badges.gitter.im/tkoa-js/community.svg'></a>
</p>

🌈 Tkoa is a Koa web app framework written in typescript. ![typescript logo](https://raw.githubusercontent.com/tkoajs/tkoa/master/source/ts%20logo.png)

Although written in typescript, you can still use the nodejs framework and koa middleware.

Not only that, you can also enjoy the type checking and convenient testing with typescript!

## Installation
TKoa requires **>= typescript v3.1.0** and **node v7.6.0** for ES2015 and async function support.

```shell
$ npm install tkoa
```

### Hello T-koa

```typescript
import tKoa = require('tkoa');

interface ctx {
    res: {
        end: Function
    }
}

const app = new tKoa();

// response
app.use((ctx: ctx) => {
    ctx.res.end('Hello T-koa!');
});

app.listen(3000);
```

### Middleware
Tkoa is a middleware framework that can take two different kinds of functions as middleware:

- async function
- common function

Here is an example of logger middleware with each of the different functions:

#### async functions (node v7.6+):

```typescript
interface ctx {
    method: string,
    url: string
}

app.use(async (ctx: ctx, next: Function) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
```

#### Common function
```typescript
// Middleware normally takes two parameters (ctx, next), ctx is the context for one request,
// next is a function that is invoked to execute the downstream middleware. It returns a Promise with a then function for running code after completion.

interface ctx {
    method: string,
    url: string
}

app.use((ctx: ctx, next: Function) => {
    const start = Date.now();
    return next().then(() => {
        const ms = Date.now() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
});
```

## Getting started
- [Tkoa - wiki](https://github.com/tkoajs/tkoa/wiki)
- [zhcn - 中文文档](https://github.com/tkoajs/tkoa/blob/master/README_CN.md)
- [Gitter](https://gitter.im/tkoa-js/community)

## Support
### TypeScript
- Higher than version v3.1
### Node.js
- Higher than version v7.6.0

## License
[MIT](https://github.com/tkoajs/tkoa/blob/master/LICENSE)
