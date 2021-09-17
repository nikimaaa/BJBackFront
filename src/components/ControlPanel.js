import React, {useEffect} from "react";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";

import {startAction, skipAction, takeAction, restartAction} from "../storage/thunk";
import {winners} from './../storage/players/selectors'



const ControlPanel = ({ startAction, skipAction, takeAction, restartAction, winners}) => {


    return (
        <div className="control__panel">
            <div className='buttons__wrapper'>
                <button className="button__card" onClick={takeAction} disabled={winners.length > 0}>
                    Take
                </button>
                <button className="button__card" onClick={skipAction} disabled={winners.length > 0}>
                    Skip
                </button>
                <button className="button__card" onClick={restartAction}>
                    Reset
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    winners
})

const mapDispatchToProps = {
    startAction,
    takeAction,
    skipAction,
    restartAction
}

export default  connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
