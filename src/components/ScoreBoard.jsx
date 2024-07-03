import { useEffect, useState, useRef, startTransition } from 'react';
import { useLocation } from 'react-router-dom'
import { socket } from '../configs/config';
import { useSB } from '../context/ScoreboardContext'
import '../styles/components/scoreboard.css';


const ScoreBoard = ({ globalColors }) => {
    const { getInfoSB, updateInfoSB } = useSB();

    useEffect(() => {
        const routePath = "/scoreboard"; // Aquí simulas el valor de data-routepath
        document.body.setAttribute('data-routepath', routePath);
    }, []);

    //Solo de scoreboard
    const [isScore, setScore] = useState('0-0');
    const [isPlayTime, setPlayTime] = useState('00:00');
    const [isNameLocal, setNameLocal] = useState('LOC');
    const [isNameAway, setNameAway] = useState('VIS');

    //Estilos states
    
    // Backgrounds-Colors
    const [isBgcLocalTab , setBgcLocalTab] = useState('#000');
    const [isBgcAwayTab , setBgcAwayTab] = useState('#000');

    //Text-Colors
    const [isTcLocalTab , setTcLocalTab] = useState('#fff');
    const [isTcAwayTab , setTcAwayTab] = useState('#fff');

    const handleGetInfo = async () => {
        const res = await getInfoSB()
        setScore(res.data.score)
        setNameLocal(res.data.localName)
        setNameAway(res.data.awayName)
        setBgcLocalTab(res.data.localBackgroundColor)
        setBgcAwayTab(res.data.awayBackgroundColor)
        setTcLocalTab(res.data.localTextColor)
        setTcAwayTab(res.data.awayTextColor)
        return res.data
    }

    useEffect(() => {
        handleGetInfo()
        
        socket.on('getscore', (e) => {
            setScore(e);
        });

        socket.on('gettime', (t) => {
            setPlayTime(t)
        })

        socket.on('getnames', (n) => {
            setNameLocal(n.local);
            setNameAway(n.away)            
        })

        socket.on('getcolors', (c) => {
            setBgcLocalTab(c.localTabBgc) 
            setBgcAwayTab(c.awayTabBgc) 
            setTcLocalTab(c.localTabTc) 
            setTcAwayTab(c.awayTabTc)
        })
    

        // Cleanup listener on unmount
        return () => {
            socket.off('getscore');
            socket.off('gettime');
            socket.off('getnames');
            socket.off('getcolors');
        };
    }, []);
    
    useEffect(() => {   
        if (!globalColors) return
        setBgcLocalTab(globalColors.localTabBgc) 
        setBgcAwayTab(globalColors.awayTabBgc) 
        setTcLocalTab(globalColors.localTabTc) 
        setTcAwayTab(globalColors.awayTabTc) 
    }, [globalColors])



    


    return (
        <div className='sc1'>
            <div className="scoreboard">
                <div className="localtab" style={{backgroundColor: `${isBgcLocalTab}`, color: `${isTcLocalTab}`}}>
                    {isNameLocal}
                </div>
                <div className="score">
                    {isScore}
                </div>
                <div className="awaytab" style={{backgroundColor: `${isBgcAwayTab}`, color: `${isTcAwayTab}`}}>
                    {isNameAway}
                </div>
                <div className="playtime">
                    {isPlayTime}
                </div>

            </div>
        </div>
    );
}

export default ScoreBoard;

