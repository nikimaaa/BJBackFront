const static = require('koa-static')
const Koa = require('koa')
const cors = require('@koa/cors')
const path = require('path')
const mainRouter = require('./routes/router')

require('dotenv').config()

const app = new Koa()
const PORT = process.env.PORT || 9000

app.use(cors())
app.use(mainRouter.routes())
app.use(static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => {
    console.log(`App started on port: ${PORT}`)
})