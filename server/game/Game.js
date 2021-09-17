const cardsGenerator = require('./cardsGenerator')
const WinData = require('./../models/windata-model')
const Player = require('./Player')

module.exports = class Game {
    constructor(players) {
        this.players = players;
        this.restart();
    }

    setPlayers(players){
        this.players = players.map((player) => new Player(player))
    }

    restart() {
        this.players = this.players.map((player) => {
            player.score = 0;
            player.cards = [];
            return player;
        });

        this.cards = cardsGenerator();
        for (let player of this.players) {
            for (let i = 0; i < 2; i++) {
                player.takeCard(this.randomCard());
            }
        }
        this.activePlayer = 0;
        this.winners = []
    }

    nextPlayer() {
        this.activePlayer++;
        if (!this.players[this.activePlayer]) {
            this.finish();
        }
    }

    async finish() {
        this.winners = calculateWinners(this.players)
        try {
            const win = new WinData({
                players: this.players,
                winners: this.winners.map((winner) => this.players.indexOf(winner)),
                date: new Date()
            })
            await win.save()
        } catch (error){

        }
    }

    giveCard() {
        const card = this.randomCard();
        if (this.players[this.activePlayer].takeCard(card)) {
            this.nextPlayer();
            return true;
        }
        return false;
    }

    randomCard() {
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        const randomCard = this.cards[randomIndex];
        this.cards.splice(randomIndex, 1);
        return randomCard;
    }
}

function calculateWinners(players) {
    const possibleWinners = players.filter((player) => player.score <= 21)

    return possibleWinners.reduce((acc, player) => {
        if (player.score > acc[0].score) {
            acc = [];
            acc.push(player)
            return acc
        }
        if (player.score === acc[0].score) {
            acc.push(player)
            return acc
        }
        return acc
    }, [{score: 0}])
}

