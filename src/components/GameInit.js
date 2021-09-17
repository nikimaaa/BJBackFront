import React, {useCallback, useEffect, useState} from "react";
import './gameinit.scss'
import InitList from "./InitList";
import {initPlayersAction} from "../storage/thunk";
import {connect} from "react-redux";

const GameInit = ({initPlayersAction}) => {
    const [initialPlayers, setInitialPlayers] = useState([])
    const [playerName, setPlayerName] = useState('')

    const onInput = useCallback((event) => {
        setPlayerName(event.target.value)
    }, [])

    const onAdd = useCallback(() => {
        if (!!playerName) {
            setInitialPlayers([...initialPlayers, playerName])
            setPlayerName('')
        }
    }, [
        playerName,
        initialPlayers,
        setInitialPlayers,
        setPlayerName
    ])

    const onInit = useCallback(() => {
        if (initialPlayers.length >= 2) {
            initPlayersAction(initialPlayers)
        }
    }, [initPlayersAction, initialPlayers])

    return (
        <div className='init__wrapper'>
            <div className='form'>
                <div className='form__subfield'>
                    <input
                        type='text'
                        className='form__input'
                        value={playerName}
                        onInput={onInput}
                    />
                    <button className='form__button' onClick={onAdd}>Add</button>
                </div>
                <InitList
                    initialPlayers={initialPlayers}
                    setInitialPlayers={setInitialPlayers}
                />
                <button
                    className='form__button form__button-submit'
                    onClick={onInit}
                >Start
                </button>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    initPlayersAction
}

export default connect(null, mapDispatchToProps)(GameInit)