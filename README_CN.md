![tkoa logo](https://raw.githubusercontent.com/tkoajs/tkoa/master/source/logo.png)

<p align="center">
    <img alt='tkoa build badge' src='https://travis-ci.org/tkoajs/tkoa.svg?branch=master'>
    <img alt='tkoa npm badge' src='https://img.shields.io/npm/v/tkoa.svg'>
    <a href='https://gitter.im/tkoa-js/community?utm_source=share-link&utm_medium=link&utm_campaign=share-link'><img alt='tkoa gitter badge' src='https://badges.gitter.im/tkoa-js/community.svg'></a>
</p>

🌈 Tkoa是使用 typescript 编写的 koa 框架！ ![typescript logo](https://raw.githubusercontent.com/tkoajs/tkoa/master/source/ts%20logo.png)

尽管它是基于 typescript 编写，但是你依然还是可以使用一些 node.js 框架和基于 koa 的中间件。

不仅如此，你还可以享受 typescript 的类型检查系统和方便地使用 typescript 进行测试！

## 安装
TKoa 需要 **>= typescript v3.1.0** 和 **node v7.6.0** 版本。

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

// 响应
app.use((ctx: ctx) => {
    ctx.res.end('Hello T-koa!');
});

app.listen(3000);
```

### Middleware
Tkoa 是一个中间件框架，拥有两种中间件：

- 异步中间件
- 普通中间件

下面是一个日志记录中间件示例，其中使用了不同的中间件类型：

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
// 中间件通常需要两个参数（ctx，next），ctx是一个请求的上下文，next是一个被调用来执行下游中间件的函数。它返回一个带有then函数的Promise，用于在完成后运行代码。

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
- [Tkoa - 教程](https://github.com/tkoajs/tkoa/wiki)
- [en - english readme](https://github.com/tkoajs/tkoa/blob/master/README.md)
- [Gitter - 聊天室](https://gitter.im/tkoa-js/community)

## Support
### TypeScript
- 大于等于 v3.1 版本
### Node.js
- 大于等于 v7.6.0 版本

## License
[MIT](https://github.com/tkoajs/tkoa/blob/master/LICENSE)
