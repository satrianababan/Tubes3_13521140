import { answerQuestionBM, answerQuestionKMP, addQuestion, deleteQuestion, checkPresence, addChat, newChat } from "./DatabaseAccess.js"
import { evaluateExpression } from "./kalkulator.js"
import { getDayOfWeek } from "./tanggal.js"

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

        let answer = "Hari " + getDayOfWeek(date);
        addChat("me", query, "bot", answer);
        console.log(answer);
    
    } else if (category == 1) {
        // QUERY KALKULATOR
        let operation = query.match(regexPatternList[1][0]);
        let answer = "Hasilnya adalah " + (evaluateExpression(operation[0]));
        addChat("me", query, "bot", answer);
        console.log(answer);
    
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
// console.log(matchRegEx(regexPatternList, "Tanggal 03-12-2022 itu hari apa sih ya? Tolong beritahu saya."));
// console.log(matchRegEx(regexPatternList, "Hai, tau gak hari apa pada tanggal 06.02.2003?"));


// TESTING 2
// let query = "hari apa pada tanggal 06-02-2003?";
// let query = "Berapa hasil dari 2+3";
// let query = "tambahkan pertanyaan anjing makannya apa? dengan jawaban anjing makan whiskas";
// let query = "hapus PerTanyaan siapa anjing saya?";
// let query = "Hari apa tanggal 04-05-2023?";

// newChat();
let query = "hapus pertanyaan siapa presiden Indonesia?";
// let query = "Hari apa pada tanggal 5/5/2023";
realProccess(query);