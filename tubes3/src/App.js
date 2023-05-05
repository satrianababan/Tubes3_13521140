import './App.css';
import './normalize.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
//import { answerQuestionBM, addQuestion, deleteQuestion, checkPresence, updateQuestion } from "./DatabaseAccess.js"
// import { evaluateExpression } from "../src/kalkulator.js"
// import { getDayOfWeek } from "../src/tanggal.js"


function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {user: "gpt", 
    message: "Halo, saya adalah chatbot yang akan membantu anda menemukan jawaban dari pertanyaan anda. Silakan bertanya."},
  ]);
  const [ans, setAns] = useState([]);

  function similarity(s1, s2) {
    if (s1 == null || s2 == null) {
return 0
    }
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  function getDataFromDB(question){
    var encodedInput = encodeURIComponent(question)
    var url = `/qna/get/${encodedInput}`;
    axios.get(url, {
      responseType: 'json'
    }).then(response => {
      if(response.status === 200){
        if (response.data == null){
          setChatLog(prevLog => [...prevLog, { user: "gpt", message: "Pertanyaan tidak ditemukan, silakan tambahkan pertanyaan"}])
        } else{
          if (response.data[0].answer === "Pertanyaan tidak ditemukan, mungkin maksud anda: \n"){
            var respon = response.data[0].answer
            for (let i = 1; i < response.data.length; i++) {
              let elmt = i.toString() + ". " + response.data[i].question;
              respon = respon + elmt
              if (i < response.data.length -1){
                respon = respon + '\n'
              }
            }
            setChatLog(prevLog => [...prevLog, { user: "gpt", message: respon}])
          } else{
            // const firstAnswer = response.data[0].answer;
            // setChatLog(prevLog => [...prevLog, { user: "gpt", message: firstAnswer}])
            setAns(response.data)
            console.log(response.data)
            console.log("dapat jawaban")
          }
        }
      }
      else{
        console.log("No question found in database")
      }
    })
  }
  function clearLog(){
    setChatLog([]);
  }

  const newMessageRef = useRef(null)

  const scrollToBottom = () => {
    newMessageRef.current?.scrollIntoView({ behaviour: "smooth"})
  }

  useEffect(() => {
    scrollToBottom()}
    ,[chatLog]
  );
  function getDayOfWeek(date) {
    const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
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
        // setAnswer([...answer, getDayOfWeek(date)])
        setChatLog(prevLog => [...prevLog, { user: "gpt", message: getDayOfWeek(date)}]);
    } else if (category == 1) {
        console.log("QUERY KALKULATOR");
        let operation = query.match(regexPatternList[1][0]);
        // console.log(evaluateExpression(operation[0]));
        // setAnswer([...answer, evaluateExpression(operation[0])])
        setChatLog(prevLog => [...prevLog, { user: "gpt", message: evaluateExpression(operation[0])}]);

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
      // console.log(input)
      let temp =""
      let temp1 = ""
      let val1 = 0
      // console.log("aaa",ans)
      ans.map((item)=>{
        const val = similarity(input, item?.pertanyaan)
        if (val > 0.9){
          temp = item.jawaban
        }else{
          if (val1<val){
            val1 = val
            temp1 = item.pertanyaan
          }
        }
      })
      if (temp!=""){
        setChatLog(prevLog => [...prevLog, { user: "gpt", message: temp}]);
      }else{
        setChatLog(prevLog => [...prevLog, { user: "gpt", message: "mungkin maksud anda "+temp1}]);
        
      }
        // answerQuestionBM(query);
        // console.log("QUERY TIDAK DITEMUKAN");
    }
}

return (
  <div className="App">
    <aside className="sidemenu">
      <div className="side-menu-button" onClick={clearLog}>
        <span>
          +
        </span>
        New chat
      </div>
    </aside>
    <section className="chatbox">
      <div className="chat-log">
        {
          chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
        }
       
      
      </div>
      <div
        className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              placeholder='Type your input here'
              value={input}
              onChange={(e) => setInput(e.target.value) }
              className="chat-input-textarea"
              rows="1"
              >
            </input>
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