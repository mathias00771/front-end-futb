import { useState, useEffect } from 'react';
import { connectToOBS, disconnectFromOBS, getObsInstance, isOBSConnected } from '../configs/config';

import JCrepuestosImg from '../images/JCrepuestos.png'
import AceralImg from '../images/Aceral.png'
import CarbondePaloImg from '../images/CarbondePalo.png'
import CalzadoElizabethImg from '../images/CalzadoElizabeth.png'
import CholaCuencanaImg from '../images/CholaCuencana.png'
import CafeLaurenceImg from '../images/CafeLaurence.png'
import MotoselJotaImg from '../images/MotoselJota.png'
import VidaVetImg from '../images/VidaVet.png'

import '../styles/components/obspanel.css'


//const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const protocol = 'ws';
let obs = null;
function ObsPanel() {
    const [connected, setConnected] = useState(false);


    const [hostObs, setHostObs] = useState('111')
    const [portObs, setPortObs] = useState('4455')

    const [scenes, setScenes] = useState([]);
    const [activeSceneId, setActiveSceneId] = useState(null);
    const [activeSceneName, setActiveSceneName] = useState(null);

    const [isImgData, setImgData] = useState(null)


    const initializeOBSConnection = async () => {
        try {
            if (isOBSConnected()) {
                obs = getObsInstance();
                console.log('Already connected to OBS');
                setConnected(true);
                return;
            }

            await connectToOBS(`${protocol}://${hostObs}:${portObs}`, ''); // Conectamos a OBS con la nueva dirección y contraseña
            obs = getObsInstance();
            setConnected(true);
        } catch (error) {
            console.log(error);
            setConnected(false);
        }
    };

    const handleHostPort = (e) => {
        e.preventDefault()

        const hostV = e.target.elements.host.value;
        const portV = e.target.elements.port.value;
        setHostObs(hostV)
        setPortObs(portV)

        initializeOBSConnection()


    }

    const handleAd = async (slot) => {
        if (connected) {
            await obs.call('TriggerHotkeyByName', { hotkeyName: slot });
            setTimeout(1000)
            await obs.call('TriggerHotkeyByName', { hotkeyName: "A_SWITCH_1" });
        }
    }

    const handleCloseAd = async () => {
        await obs.call('TriggerHotkeyByName', { hotkeyName: "A_SWITCH_1" });
    }

    const handleScenesChange = async () => {

    }

    const getScenes = async () => {
        const scenesGeted = await obs.call('GetSceneList');
        setActiveSceneId(scenesGeted.currentProgramSceneUuid)
        setActiveSceneName(scenesGeted.currentProgramSceneName)
        setScenes(scenesGeted.scenes)
    }

    const handleSceneClick = async (data) => {
        await obs.call('SetCurrentProgramScene', { sceneName: data.name })
        setActiveSceneId(data.id);
    };

    const getScreenShot = async () => {
        try {
            let screenshot = await obs.call('GetSourceScreenshot', {
                sourceName: activeSceneName,
                imageFormat: "png",
                imageWidth: 960,
                imageHeight: 540
            });

            const imageDataUrl = `data:image/${screenshot.imageData}`;
            setImgData(imageDataUrl); // Actualizar el estado con la URL de datos de la imagen
        } catch (error) {
            console.error('Error al obtener la captura de pantalla:', error);
        }
    };


    useEffect(() => {
        if (connected) {
            getScenes()
        }
    }, [connected])

    useEffect(() => {

        initializeOBSConnection();

        // Cleanup function para desconectar cuando el componente se desmonta
        return () => {
            disconnectFromOBS();
        };
    }, [hostObs, portObs]);



    return (
        <div>
            <div className="top-obs-t">
                <h4>Panel de control de OBS</h4>

                <div className={`status-obs-color ${(connected) ? "green" : "red"}`} ></div>
            </div>

            {connected ? (
                <>
                    <small>Este panel se usara con el plugin de anuncios llamado <b>Animated-Lower-Thirds</b> se recomienda instalarlos en su OBS y agregar los <b>HOT_KEYS</b> adecuados para el funcionamiento de este apartado de control </small>


                    <div className='d-flex'>

                        <div className=" just-frame-tbts flex-fill">
                            <h5 className='my-2'>Anuncios</h5>
                            <div className="sponsorts-deck-client">
                                <button onMouseDown={() => {
                                    handleAd("LT1_SLT01")
                                }} onMouseUp={() => {
                                    handleCloseAd()
                                }}>
                                    <img src={JCrepuestosImg} />
                                </button>

                                <button onMouseDown={() => {
                                    handleAd("LT1_SLT02")
                                }} onMouseUp={() => {
                                    handleCloseAd()
                                }}>
                                    <img src={AceralImg} />
                                </button>

                                <button onMouseDown={() => {
                                    handleAd("LT1_SLT03")
                                }} onMouseUp={() => {
                                    handleCloseAd()
                                }}>
                                    <img src={CarbondePaloImg} />
                                </button>

                                <button onMouseDown={() => {
                                    handleAd("LT1_SLT04")
                                }} onMouseUp={() => {
                                    handleCloseAd()
                                }}>
                                    <img src={CalzadoElizabethImg} />
                                </button>

                                <button onMouseDown={() => {
                                    handleAd("LT1_SLT05")
                                }} onMouseUp={() => {
                                    handleCloseAd()
                                }}>
                                    <img src={CholaCuencanaImg} />
                                </button>

                                <button onMouseDown={() => {
                                    handleAd("LT1_SLT06")
                                }} onMouseUp={() => {
                                    handleCloseAd()
                                }}>
                                    <img src={CafeLaurenceImg} />
                                </button>

                                <button onMouseDown={() => {
                                    handleAd("LT1_SLT07")
                                }} onMouseUp={() => {
                                    handleCloseAd()
                                }}>
                                    <img src={MotoselJotaImg} />
                                </button>

                                <button onMouseDown={() => {
                                    handleAd("LT1_SLT08")
                                }} onMouseUp={() => {
                                    handleCloseAd()
                                }}>
                                    <img src={VidaVetImg} />
                                </button>
                            </div>
                        </div>

                        <div className=" just-frame-tbts flex-fill">
                            <h5 className='my-2'>Escenas</h5>
                            <div className="scenes-deck-client">
                                {scenes.map(scene => (
                                    <button
                                        key={scene.sceneUuid}
                                        className={`scene ${scene.sceneUuid === activeSceneId ? 'red' : ''}`}
                                        onClick={() => handleSceneClick({
                                            id: scene.sceneUuid,
                                            name: scene.sceneName
                                        })}
                                    >
                                        {scene.sceneName}
                                    </button>
                                ))}
                            </div>

                        </div>




                    </div>

                    <div className='d-flex'>
                        
                        <div className=" just-frame-tbts flex-fill">
                            <h5 className='my-2'>Escena principal</h5>
                            <div className="current-scene-screenshot d-flex flex-column ">
                                <button onClick={getScreenShot}>pressme</button>
                                {isImgData && <img src={isImgData} style={{width: "1000px"}} />}
                            </div>
                        </div>
                    </div>




                </>
            ) : (
                <form className='form-to-obs-ws' onSubmit={handleHostPort}>
                    <input type="text" name='host' placeholder='Host de obs' />
                    <input type="text" name='port' placeholder='Puerto de obs' />
                    <button >Enviar</button>
                </form>
            )}
        </div>
    );
}

export default ObsPanel
