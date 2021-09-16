import {createAction} from "redux-actions";

export const setLoading = createAction("SET_LOADING", (status) => ({
    status
}))

export const updateData = createAction("UPDATE_DATA", (game) => ({
    game
}))