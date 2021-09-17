const static = require('koa-static')
const Koa = require('koa')
const cors = require('@koa/cors')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('koa-body-parser')

const mainRouter = require('./routes/router')

require('dotenv').config()

const app = new Koa()
const PORT = process.env.PORT || 9000

app.use(cors())
app.use(bodyParser())
app.use(static(path.resolve(__dirname, '..', 'build')))
app.use(mainRouter.routes())


async function start() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/BlackJack')
        app.listen(PORT, () => {
            console.log(`App started on port: ${PORT}`)
        })
    } catch(error){
        console.log(error)
        process.exit(1)
    }
}

start()

