import { answerQuestionBM, addQuestion, deleteQuestion, checkPresence, updateQuestion } from "./DatabaseAccess.js"
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
        console.log("QUERY KALKULATOR");
        console.log(evaluateExpression(query));
    } else if (category == 1) {
        console.log("QUERY TANGGAL");
        const [day, month, year] = query.split('/');
        const date = new Date(`${month}/${day}/${year}`);
        console.log(getDayOfWeek(date));
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

        if (checkPresence(pertanyaan) == false) {
            addQuestion(pertanyaan, jawaban);
            console.log("Pertanyaan " + pertanyaan + " telah ditambahkan...");
        } else {
            updateQuestion(pertanyaan, jawaban);
            console.log("Pertanyaan " + pertanyaan + " sudah ada! Jawaban di-update ke " + jawaban);
        }
    } else if (category == 3) {
        console.log("QUERY HAPUS PERTANYAAN");
    } else {
        answerQuestionBM(query);
    }
}


// // TESTING
// // Query untuk meminta hari dari tanggal
const regexPattern11 = /(.*)?hari (apa )*(pada |di |untuk )*(tanggal )*(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2}|\d{4})(.*)?/gi;
const regexPattern12 = /(pada )*(tanggal )*(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2}|\d{4})(.*)?hari (apa)*(.*)?/gi;
const regexPattern13 = /(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2}|\d{4})/gi;
const regexPattern21 = /Tambahkan pertanyaan .+ dengan jawaban .+/gi;
const regexPattern31 = /Hapus pertanyaan .+/gi;
const regexPatternList = [[], [regexPattern11, regexPattern12, regexPattern13], [regexPattern21], [regexPattern31]];
// console.log(matchRegEx(regexPatternList, "Tanggal 03-12-2022 itu hari apa sih ya? Tolong beritahu saya."));
// console.log(matchRegEx(regexPatternList, "Hai, tau gak hari apa pada tanggal 06.02.2003?"));


// TESTING 2
let query = "Tambahkan pertanyaan apa tubes terseru stima? dengan jawaban yang paling seru adalah tubes 4";
processQuery(regexPatternList, query);