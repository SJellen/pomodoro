import React from 'react'


const Break = (props) =>  {
    const { increment, decrement, length } = props


    return (
        <div className="break-box">
        <h3 id="break-label">Break</h3>
        <button onClick={decrement} id="break-decrement">-</button>
        <span id="break-length">{length / 60}</span>
        <button onClick={increment} id="break-increment">+</button>
        </div>
    )
}


export default Break