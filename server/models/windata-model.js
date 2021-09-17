const { Schema, model } = require('mongoose')

const schema = new Schema({
    players: [Object],
    winners: [Number],
    date: [Date]
})

const WinData = model('WinData', schema)

module.exports = WinData