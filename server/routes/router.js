const Router = require('@koa/router')
const jwt = require('jsonwebtoken')
const {v4: uuidv4} = require('uuid');

const mainRouter = new Router()

const Game = require('../game/Game')
const Player = require('../game/Player')

const authMiddleware = require('./../middleware/auth-middleware')

const key = process.env.JWT_KEY || 'secret'
const games = {};

mainRouter.get('/start', async (ctx, next) => {
        const token = ctx.get('Authorization')
        console.log('token', token)
        if (token === '') {
            return await next();
        }

        try {
            const {id} = jwt.verify(token, key)
            if (!games[id]) {
                games[id] = new Game([]);
            }

            ctx.body = {
                game: games[id]
            };
        } catch (e) {
            ctx.res.status = 401
        }
    },
    (ctx) => {
        const id = uuidv4();

        const game = new Game([]);

        games[id] = game;

        const token = jwt.sign({id}, key)

        ctx.body = {game, token}
    }
)

mainRouter.get('/skip', authMiddleware, (ctx) => {
    const game = games[ctx.state.userId]
    game.nextPlayer()
    ctx.body = {game}
})

mainRouter.get('/restart', authMiddleware, (ctx) => {
    const game = games[ctx.state.userId]
    game.restart()
    ctx.body = {game}
})

mainRouter.get('/take', authMiddleware, (ctx) => {
    const game = games[ctx.state.userId]
    game.giveCard()
    ctx.body = {game}
})

mainRouter.post('/initPlayers', authMiddleware, (ctx) => {
    const {players} =  ctx.request.body
    const game = games[ctx.state.userId]
    game.setPlayers(players)
    game.restart()
    ctx.body = {game}
})

module.exports = mainRouter