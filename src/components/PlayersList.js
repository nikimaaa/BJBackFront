import React, {useEffect} from "react";

import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import Player from "./Player"

import {
    winners,
    loading,
    players,
    activePlayer
} from "../storage/players/selectors";

const PlayersList = ({players, activePlayer, winners, loading}) => {

    console.log('activePlayer', activePlayer)

    if (winners.length > 0) {
        return (
            <div className="winner__wrapper">
                {winners.map((winner, index) => <Player key={index} player={winner} isActive/>)}
            </div>
        )
    } else {
        return (
            <div className="players__wrapper">
                {players.map((player, i) => <Player key={i} player={player} isActive={i === activePlayer}/>)}
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    players,
    activePlayer,
    winners,
    loading
})

export default connect(mapStateToProps)(PlayersList)