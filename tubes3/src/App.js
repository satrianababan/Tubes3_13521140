import logo from './logo.svg';
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
      </aside>
      <section className="chatbox">
      <div className="chat-log">
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
        </div>
      </section>
    </div>
  );
}
export default App;
