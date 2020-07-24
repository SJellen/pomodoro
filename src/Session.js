import React from 'react'


const Session = (props) =>  {
    const { increment, decrement, length } = props


    return (
        <div className="session-box">
        <h3 id="session-label">Session</h3>
        <button onClick={decrement} id="session-decrement">-</button>
        <span id="session-length">{length / 60}</span>
        <button onClick={increment} id="session-increment">+</button>
        </div>
    )
}


export default Session