![tkoa logo](https://raw.githubusercontent.com/tkoajs/tkoa/master/source/logo.png)

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

// response
app.use((ctx: ctx) => {
    ctx.res.end('Hello T-koa!');
});

app.listen(3000);
```

## Getting started
- [Tkoa - 教程](https://github.com/tkoajs/tkoa/wiki)
- [en - english readme](https://github.com/tkoajs/tkoa/blob/master/README.md)
- [Gitter聊天室](https://gitter.im/tkoa-js/community)

## Support
### TypeScript
- 大于等于 v3.1 版本
### Node.js
- 大于等于 v7.6.0 版本

## License
[MIT](https://github.com/tkoajs/tkoa/blob/master/LICENSE)
