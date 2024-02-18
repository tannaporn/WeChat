import MessageContainer from "./MessageContainer"
import SendMessageForm from "./SendMessageForm"
import {Button} from "react-bootstrap"
import ConnectedUsers from "./ConnectedUsers"

function Chat({messages,sendMessage,closeConnection,users}){
   

return( 
<div className='chat'>
<div className='leave-room'>
    <Button variant='danger' onClick={() => closeConnection()}>Leave Room</Button>
</div>
<div>
<ConnectedUsers users={users} />

<MessageContainer messages={messages }/>
<SendMessageForm sendMessage ={sendMessage}/>

</div>
</div>
)
}
export default Chat;