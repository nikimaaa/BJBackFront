import React, {useCallback} from "react";

const InitList = ({initialPlayers, setInitialPlayers}) => {

    const removePlayer = useCallback((dindex) => {
        setInitialPlayers(
            initialPlayers.filter((p, index) => index !== dindex)
        )
    }, [initialPlayers, setInitialPlayers])

    return(
        <ul className='list'>
            {initialPlayers.map((initialPlayer, index) => {
                return(
                <div className='list__subfield' key={index}>
                    <li className='list__item'>{initialPlayer}</li>
                    <button
                        className='remove__button'
                        onClick={() => removePlayer(index)}
                    >X</button>
                </div>
                )
            })}
        </ul>
    )
}

export default InitList