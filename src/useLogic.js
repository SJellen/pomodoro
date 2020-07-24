import { useState, useEffect } from 'react'


function useLogic() {

  const [breakLength, setBreakLength] = useState(5 * 60)
  const [sessionLength, setSessionLength] = useState(25 * 60)
  const [mode, setMode] = useState("Session")
  const [timeLeft, setTimeLeft] = useState()
  const [isActive, setIsActive] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)
  const [beep] = useState(new Audio("https://freesound.org/data/previews/523/523960_350703-lq.mp3"))
  const [beepPlaying, setBeepPlaying] = useState(false)

  useEffect(() => {
    setTimeLeft(mode === 'Session' ? sessionLength * 1000 : breakLength * 1000)
  }, [sessionLength, breakLength, mode])

  useEffect(() => {
    let interval = null

    if (isActive && timeLeft > 1) {
      setTimeLeft(
        mode === 'Session'
        ? sessionLength * 1000 - timeSpent
        : breakLength * 1000 - timeSpent
      )

      interval  = setInterval(() => {
        setTimeSpent((timeSpent) => timeSpent + 1000)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    if (timeLeft === 0) {
      beep.play()
      setBeepPlaying(true)
      setTimeSpent(0)
      setMode((mode) => (mode === 'Session' ? 'Break' : 'Session'))
      setTimeLeft(
        mode === 'Session' ? sessionLength * 1000 : breakLength * 1000
      )
    }
    return () => clearInterval(interval)
  }, [isActive, timeSpent, beep, mode, breakLength, sessionLength, timeLeft])

  useEffect(() => {
    beep.addEventListener('ended', () => setBeepPlaying(false))
    return () => {
      beep.addEventListener('ended', () => setBeepPlaying(false)) 
    }
  }, [beep])



  function decrementBreakLength() {
    const decrementBreakLength = breakLength - 60 > 60 ? breakLength - 60 : 60
    setBreakLength(decrementBreakLength)
  }

  function incrementBreakLength() {
    const incrementBreakLength = breakLength + 60 <= 60 * 60 ? breakLength + 60 : 60 * 60
    setBreakLength(incrementBreakLength)
  }

  function decrementSessionLength() {
    const decrementSessionLength = sessionLength - 60 > 60 ? sessionLength - 60 : 60
    setSessionLength(decrementSessionLength)
  }

  function incrementSessionLength() {
    const incrementSessionLength = sessionLength + 60 <= 60 * 60 ? sessionLength + 60 : 60 
    setSessionLength(incrementSessionLength)
  }

  function reset() {
    setBreakLength(5 * 60)
    setSessionLength(25 * 60)
    setTimeLeft(mode === 'Session' ? sessionLength * 1000 : breakLength * 1000)

    if (isActive) {
      setIsActive(false)
      setTimeSpent(0)
    }

    if (beepPlaying) {
      beep.pause()
      beep.currentTime = 0
      setBeepPlaying(false)
    }
  }

  function toggleIsActive() {
    setIsActive(!isActive)
  }

  return { breakLength, sessionLength, mode, timeLeft, isActive, timeSpent, beep, beepPlaying, toggleIsActive, reset, decrementBreakLength, decrementSessionLength, incrementBreakLength, incrementSessionLength}
}

export default useLogic