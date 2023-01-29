import './App.css';
import { useState, useEffect } from 'react';
import Chat from './components/Chat';
import Signin from './components/Signin';
function App() {

  const [listofUsers, setlistofUsers] = useState([])

  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setcurrentUser] = useState(null);

  const [chatEmail,setChatemail] = useState('');

  useEffect(() => {
    // fetchAllChat()
    fetchAllUsers()
  }, [])


  //finding all chats since there is only one chat available
  //find instead one chat using code
  const fetchAllChat = async () => {
    const res = await fetch('/chats')
    const chat = await res.json();
    if (chat.length > 0) {
      setCurrentChat(chat[0])
      console.log(chat[0].chatcode)
    }
  }
  const fetchAllUsers = async () => {
    const res = await fetch('/users')
    const user = await res.json();
    if (user) {
      setlistofUsers(user)
      console.log(user)
    }
  }
  //finding one chat using code
  const fetchTwoingleChat = async (code, code2) => {
    const res = await fetch(`/chats/${code}`)
    const chat = await res.json();
    const res1 = await fetch(`/chats/${code2}`)
    const chat2 = await res1.json();
    if (chat.chatcode !== undefined) {
      setCurrentChat(chat)
      return chat;
    } else if (chat2.chatcode !== undefined) {
      setCurrentChat(chat2)
      return chat2;
    } else return null;
  }

  const startChatting = async (code1, code2) => {
    const chat = await fetchTwoingleChat(code1, code2)
    const newData = { chatcode: code1, chats: [] }
    console.log("start chatting", chat)
    if (chat === null) {
      console.log("chat is null")
      const res = await fetch(`/chats`, {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const newChat = await res.json();
      if (newChat) {
        console.log("chat created");
      }
      setCurrentChat(newChat);
    } else {
      console.log("existing chat found")
    }
  }
  return (
    <div>
      {/* <Chat/> */}

      {
        currentUser ?
          <div className='chatcontainer'>
            <div >
              <div className='user-info'>
                <p>{currentUser.email}</p>
                <p>{currentUser.name}</p>
                <button onClick={() => { setcurrentUser(null) }}>Sign out</button>
              </div>

            </div>
            {
              currentChat ? <Chat chatEmail={chatEmail} currentUser={currentUser} setCurrentChat={setCurrentChat} currentChat={currentChat} />
                : <div style={{ width: '30rem', height: "40rem", border: '1px solid white', padding: '2rem 0', color: 'white' }}>Chats will appear here</div>
            }


            <div className='user-list'>
              <h2>List of users</h2>
              {
                listofUsers.map((user) => {
                  if (user._id !== currentUser._id) {
                    return <div className='user-list-item' key={user._id}>
                      <p >{user.email}</p>
                      <img src='https://cdn-icons-png.flaticon.com/512/3024/3024593.png' onClick={() => { 
                        startChatting(user.email + currentUser.email, currentUser.email + user.email)
                        setChatemail(user.email)
                         }} style={{ width: '2rem' }} />
                    </div>
                  }
                })
              }
            </div>
          </div>
          : <div>
            <Signin setcurrentUser={setcurrentUser} />

          </div>
      }

    </div>
  );
}

export default App;
