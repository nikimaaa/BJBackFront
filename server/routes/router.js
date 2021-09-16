const Router = require('@koa/router')
const jwt = require('jsonwebtoken')

const mainRouter = new Router()

const Game = require('../game/Game')
const Player = require('../game/Player')

let id = 0;
const key = process.env.JWT_KEY || 'secret'
const games = {}

mainRouter.get('/start', async (ctx, next) => {
        const token = ctx.get('Authorization')
        if (token === '') {
            return await next();
        }

        try {
            const decoded = jwt.verify(token, key)
            ctx.body = games[decoded.id];
        } catch (e) {
            ctx.res.status = 401
        }
    },
    (ctx) => {
        const game = new Game([
            new Player('Никита'),
            new Player('Вова'),
            new Player('Маша')
        ])

        const token = jwt.sign({id}, key)
        ctx.body = {game, token};
    }
)


module.exports = mainRouter