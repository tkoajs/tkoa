![tkoa logo](https://raw.githubusercontent.com/tkoajs/tkoa/master/source/logo.png)

🌈 Tkoa is a Koa web app framework written in typescript. ![typescript logo](https://raw.githubusercontent.com/tkoajs/tkoa/master/source/ts%20logo.png)

Although written in typescript, you can still use the nodejs framework and koa middleware.

Not only that, you can also enjoy the type checking and convenient testing with typescript!

## Installation
TKoa requires >= typescript v3.1.0 and node v7.6.0 for ES2015 and async function support.

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
