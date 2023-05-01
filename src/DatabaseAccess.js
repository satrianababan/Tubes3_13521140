import { similarityPercentage } from './levenshteinDistance.js'
import { BoyerMooreMatch } from './BoyerMoore.js'
import mysql from 'mysql2'

const pool = mysql.createPool ({
    host: 'localhost',
    user: '...',
    password: '...',
    database: '...'
}).promise();



async function answerQuestion(quest) {
    // const [result] = await pool.query("SELECT jawaban FROM question WHERE pertanyaan LIKE '" + quest + "'");
    const [all] = await pool.query("SELECT * FROM question");
    
    for (let i = 0; i < all.length; i++) {
        let BoyerMooreResult = BoyerMooreMatch(all[i].pertanyaan, quest);
        if (BoyerMooreResult != -1) {
            console.log(all[0].jawaban);
            return; //Pertanyaan tepat dan sudah terjawab
        }
    }
    
    //PERTANYAAN BELUM TERJAWAB
    let similarityList = [];

    for (let i = 0; i < all.length; i++) {
        let similarity = similarityPercentage(quest, all[i].pertanyaan);
        if (similarity > 0.9) {
            similarityList.push(all[i].pertanyaan);
        }
    }
    console.log("Mungkin maksud Anda: ");
    for (let i = 0; i < similarityList.length; i++) {
        console.log(similarityList[i]);
    }
}



// TESTING
let quest = "kucing apa yang ga pernah salah";
answerQuestion(quest);