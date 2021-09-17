const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY || 'secret'

module.exports = authMiddleware = (ctx, next) => {
    const token = ctx.get('Authorization')

    if (token === '') {
        return ctx.throw(401, 'There is no token')
    }

    try {
        const {id} = jwt.verify(token, key)

        ctx.state.userId = id
    } catch (error){
        return ctx.throw(401, 'Token is invalid')
    }

    return next();
}