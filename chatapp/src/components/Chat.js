import './chat.css';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, MessageGroup } from '@chatscope/chat-ui-kit-react';
import { useState, useRef, useEffect } from 'react';
let dir = false;
function Chat(props) {

  
  const {chatEmail,currentUser,setCurrentChat,currentChat} = props;

  
  const inputRef = useRef();
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  
  const [inputmsg, setInputmsg] = useState('')

  useEffect(() => {
    setInterval(async() => {
      setCurrentChat(await fetchSingleChat(currentChat.chatcode))
    }, 2000);
  }, [])

  
  const fetchSingleChat = async (code) => {
    const res = await fetch(`/chats/${code}`)
    const chat = await res.json();
    if (chat.chatcode !== undefined) {
      return chat;
    } else return null;
  }
  
  const sendMessage = async (code) => {

    const newData = { chatcode: currentChat.code, chats: [...currentChat.chats, { message: inputmsg, email: currentUser.email }] }
    const res = await fetch(`/chats/addmessage/${code}`, {
      method: 'PATCH',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const currentchat = await res.json();
    if (currentchat) {
      console.log(currentchat)
      setCurrentChat(await fetchSingleChat(code))
    }
  }


  const handleSend = message => {
    setMessages(m => [...m, {
      message,
      direction: !dir ? "incoming" : "outgoing"
    }]);
    setMsgInputValue("");
    inputRef.current.focus();
    dir = !dir;
  };
  return (
    <div >
      <header>
        <div style={{ position: "relative", height: "40rem", width: '30rem', margin: 'auto' }}>
          <h3 style={{color:'white'}}>Chatting with {chatEmail}</h3>
          {
            currentChat && 
            <MainContainer>
              <ChatContainer >
                <MessageList style={{ background: '#282A3A', padding: '1rem' }} autoScrollToBottomOnMount={true} autoScrollToBottom={true} >
                  {
                    currentChat.chats.map((message) => {
                      return <MessageGroup style={{}} direction={message.email===currentUser.email ?"outgoing":"incoming"}>
                        <MessageGroup.Messages>
                          <Message model={{
                            message: message.message,
                          }} />
                        </MessageGroup.Messages>
                      </MessageGroup>
                    })
                  }

                </MessageList>
                <MessageInput placeholder="Type message here" onSend={() => { sendMessage(currentChat.chatcode) }} onChange={setInputmsg} value={inputmsg} ref={inputRef} />
              </ChatContainer>
            </MainContainer>
          }

        </div>
      </header>
    </div>
  );
}

export default Chat;
