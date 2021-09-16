import React from "react";

const CardsList = ({cards}) => {
    return (
        <div className='cards__wrapper'>
            {cards.map((card, i) => <div className='card' key={i}>{card.name}</div>)}
        </div>
    )
}

export default CardsList