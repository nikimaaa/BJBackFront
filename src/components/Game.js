import ControlPanel from "./ControlPanel";
import PlayersList from './PlayersList';
import React from "react";

const Game = () => {
    return(
        <div className="game__wrapper">
            <PlayersList />
            <ControlPanel />
        </div>
    )
}

export default Game