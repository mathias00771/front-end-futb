import { saveTittlePage } from '../../utils/tittlePage'

import SoccerPanel from '../../components/controlpanel/SoccerPanel'
import Chat from '../../components/controlpanel/Chat'
import ObsPanel from '../../components/ObsPanel'

import '../../styles/dashboard/controlpanel.css'


function ControlP() {

  saveTittlePage("Control Panel")

  return (
    <div className='cp--containerfull'>
      <div className="note--cp">
        <p>Bienvenido a tu panel de control, donde podras utilizarlo para manejar tu OBS a tu gusto al igual que tu scoreboard y el chat que te otorgaremos aqui.</p>
      </div>
      <div className="insade--boxes--cp d-flex wrap">

        <div className="box--cp flex-fill">
        <SoccerPanel />
        </div>

        <div className="box--cp is-obs-cp flex-fill">
          <ObsPanel/>
        </div>
        
        <div className="box--cp is-chat-cp flex-fill">
        <Chat />
        </div>

        
      </div>
    </div>
  )
}

export default ControlP
