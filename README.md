![tkoa logo](https://github.com/tkoajs/tkoa/blob/master/source/logo.png)

🌈Tkoa is a Koa web app framework written in typescript. ![typescript logo](https://github.com/tkoajs/tkoa/blob/master/source/ts%20logo.png)

Although written in typescript, you can still use the nodejs framework and koa middleware.

Not only that, you can also enjoy the type checking and convenient testing with typescript!

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
