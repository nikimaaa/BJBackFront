const cardsGenerator = require('./cardsGenerator')

module.exports = class Game{
    constructor(players){
        this.players = players;
        this.restart();
    }

    restart(){
        this.players = this.players.map((player) => {
            player.score = 0;
            player.cards = [];
            return player;
        });

        console.log(this.players);
        this.cards = cardsGenerator();
        for(let player of this.players){
            for(let i = 0; i < 2; i++){
                player.takeCard(this.randomCard());
            }
        }
        this.activePlayer = this.players[0];
    }

    nextPlayer(){
        this.activePlayer = this.players[this.players.indexOf(this.activePlayer) + 1];
        if(!this.activePlayer){
            this.finish();
        }
    }

    finish(){
        const posWinners = this.players.filter(player => player.score <= 21)
        const winner = posWinners.reduce((acc, player) => {
            return player.score > acc.score ? player : acc;
        }, posWinners[0]);
        console.log(winner)
        this.restart();
    }

    giveCard(){
        const card = this.randomCard();
        if(this.activePlayer.takeCard(card)){
            this.nextPlayer();
            return true;
        }
        return false;
    }

    randomCard(){
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        const randomCard = this.cards[randomIndex];
        this.cards.splice(randomIndex, 1);
        return randomCard;
    }
}

