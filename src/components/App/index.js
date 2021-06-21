import React, { useState, useEffect } from 'react';
import { FormControl, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Message from '../Message'
import './App.css';
import db from '../../firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import { IconButton } from '@material-ui/core';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessage] = useState([]);
  const [username, setUsername] = useState('');


  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessage(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    });
    }, [])

  useEffect(() => {
    // const name = prompt('Өөрийнхөө нэрийг оруулна уу?')
    setUsername(prompt('Өөрийнхөө нэрийг оруулна уу?'))
  }, [])


  const sendMessage = (event) => {
    // Мессеж илгээх хэсэг
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('');
  }

  return (
    <div className="App">
      <img className='app__messengerLogo' src="https://cdn.icon-icons.com/icons2/2621/PNG/512/brand_facebook_messenger_icon_157342.png" alt="" />
      <h1>Сайн уу Messenger app байна 🚀</h1>
      <p>🚀 Энэ бол хуулбарлаж хийсэн messenger app || React & Firebase</p>
      <h2>Тавтай морилно уу? {username}</h2>

      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input className='app__input' placeholder='Мессежээ бичээрэй' value={input} onChange={event => setInput(event.target.value)} />

          <IconButton className='app__iconButton' variant="contained" disabled={!input} color="primary" type='submit' onClick={sendMessage}>
            <SendIcon/>
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
            {
              messages.map(({id, message}) => (
                <Message key={id} username={username} message={message} />
              ))
            }
      </FlipMove>
    </div>
  );
}

export default App;