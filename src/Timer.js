import React from 'react'

const Timer = (props) => {

    const { time, mode } = props

    const min = Math.floor(time / 1000 / 60)
    const sec = Math.floor((time/ 1000) % 60)

    return (
        <div id="timer">
        <h3 id="timer-label">{mode}</h3>
        <h3 id="time-left">
            {min}:{sec.toString().length === 1 ? "0" + sec : sec }
        </h3>

        </div>
    )

}



export default Timer