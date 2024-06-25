import {useState, useEffect} from 'react';
import { socket } from '../../configs/config';
import '../../styles/dashboard/livechat.css';


function Chat() {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    
    const handleSubmit = (e) => {
        e.preventDefault()
        const newMessage = {
            body: message,
            from: 'Me'
        }
        setMessages([ ... messages, newMessage])
        socket.emit('message', message)
        console.log(messages)
    }

    useEffect(() => {
        socket.on('message', reciveMessage)

        return () => {
            socket.off('message', reciveMessage)
        }
    },[])

    const reciveMessage = message => setMessages((state) => [... state, message])

  return (
    <div className="main-chat">
        <div className="topbat-chat">
            <h5>Chat</h5>
        </div>
        <div className="body-chat">
            <div className="container-fluid container-messages">
                {messages.map((msg,i) => (
                    <div className={` bubble-chat ${msg.from === 'Me' ? 'text-start' : 'text-end'}`} key={i}>{msg.from} : {msg.body}</div>
                ))}
            </div>
            <div className="send-messages">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="sendmessage" id="sendmessage" placeholder='Escribe un mensaje...' className='flex-fill '
                    onChange={(e) => setMessage(e.target.value)}
                    />
                    <button>Enviar</button>
                </form>
            </div>
        </div>
      </div>
  )
}

export default Chat