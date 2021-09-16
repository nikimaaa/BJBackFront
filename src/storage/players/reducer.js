import {handleActions} from "redux-actions";
import {setLoading, updateData} from "./actions";

export const NEXT_PLAYER = 'NEXT_PLAYER'
export const REMOVE_CARDS = 'REMOVE_CARDS'

const defaultState = {
    loading: false,
    players: [],
    activePlayer: 0,
    winners: []
}

const setLoadHandler = (state, {status}) => {
    return {...state, loading: true}
}

//TODO: add winers to state
const updateDataHandler = (state, {payload}) => {
    const {activePlayer, players} = payload.game
    // console.log('payload.game', payload.game)
    // console.log('players', players)
    // console.log('activePlayer', activePlayer)
    return {...state, players: [...players], activePlayer: {...activePlayer}}
}

export const playersReducer = handleActions({
    [setLoading] : setLoadHandler,
    [updateData] : updateDataHandler
}, defaultState)

