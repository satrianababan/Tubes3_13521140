import './App.css';
import './normalize.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "I am an AI"
  }, {
    user: "me",
    message: "i am a human"
  }, {
    user: "gpt",
    message: "i am an AI"
  }
  ]);

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: 'Hello how re you?'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await fetch('http://localhost:4000/completions', options)
      const data = await response.json()
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button">
          <span>+</span>
          New chat
        </div>
        <ul className="history">
          <li>List History</li> 
        </ul>
        <div className="toggle-button">
          <input type="checkbox" id="cb1" />
          <label For="cb1">KMP</label>
          <input type="checkbox" id="cb2" />
          <label For="cb2">BM</label>
        </div>
      </aside>
      <section className="chatbox">
      <div className="chat-log">
        <h3>TUBES 3 STIMA</h3>
        <div className="chat-message">
          <div className="chat-message-center">
            <div className="avatar">          
            </div>
            <div className="message">
              Hello World!
            </div>
          </div>
        </div>
        <div className="chat-message gpt">
          <div className="chat-message-center">
            <div className="avatar gpt">
              
            </div>
            <div className="message">
              I am an AI
            </div>
          </div>
        </div>
      </div>
        <div className="chat-input">
          <form onSubmit={getMessages}>
            <input 
              // value={input}
              placeholder="Type a message"
              // onChange={(e) => setInput(e.target.value)} 
              row = "1"
              />
          </form>
          <div id="submit" onClick={getMessages}>Send</div>
        </div>
      </section>
    </div>
  );
}
export default App;