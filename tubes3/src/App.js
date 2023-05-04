import './App.css';
import './normalize.css';

function App() {

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
          <textarea className="chat-input-textarea" placeholder="Type a message..."></textarea>
            <input className="chat-submit" type="submit" value="Send" />
        </div>
      </section>
    </div>
  );
}
export default App;
