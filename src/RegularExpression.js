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
    } else if (category == 1) {
        console.log("QUERY KALKULATOR");
        let operation = query.match(regexPatternList[1][0]);
        console.log(evaluateExpression(operation[0]));
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
        if(checkPresence(query.substring(17))==false){
            console.log("Pertanyaan tidak ditemukan!");
        }
        else{
            deleteQuestion(query.substring(17));
            console.log("Pertanyaan "+query.substring(17)+" telah dihapus!");
        }
    } else {
        answerQuestionBM(query);
    }
}


// // Hasil Gabungan
function realproccess(query){
    const regexPattern01 = /(.*)?hari (apa )*(pada |di |untuk )*(tanggal )*(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2}|\d{4})(.*)?/gi;
    const regexPattern02 = /(pada )*(tanggal )*(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2}|\d{4})(.*)?hari (apa)*(.*)?/gi;
    const regexPattern03 = /(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2}|\d{4})/gi;
    const regexPattern11 = /(([0-9])+[\+|\/|\-|\*]+)+([0-9])*/g;
    const regexPattern12 = /([Bb]erapa ([Hh]asil )?)?(([Hh]asil) (dari))? (([0-9])+[\+|\/|\-|\*]+)+([0-9])*(\?)?/g;
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
// realproccess(query);