import { similarityPercentage } from './levenshteinDistance.js'
import { BoyerMooreMatch } from './BoyerMoore.js'
import { KMP } from './KMP.js'
import mysql from 'mysql2'

const pool = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: 'ZyuohEagle02',
    database: 'cobastima'
}).promise();



async function answerQuestion(quest) {
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
        console.log(all[index].jawaban);
        return;
    }


    // PERTANYAAN MASIH BELUM TERJAWAB
    all.sort(function(a,b){return similarityPercentage(b.pertanyaan,quest)-similarityPercentage(a.pertanyaan,quest)});
    console.log("Mungkin maksud Anda: ");
    for (let i = 0; i < 3; i++) {
        console.log(all[i].pertanyaan);
    }
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
        console.log(all[index].jawaban);
        return;
    }


    // PERTANYAAN MASIH BELUM TERJAWAB
    all.sort(function(a,b){return similarityPercentage(b.pertanyaan,quest)-similarityPercentage(a.pertanyaan,quest)});
    console.log("Mungkin maksud Anda: ");
    for (let i = 0; i < 3; i++) {
        console.log(all[i].pertanyaan);
    }
}



// TESTING
let quest = "Apa sih ibukota Indonesia?";
answerQuestion(quest);
// answerQuestionKMP(quest);