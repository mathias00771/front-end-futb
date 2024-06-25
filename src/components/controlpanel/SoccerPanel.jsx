import { useState, useEffect, useRef } from 'react'
import { ChromePicker } from 'react-color'
import { socket } from '../../configs/config'

import ScoreBoard from '../ScoreBoard'

import '../../styles/components/controlpanel/soccerpanel.css'

const SoccerPanel = () => {
  

  const [isMinutes, setMinutes] = useState(0);
  const [isSeconds, setSeconds] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  //Solo de scoreboard
  const [isScoreLocal, setScoreLocal] = useState('0');
  const [isScoreAway, setScoreAway] = useState('0');
  const [isScore, setScore] = useState('0-0');
  const [isPlayTime, setPlayTime] = useState('00:00');
  const [isNameLocal, setNameLocal] = useState('');
  const [isNameAway, setNameAway] = useState('');

  const [isWhoColorP, setWhoColorP] = useState(null)
  const [isHexColor, setHexColor] = useState('#000')

  const [scolor, setColors] = useState({
    localTabBgc: "#000",
    awayTabBgc: "#000",
    localTabTc: "#fff",
    awayTabTc: "#fff"
  });

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const formatTime = (minutes, seconds) => {
    const minutestot = String(minutes).padStart(2, '0');
    const secondstot = String(seconds).padStart(2, '0');
    const total = `${minutestot}:${secondstot}`
    return total;
  };

  const handleColorChange = (newColor) => {
    setHexColor(newColor.hex)
    if (isWhoColorP == "bglocal") {
      setColors((prevColors) => ({
        ...prevColors,
        localTabBgc: newColor.hex
      }));
    } else if (isWhoColorP == "bgaway") {
      setColors((prevColors) => ({
        ...prevColors,
        awayTabBgc: newColor.hex
      }));
    } else if (isWhoColorP == "tclocal") {
      setColors((prevColors) => ({
        ...prevColors,
        localTabTc: newColor.hex
      }));
    } else if (isWhoColorP == "tcaway") {
      setColors((prevColors) => ({
        ...prevColors,
        awayTabTc: newColor.hex
      }));
    }

    socket.emit('gocolors', scolor);
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleStart = () => {
    setIsRunning(true)
  };

  const handleStop = () => {
    setIsRunning(false)
  };

  const handleReset = () => {
    setSeconds(0)
    setMinutes(0)
    socket.emit('gotime', '00:00');
    setPlayTime('00:00')
    setIsRunning(false)
  };

  const handleSecondTime = () => {
    setSeconds(0)
    setMinutes(45)
    setPlayTime(formatTime(isMinutes, isSeconds))
    socket.emit('gotime', formatTime(isMinutes, isSeconds));
    setIsRunning(true)
  }

  const handleButtonID = (grp, typ) => {
    if (grp == 1) {
      //Local      
      if (typ == "+") {
        setScoreLocal(String(Number(isScoreLocal) + 1))
      } else if (typ == "-") {
        setScoreLocal(String(Number(isScoreLocal) - 1))
      }
    } else if (grp == 2) {
      if (typ == "+") {
        setScoreAway(String(Number(isScoreAway) + 1))
      } else if (typ == "-") {
        setScoreAway(String(Number(isScoreAway) - 1))
      }
    }
  }

  useEffect(() => {
    if (isRunning) {
      //setPlayTime(formatTime(time))
      // socket.emit('gotime', {
      //   timeformat: isPlayTime,
      //   timeseconds: time
      // })

      // socket.on('updateTime', (data) => {
      //     setPlayTime(data);
      // });

    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 60) {
            setMinutes(prevMinutes => prevMinutes + 1)
            return 0; // Resetea el tiempo a 0
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);


  useEffect(() => {
    if (isRunning) {
      setPlayTime(formatTime(isMinutes, isSeconds))

      socket.emit('gotime', {
        timeformat: isPlayTime,
        timeseconds: isSeconds,
        timeminutes: isMinutes
      })

      // socket.on('updateTime', (data) => {
      //     setPlayTime(data);
      // });

    }
  }, [isSeconds])

  useEffect(() => {
    const totalScore = `${isScoreLocal}-${isScoreAway}`
    setScore(totalScore)
    socket.emit('goscore', totalScore)
  }, [isScoreAway, isScoreLocal])

  useEffect(() => {
    socket.emit('gonames', {
      local: isNameLocal,
      away: isNameAway
    })
  }, [isNameAway, isNameLocal])



  return (
    <div>
      <div className="frame--controls p-2">
        <div className="to--controls">
          <div className="to-btns-controls is-box-control flex-fill d-flex justify-content-center flex-column text-center">
            <h4 className='text-center'>Tiempo</h4>

            <small >Recuerda detener el tiempo para poder modificar los segundos y minutos</small>
            <div className='d-flex justify-content-center'>
              <input type="number" className='input-to-time' placeholder='Minutos' onChange={(e) => {
                if (!isRunning) {
                  setMinutes(Number(e.target.value))
                } else {
                  setIsRunning(false)
                  setMinutes(Number(e.target.value))
                }
              }} />
              <h5 className='mt-3'>:</h5>
              <input type="number" className='input-to-time' placeholder='Segundos' onChange={(e) => {
                if (!isRunning) {
                  setSeconds(Number(e.target.value))
                } else {
                  setIsRunning(false)
                  setSeconds(Number(e.target.value))
                }
              }} />
            </div>
            <div className="in-btns-controls-t">
              <button className='it' onClick={handleStart}>Iniciar tiempo</button>
              <button className='pt' onClick={handleStop}>Parar tiempo</button>
              <button className='rt' onClick={handleReset}>Resetear tiempo</button>
            </div>
            <div className="in-btns-controls-t">
              <button onClick={handleSecondTime}>Segundo tiempo</button>

            </div>
          </div>
          <div className="to-names-control is-box-control flex-fill d-flex flex-column text-center">
            <h4 className='text-center'>NOMBRES</h4>
            <p>LOCAL</p>
            <input type="text" placeholder="LOCAL" className='input-to-names' maxLength={3} onChange={(e) => {
              const inputText = e.target.value.toUpperCase();
              if (inputText !== "") { setNameLocal(inputText) } else { setNameLocal("LOC") }
            }} />
            <p>VISITANTE</p>
            <input type="text" placeholder="AWAY" className='input-to-names' maxLength={3} onChange={(e) => {
              const inputText = e.target.value.toUpperCase();
              if (inputText !== "") { setNameAway(inputText) } else { setNameAway("VIS") }
            }} />
          </div>
          <div className="to-goals-cotrol is-box-control flex-fill d-flex flex-column text-center">
            <h4 className='text-center'>GOLES</h4>
            <p>LOCAL</p>
            <div className="inp-local-goals">
              <input type="text" onChange={(e) => {
                setScoreLocal(e.target.value)

              }} value={isScoreLocal} />
              <button className='signos-buttons' onClick={() => {
                handleButtonID(1, "+")
              }}>+</button>
              <button className='signos-buttons' onClick={() => {
                handleButtonID(1, "-")
              }}>-</button>
            </div>
            <p>VISITANTE</p>
            <div className="inp-local-goals">
              <input type="text" onChange={(e) => {
                setScoreAway(e.target.value)

              }} value={isScoreAway} />
              <button className='signos-buttons' onClick={() => {
                handleButtonID(2, "+")
              }}>+</button>
              <button className='signos-buttons' onClick={() => {
                handleButtonID(2, "-")
              }}>-</button>
            </div>
          </div>
        </div>
        <div className="to-soccerboard flex-fill d-flex flex-column">
          <h4 className='text-center'>Vista previa</h4>
          <ScoreBoard isTime={isPlayTime} isScorere={isScore} isNameLocalVar={isNameLocal} isNameAwayVar={isNameAway} globalColors={{
            localTabBgc: scolor.localTabBgc,
            awayTabBgc: scolor.awayTabBgc,
            localTabTc: scolor.localTabTc,
            awayTabTc: scolor.awayTabTc
          }} />
          <div className="settings-scoreboard contatiner-fluid d-flex wrap">

            <div className="tabs-names-scolors flex-fill">
              {/* BG y TXTC para los tabs de los nombres */}
              <div className="bgs-colors flex-fill">
                <h4 className='text-center my-2'>local</h4>

                <p className='text-center'>FONDO</p>

                <div className="box-settings-c">
                  <input type="text" readOnly value={scolor.localTabBgc} />
                  <div className="cshow" style={{ backgroundColor: `${scolor.localTabBgc}` }} onClick={() => {
                    setWhoColorP("bglocal")
                    handleClick()
                  }}
                  ></div>
                </div>

                <p className='text-center'>TEXTO</p>

                <div className="box-settings-c">
                  <input type="text" readOnly value={scolor.localTabTc} />
                  <div className="cshow" style={{ backgroundColor: `${scolor.localTabTc}` }} onClick={() => {
                    setWhoColorP("tclocal")
                    handleClick()
                  }}
                  ></div>
                </div>
                

              </div>

              <div className="txt-colors flex-fill ">
                <h4 className='text-center my-2'>visitante</h4>

                <p className='text-center'>FONDO</p>
                <div className="box-settings-c">
                  <input type="text" readOnly value={scolor.awayTabBgc} />
                  <div className="cshow" style={{ backgroundColor: `${scolor.awayTabBgc}` }} onClick={() => {
                    setWhoColorP("bgaway")
                    handleClick()
                  }}
                  ></div>
                </div>


                

                <p className='text-center'>TEXTO</p>
                <div className="box-settings-c">
                  <input type="text" readOnly value={scolor.awayTabTc} />
                  <div className="cshow" style={{ backgroundColor: `${scolor.awayTabTc}` }} onClick={() => {
                    setWhoColorP("tcaway")
                    handleClick()
                  }}
                  ></div>
                </div>
              </div>

              <div className="color-picker-cp flex-fill">

                {displayColorPicker ? (
                  <div>
                    <div
                      style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}
                      onClick={handleClose}

                    />
                    <ChromePicker color={isHexColor} onChange={handleColorChange} />
                  </div>
                ) : null}

              </div>


            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SoccerPanel


