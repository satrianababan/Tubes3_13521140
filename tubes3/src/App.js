import './App.css';
import './normalize.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { answerQuestionBM, addQuestion, deleteQuestion, checkPresence, updateQuestion } from "./DatabaseAccess.js"
// import { evaluateExpression } from "../src/kalkulator.js"
// import { getDayOfWeek } from "../src/tanggal.js"


function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "hewo aim bongt"
  }, {
    user: "me",
    message: "hewo bongt"
  }, {
    user: "gpt",
    message: "hewo aim bongt"
  }
  ]);
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [question, setQuestion] = useState([]);


  const createNewChat = (user, message) => {
    const newChat = {
      user: user,
      message: message
    }
    setChatLog(prevLog => [...prevLog, newChat]);
  }

  async function getDataFromDB(){
    const url = "http://localhost:4000/qna/get";
    const response = await axios.get(url);
    const data = await response.data;
    setData(data);
    console.log(data);
  }
  function getDayOfWeek(date) {
    const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    // const [day, month, year] = input.split('/');
    // const date = new Date(`${month}/${day}/${year}`);

    // // Check if the date is valid
    // if (isNaN(date)) {
    //   console.log('Input tidak valid. Masukkan tanggal yang valid dengan format dd/mm/yyyy.');
    // } else {
    //   const dayOfWeek = getDayOfWeek(date);
    //   console.log(`Tanggal ${input} adalah hari ${dayOfWeek}.`);
    // }
    return daysOfWeek[date.getDay()];
  }
  function evaluateExpression(expression) {
    // Replace ^ with ** for exponentiation
    expression = expression.replace(/\^/g, '**');
    // Use eval() to evaluate the expression
    try {
      const result = eval(expression);
      if (isNaN(result)) {
        return 'Sintaks persamaan tidak sesuai.';
      } else {
        return result;
      }
    } catch (err) {
      return 'Sintaks persamaan tidak sesuai.';
    }
  }
  function handleSubmit(e){
    e.preventDefault();
    setChatLog(prevLog => [...prevLog, { user: "me", message: `${input}` }]);
    console.log("input berhasil");
    // //TODO
    getDataFromDB()
    realproccess(input);
    // matchRegEx(regexPatternList, input);
    // processQuery(regexPatternList, input);
    // console.log(input)
    //if toggle BM
    // getAnswerBM(input.toLowerCase());
    setInput("");
  }
  function clearLog(){
    setChatLog([]);
  }

  function realproccess(query){
    const regexPattern01 = /(.*)?hari (apa )*(pada |di |untuk )*(tanggal )*(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})(.*)?/gi;
    const regexPattern02 = /(pada )*(tanggal )*(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})(.*)?hari (apa)*(.*)?/gi;
    const regexPattern03 = /(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})/gi;
    const regexPattern11 = /(([0-9()])+[\+|\/|\-|\*]+)+([0-9()])*/g;
    const regexPattern12 = /([Bb]erapa ([Hh]asil )?)?(([Hh]asil) (dari))? (([0-9])+[\+|\/|\-|\*]+)+([0-9])*(\?)?/g;
    const regexPattern21 = /Tambahkan pertanyaan .+ dengan jawaban .+/gi;
    const regexPattern31 = /Hapus pertanyaan .+/gi;
    const regexPatternList = [[regexPattern01,regexPattern02,regexPattern03], [regexPattern11, regexPattern12], [regexPattern21], [regexPattern31]];
    processQuery(regexPatternList, query);
  }

  function matchRegEx(regexPatternList, pattern) {
    for (let i = 0; i < regexPatternList.length; i++) {
        for (let j = 0; j < regexPatternList[i].length; j++) {
            if (regexPatternList[i][j].test(pattern) == true) {
                return (i); //FOUND
            }
        }
    }
    return (-1); //NOT FOUND
}

function processQuery(regexPatternList, query) {
    let category = matchRegEx(regexPatternList, query);
    console.log(category)
    if (category == 0) {
        console.log("QUERY TANGGAL");
        let hasil = query.match(regexPatternList[0][2]);
        for(let i = 0;i<hasil[0].length;i++){
            if(hasil[0][i]=='\-' || hasil[0][i]=='\\' || hasil[0][i]=='\.'){
                hasil[0]=hasil[0].replace(hasil[0][i],'/');
            }
        }
        const [day, month, year] = hasil[0].split('/');
        const date = new Date(`${month}/${day}/${year}`);
        console.log(getDayOfWeek(date));
        setAnswer([...answer, getDayOfWeek(date)])
    } else if (category == 1) {
        console.log("QUERY KALKULATOR");
        let operation = query.match(regexPatternList[1][0]);
        // console.log(evaluateExpression(operation[0]));
        setAnswer([...answer, evaluateExpression(operation[0])])

    } else if (category == 2) {
        let i = 21;
        let pertanyaan = "";
        let jawaban = "";

        while (query.substring(i, i+15) != " dengan jawaban") {
            pertanyaan = pertanyaan + query[i];
            i = i + 1;
        }

        for (let j = i+16; j < query.length; j++) {
            jawaban = jawaban + query[j];
        }

        // if (checkPresence(pertanyaan) == false) {
        //     addQuestion(pertanyaan, jawaban);
        //     console.log("Pertanyaan " + pertanyaan + " telah ditambahkan...");
        // } else {
        //     updateQuestion(pertanyaan, jawaban);
        //     console.log("Pertanyaan " + pertanyaan + " sudah ada! Jawaban di-update ke " + jawaban);
        // }
    } else if (category == 3) {
        console.log("QUERY HAPUS PERTANYAAN");
        // if(checkPresence(query.substring(17))==false){
        //     console.log("Pertanyaan tidak ditemukan!");
        // }
        // else{
        //     deleteQuestion(query.substring(17));
        //     console.log("Pertanyaan "+query.substring(17)+" telah dihapus!");
        // }
    } else {
        // answerQuestionBM(query);
    }
}

  return (
    <div className="App">
      <aside className="sidemenu">
        <button onClick={() => {
          createNewChat();
          clearLog();
        }} 
        className="side-menu-button">
        <span>+</span>
          New chat
        </button>
        
        <div className="toggle-button">
          <input type="checkbox" id="cb1" />
          <label For="cb1">KMP</label>
          <input type="checkbox" id="cb2" />
          <label For="cb2">BM</label>
        </div>
      </aside>
      <section className="chatbox">
      <div className="chat-log">
        {/* {
          chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
        } */}
        {/* <div ref={newMessageRef} /> */}
        <h3>TUBES 3 STIMA</h3>
        <div className="chat-message">
        {
            chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          }
          <div className="chat-message-center">
            <div className="avatar">          
            </div>
            <div className="message">
            </div>
          </div>
        </div>
        {answer.map((message, index) => (
          <div className="chat-message gpt">
            <div className="chat-message-center">
              <div className="avatar gpt">
                
              </div>
                <div className='message'>{message}</div>
            </div>
          </div>
        ))}
      </div>
        <div className="chat-input">
          <form onSubmit={handleSubmit}>
            <input 
              value={input}
              name='formdata'
              placeholder="Type a message"
              onChange={(e) => setInput(e.target.value)} 
              row = "1"
              />
          </form>
        </div>
      </section>
    </div>
  );
}
  const ChatMessage = ({ message }) => {
    return(
            <div className={`chat-message ${message.user === "gpt" && "chatgpt" }`}>
              <div className="chat-message-center">
                <div className= {`avatar ${message.user === "gpt" && "chatgpt" }`}>     
                </div>
                <div className="message">
                  {message.message}
                </div>
              </div>
            </div>
    )
  }
export default App;