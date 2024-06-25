import { saveTittlePage } from '../../utils/tittlePage'
import Chat from '../../components/controlpanel/Chat.jsx'

function LiveChat() {
  saveTittlePage("Chat en vivo")
  return (
    <div>
      <Chat />
    </div>
  )
}

export default LiveChat
