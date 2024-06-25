import { useEffect, useState, useRef } from 'react';
import { socket } from '../configs/config';
import '../styles/components/scoreboard.css';



function ScoreBoard() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    //Solo de scoreboard
    const [isScore, setScore] = useState('');
    const [isPlayTime, setPlayTime] = useState('');
    const [isNameLocal, setNameLocal] = useState('');
    const [isNameAway, setNameAway] = useState('');

    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Cleanup function to clear the interval
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    // Format the time as MM:SS
    const formatTime = (timeInSeconds) => {
        const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, '0');
        const seconds = String(timeInSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    // Force update to help OBS detect changes
    const forceUpdate = () => {
        setTime(prevTime => prevTime + 0); // No-op update to force re-render
    };

    useEffect(() => {
        const forceUpdateInterval = setInterval(() => {
            forceUpdate();
        }, 1000); // Force update every second

        return () => clearInterval(forceUpdateInterval);
    }, []);

    return (
        <div className="scoreboard">
            <div className="localtab">
                LLL
            </div>
            <div className="score">
                1-1
            </div>
            <div className="awaytab">
                AAA
            </div>
            <div className="playtime">
                {formatTime(time)}
            </div>

            <button onClick={() => setIsRunning(true)}>Iniciar</button>
            <button onClick={() => setIsRunning(false)}>Detener</button>
            <button onClick={() => setTime(0)}>Resetear</button>
        </div>
    );
}

export default ScoreBoard;

