import {setLoading, updateData} from "./players/actions";
import axios from "axios";

export const takeAction = () => makeRequest('/take')
export const skipAction = () => makeRequest('/skip')
export const startAction = () => makeRequest('/start')
export const restartAction = () => makeRequest('/restart')

export const makeRequest = (url) => {
    return async (dispatch) => {
        try {
            await dispatch(setLoading(true))
            const token = localStorage.getItem('token')
            let game;

            if(!token){
                const response = await axios.get(url)
                game = response.data.game
                const token = response.data.token
                localStorage.setItem('token', token)
            }
            else{
                const response = await axios.get(url, {
                    headers: {'Authorization' : token}
                })
                game = response.data.game
            }

            await dispatch(updateData(game))
            await dispatch(setLoading(false))
        }
        catch (error) {
            console.log(error)
            await dispatch(setLoading(false))
        }
    }
}

export const initPlayersAction = (players) => {
    return async (dispatch) => {
        try {
            await dispatch(setLoading(true))
            const token = localStorage.getItem('token')

            const response = await axios.post('/initPlayers', {
                players
            }, {
                headers: {'Authorization' : token}
            })

            const game = response.data.game
            await dispatch(updateData(game))
            await dispatch(setLoading(false))
        } catch (error){

        }
    }
}
