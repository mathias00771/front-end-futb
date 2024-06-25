import { useEffect, useState, useRef } from 'react';
import { socket } from '../../configs/config';
import '../../styles/components/scoreboard.css';



function Form() {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);


    //Solo de scoreboard
    const [isScoreLocal, setScoreLocal] = useState('0');
    const [isScoreAway, setScoreAway] = useState('0');
    const [isScore, setScore] = useState('0-0');
    const [isPlayTime, setPlayTime] = useState('');
    const [isNameLocal, setNameLocal] = useState('');
    const [isNameAway, setNameAway] = useState('');

    const handleSubmit1 = (e) => {
        e.preventDefault()
        const totalScore = `${isScoreLocal}-${isScoreAway}`
        setScore(totalScore)
        socket.emit('goscore', totalScore)
    }
    
    useEffect(() => {
        socket.on('updateTime', (data) => {
            setTime(data.st);
            setPlayTime(data.tf)
            
        });
    }, [])

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
                //setPlayTime(formatTime(time));
            }, 1000);
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
        }


        return () => clearInterval(intervalRef.current);
    }, [isRunning]);


    useEffect(() => {
        if (isRunning) {
            setPlayTime(formatTime(time))
            socket.emit('gotime', {
                timeformat: isPlayTime,
                timeseconds: time
            })

            // socket.on('updateTime', (data) => {
            //     setPlayTime(data);
            // });

        }

    }, [time])

    // Formatear el tiempo como MM:SS
    const formatTime = (timeInSeconds) => {
        const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, '0');
        const seconds = String(timeInSeconds % 60).padStart(2, '0');
        const total = `${minutes}:${seconds}`
        return total;
    };

    const handleStart = () => {
        setIsRunning(true)
    };

    const handleStop = () => {
        socket.emit('stopTimer');
        setIsRunning(false)
    };


    const handleReset = () => {
        setTime(0)
        socket.emit('gotime', '00:00');
        setPlayTime('00:00')
    };

    return (
        <div>
            <form onSubmit={handleSubmit1}>

                <input type="number" placeholder='Score del local' className='flex-fill '
                    onChange={(e) => setScoreLocal(e.target.value)}
                />

                <input type="number" placeholder='Score del Visitante' className='flex-fill '
                    onChange={(e) => setScoreAway(e.target.value)}
                />
                <button>Presioname</button>
            </form>
            <h1>Cronómetro: {formatTime(time)}</h1>
            <h1>Cronómetro - socket: {isPlayTime}</h1>

            <button onClick={handleStart}>Iniciar</button>
            <button onClick={handleStop}>Detener</button>
            <button onClick={handleReset}>Resetear</button>

        </div>
    )
}

export default Form
