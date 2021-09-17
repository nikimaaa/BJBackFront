import React, {useEffect} from 'react'

import { connect } from 'react-redux'

import {createStructuredSelector} from "reselect";

import Game from './components/Game'
import GameInit from './components/GameInit'

import './index.scss'

import {players} from "./storage/players/selectors";
import {startAction} from "./storage/thunk";



function App({players, startAction}) {

    useEffect(() => {
        startAction()
    },[])


    return (
        <div className='wrapper'>
            {players.length === 0 ?<GameInit/> : <Game/>}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    players
})

const mapDispatchToProps = {
    startAction
}

export default connect(mapStateToProps, mapDispatchToProps)(App)