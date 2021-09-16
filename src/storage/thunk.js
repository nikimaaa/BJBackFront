import {setLoading, updateData} from "./players/actions";
import axios from "axios";

export const takeAction = () => makeRequest('/take')
export const skipAction = () => makeRequest('/skip')
export const startAction = () => makeRequest('/start')

export const makeRequest = (url) => {
    return async (dispatch) => {
        try {
            await dispatch(setLoading(true))
            const response = await axios.get(url)
            const game = response.data.game
            console.log(game)
            await dispatch(updateData(game))
            await dispatch(setLoading(false))
        } catch (error) {
            console.log(error)
            await dispatch(setLoading(false))
        }
    }
}
