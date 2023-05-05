import './App.css';
import './normalize.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mysql from 'mysql2'
// import { answerQuestionBM, answerQuestionKMP, addQuestion, deleteQuestion, checkPresence, addChat, newChat  } from "../../src/DatabaseAccess.js"
// import { evaluateExpression } from "../../src/kalkulator.js"
// import { getDayOfWeek } from "../../src/tanggal.js"

const pool = mysql.createPool ({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tubes_stima'
}).promise();

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
  
  function handleSubmit(e){
    e.preventDefault();
    setChatLog(prevLog => [...prevLog, { user: "me", message: `${input}` }]);
    console.log("input berhasil");
    // //TODO
    getDataFromDB()
    realProccess(input);
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

    if (category == 0) {
        // QUERY TANGGAL
        let hasil = query.match(regexPatternList[0][2]);
        for (let i = 0; i < hasil[0].length; i++){
            if (hasil[0][i]=='\-' || hasil[0][i]=='\\' || hasil[0][i]=='\.'){
                hasil[0] = hasil[0].replace(hasil[0][i],'/');
            }
        }
        const [day, month, year] = hasil[0].split('/');
        const date = new Date(`${month}/${day}/${year}`);

        let Answer = "Hari " + getDayOfWeek(date);
        addChat("me", query, "bot", Answer);
        console.log(Answer);
        setAnswer([...answer, Answer]);
    
    } else if (category == 1) {
        // QUERY KALKULATOR
        let operation = query.match(regexPatternList[1][0]);
        let Answer = "Hasilnya adalah " + (evaluateExpression(operation[0]));
        addChat("me", query, "bot", Answer);
        console.log(Answer);
        setAnswer([...answer, Answer]);

    
    } else if (category == 2) {
        // QUERY TAMBAH / UPDATE PERTANYAAN
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

        addQuestion(query, pertanyaan, jawaban);
    
    } else if (category == 3) {
        // QUERY HAPUS PERTANYAAN
        deleteQuestion(query, query.substring(17));
    
    } else {
        // QUERY PERTANYAAN
        answerQuestionBM(query);
    }
}


// // Hasil Gabungan
function realProccess(query){
    const regexPattern01 = /(.*)?hari (apa )*(pada |di |untuk )*(tanggal )*(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})(.*)?/gi;
    const regexPattern02 = /(pada )*(tanggal )*(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})(.*)?hari (apa)*(.*)?/gi;
    const regexPattern03 = /(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})/gi;
    const regexPattern11 = /(([0-9()])+[\+|\/|\-|\*]+)+([0-9()])*/g;
    const regexPattern12 = /([Bb]erapa ([Hh]asil )?)?(([Hh]asil) (dari))? (([0-9()])+[\+|\/|\-|\*]+)+([0-9()])*(\?)?/g;
    const regexPattern21 = /Tambahkan pertanyaan .+ dengan jawaban .+/gi;
    const regexPattern31 = /Hapus pertanyaan .+/gi;
    const regexPatternList = [[regexPattern01,regexPattern02,regexPattern03], [regexPattern11, regexPattern12], [regexPattern21], [regexPattern31]];
    processQuery(regexPatternList, query);
}





async function answerQuestionBM(quest) {
    // const [result] = await pool.query("SELECT jawaban FROM question WHERE pertanyaan LIKE '" + quest + "'");
    const [all] = await pool.query("SELECT * FROM question");
    let maximum = -1;
    let index = -1;
    let found = false;

    for (let i = 0; i < all.length; i++) {
        let BoyerMooreResult = BoyerMooreMatch(all[i].pertanyaan, quest);
        let similarity = similarityPercentage(all[i].pertanyaan, quest);

        if (BoyerMooreResult != -1) {
            if (found == false) {
                maximum = similarity;
                index = i;
                found = true;
            } else {
                if (similarity > maximum) {
                    maximum = similarity;
                    index = i;
                }
            }
        }

        if (found == false) {
            if (similarity >= 0.9 && similarity > maximum) {
                maximum = similarity;
                index = i;
            }
        }
    }

    // PERTANYAAN BISA DIJAWAB
    if (index != -1) {
        let answer = all[index].jawaban;
        addChat("me", quest, "bot", answer);
        console.log(answer);
        return;
    }


    // PERTANYAAN MASIH BELUM TERJAWAB
    all.sort(function(a,b){return similarityPercentage(b.pertanyaan,quest)-similarityPercentage(a.pertanyaan,quest)});
    let answer = "Mungkin maksud Anda:\n";
    for (let i = 0; i < 3; i++) {
        if (i != 2) {
            answer = answer + all[i].pertanyaan + "\n";
        } else {
            answer = answer + all[i].pertanyaan;
        }
    }
    addChat("me", quest, "bot", answer);
    console.log(answer);
}



async function answerQuestionKMP(quest) {
    // const [result] = await pool.query("SELECT jawaban FROM question WHERE pertanyaan LIKE '" + quest + "'");
    const [all] = await pool.query("SELECT * FROM question");
    let maximum = -1;
    let index = -1;
    let found = false;

    for (let i = 0; i < all.length; i++) {
        let KMPResult = KMP(quest, all[i].pertanyaan);
        let similarity = similarityPercentage(all[i].pertanyaan, quest);

        if (KMPResult != []) {
            if (found == false) {
                maximum = similarity;
                index = i;
                found = true;
            } else {
                if (similarity > maximum) {
                    maximum = similarity;
                    index = i;
                }
            }
        }

        if (found == false) {
            if (similarity >= 0.9 && similarity > maximum) {
                maximum = similarity;
                index = i;
            }
        }
    }

    // PERTANYAAN BISA DIJAWAB
    if (index != -1) {
        let answer = all[index].jawaban;
        addChat("me", quest, "bot", answer);
        console.log(answer);
        return;
    }


    // PERTANYAAN MASIH BELUM TERJAWAB
    all.sort(function(a,b){return similarityPercentage(b.pertanyaan,quest)-similarityPercentage(a.pertanyaan,quest)});
    let answer = "Mungkin maksud Anda:\n";
    for (let i = 0; i < 3; i++) {
        if (i != 2) {
            answer = answer + all[i].pertanyaan + "\n";
        } else {
            answer = answer + all[i].pertanyaan;
        }
    }
    addChat("me", quest, "bot", answer);
    console.log(answer);
}



async function addQuestion(query, pertanyaan, jawaban) {
    let found = false;
    const [all] = await pool.query("SELECT * FROM question");
    for (let i = 0; i < all.length; i++) {
        if (BoyerMooreMatch(all[i].pertanyaan, pertanyaan) == 0 && similarityPercentage(all[i].pertanyaan, pertanyaan) == 1) {
            found = true;
        }
    }

    if (found == false) {
        await pool.query("INSERT INTO question (pertanyaan, jawaban) VALUES (?, ?)"
            , [pertanyaan, jawaban]);
        let Answer = "Pertanyaan " + pertanyaan + " telah ditambahkan..."
        addChat("me", query, "bot", Answer);
        console.log(Answer);
        setAnswer([...answer, Answer]);
    } else {
        await pool.query("UPDATE question SET jawaban = '" + jawaban 
            + "' WHERE pertanyaan LIKE '" + pertanyaan + "'");
        let Answer = "Pertanyaan " + pertanyaan + " sudah ada! Jawaban di-update ke " + jawaban;
        addChat("me", query, "bot", Answer);
        console.log(Answer);
        setAnswer([...answer, Answer]);
    }
}



async function deleteQuestion(query, pertanyaan) {
    let found = false;
    const [all] = await pool.query("SELECT * FROM question");
    for (let i = 0; i < all.length; i++) {
        if (BoyerMooreMatch(all[i].pertanyaan, pertanyaan) == 0 && similarityPercentage(all[i].pertanyaan, pertanyaan) == 1) {
            found = true;
        }
    }

    if (found == true) {
        await pool.query("DELETE FROM question WHERE pertanyaan LIKE '"+ pertanyaan +"'");
        let Answer = "Pertanyaan "+query.substring(17)+" telah dihapus!";
        addChat("me", query, "bot", Answer);
        console.log(Answer);
        setAnswer([...answer, Answer]);
    } else {
        let Answer = "Pertanyaan tidak ditemukan!";
        addChat("me", query, "bot", Answer);
        console.log(Answer);
        setAnswer([...answer, Answer]);
    }
}



async function checkPresence(pertanyaan) {
    const [all] = await pool.query("SELECT * FROM question");
    for (let i = 0; i < all.length; i++) {
        if (BoyerMooreMatch(all[i].pertanyaan, pertanyaan) == 0 && similarityPercentage(all[i].pertanyaan, pertanyaan) == 1) {
            return (true);
        }
    }

    return (false);
}



// export async function updateQuestion(pertanyaan, jawaban) {
//     await pool.query("UPDATE question SET jawaban = '" + jawaban 
//         + "' WHERE pertanyaan LIKE '" + pertanyaan + "'");
// }



async function newChat() {
    await pool.query("INSERT INTO history (id, type, chat) SELECT COUNT(DISTINCT id), \"bot\", \"Hai, ada yang bisa saya bantu? :)\" FROM history");
    
    const [init] = await pool.query("SELECT chat FROM history WHERE id = (SELECT COUNT(DISTINCT id) FROM history)-1");
    console.log(init[0].chat);
}



// export async function addChat(type, chat) {
//     await pool.query("INSERT INTO history (id, type, chat) SELECT COUNT(DISTINCT id)-1, \"" + type + "\", \"" + chat + "\" FROM history");
// }
async function addChat(type1, chat1, type2, chat2) {
    await pool.query("INSERT INTO history (id, type, chat) SELECT COUNT(DISTINCT id)-1, \"" + type1 + "\", \"" + chat1 + "\" FROM history");
    await pool.query("INSERT INTO history (id, type, chat) SELECT COUNT(DISTINCT id)-1, \"" + type2 + "\", \"" + chat2 + "\" FROM history");
}

function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  let lowcase1 = str1.toLowerCase();
  let lowcase2 = str2.toLowerCase();

  // Create a 2D array to store the dynamic programming table
  const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(null));

  // Initialize the first row and first column of the table
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // Fill in the rest of the table using the Levenshtein Distance formula
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = lowcase1[i - 1] === lowcase2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // Deletion
        dp[i][j - 1] + 1, // Insertion
        dp[i - 1][j - 1] + cost // Substitution
      );
    }
  }
  // The final result is the value in the bottom-right cell of the table
  return dp[m][n];
}

function getMaxLength(str1, str2) {
  if (str1.length > str2.length) {
      return (str1.length);
  } else {
      return (str2.length);
  }
}

function similarityPercentage(str1, str2) {
  let maximum = getMaxLength(str1, str2);
  let same = (maximum - levenshteinDistance(str1, str2)) / maximum
  return (same);
}
function KMP(test,kalimat){
  var simpan1 = test.toLowerCase();
  var simpan2 = kalimat.toLowerCase();
  var indekshasil = [];
  var lensim1 = simpan1.length;
  var lensim2 = simpan2.length;
  var border = borderFunct(simpan1);
  var i = 0;
  var j = 0;
  while((lensim2-i)>=(lensim1-j))
  {
      if(simpan1.charAt(j) == simpan2.charAt(i))
      {
          i++;
          j++;
      }
      if(j==lensim1)
      {
          indekshasil.push(i-j);
          j = border[j-1];
      }
      else if(i<lensim2 && simpan1.charAt(j)!=simpan2.charAt(i))
      {
          if(j!=0)
          {
              j = border[j-1];
          }
          else
          {
              i++;
          }
      }
  }
  return indekshasil;
  
}
function cekarrSame(arr1,arr2){
  var cek = 0;
  for (let i = 0; i < arr1.length; i++) {
      if(arr1[i] == arr2[i]){
          cek += 1;
      }
  }
  if(cek == arr1.length){
      return true;
  }
  else{
      return false;
  }
}
function borderFunct(text){
  if(text.length == 0){
      return [];
  }
  var border = new Array(text.length);
  border[0] = 0;
  if(text.length == 1){
      return border;
  }
  else
  {
      var max = 1;
      while(max<text.length)
      {
          var simpan = 0;
          let arrpref = [];
          for (let i = 0;i <= max ;i++) {//prefix
              arrpref.push(text[i]);
              let arrsuf = [];
              var acuan;
              if(max-i == 0){
                  acuan = 1;
              }
              else{
                  acuan = max-i;
              }
              for(let j = max;j >= acuan;j--)//suffix
              {
                  arrsuf.splice(0,0,text[j]);
              }
              if(cekarrSame(arrpref,arrsuf))
              {
                  simpan = i+1;
              }
          }
          
          
          border[max] = simpan;
          max += 1;

      }
  }

  return border;
}
function BuildLast(pattern) {
  let last = new Map();
  for (let idx = 0; idx < pattern.length; idx++) {
      last.set(pattern[idx], idx);
  }
  return (last);
}

function FindMin(x, y) {
  if (x < y) {
      return (x);
  } else {
      return (y);
  }
}

function BoyerMooreMatch(text, pattern) {
  const last = BuildLast(pattern);
  // console.log(last);
  let text_length = text.length;
  let pattern_length = pattern.length;
  let i = pattern_length - 1;

  if (i > text_length - 1) { //pattern lebih panjang dari teks
      return (-1);
  }

  let j = pattern_length - 1;
  while (i <= text_length - 1) {
      if (pattern[j] == text[i]) {
          if (j == 0) {
              return (i); //MATCH
          } else {
              i = i - 1;  //LOOKING-GLASS TECHNIQUE
              j = j - 1;
          }
      } else {  //CHARACTER-JUMP TECHNIQUE
          let last_occurence = last.get(text[i]);
          // let temp = text[i];
          if (last_occurence != null) {
              i = i + pattern_length - FindMin(j, (last_occurence + 1));
          } else {
              i = i + pattern_length;
          }
          
          // console.log("1+last_occurance (" + temp + "): " + (1+last_occurence));
          // console.log("j (letak mismatch): " + j);
          // console.log("Hasil FindMin: " + FindMin(j, (last_occurence + 1)));
          // console.log("i (setelah diubah): " + i + "\n");
          
          j = pattern_length - 1;
      }
  }

  return (-1); //NO MATCH
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
function getDayOfWeek(date) {
  const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return daysOfWeek[date.getDay()];
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