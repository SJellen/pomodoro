import React from 'react'
import './App.css';
import Break from './Break'
import Session from './Session'
import Timer from './Timer'
import useLogic from './useLogic'



function App() {

  const { breakLength, sessionLength, mode, timeLeft, isActive, toggleIsActive, reset, decrementBreakLength, decrementSessionLength, incrementBreakLength, incrementSessionLength} = useLogic()



  return (
    <div className="App">
    <h1>Pomodoro</h1>

    <h3>Current Session</h3>
    <Timer  time={timeLeft} mode={mode}/>
    <div className="button-box">
      <button id="start_stop" onClick={toggleIsActive}>{isActive ? 'Pause' : 'Start'}</button>
      <button id="reset" onClick={reset}>Reset</button>

    </div>
    <Break 
      length={breakLength}
      decrement={decrementBreakLength}
      increment={incrementBreakLength}
    />
    <Session
      length={sessionLength}
      decrement={decrementSessionLength}
      increment={incrementSessionLength}
     /> 
    </div>
  );
}

export default App;
