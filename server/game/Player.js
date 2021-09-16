module.exports = class Player{
    constructor(name){
        this.name = name;
        this.cards = [];
        this.score = 0;
    }

    takeCard(card){
        console.log('random', card)
        this.cards.push(card);
        this.score += card.score;
        return this.score > 21;
    }
}