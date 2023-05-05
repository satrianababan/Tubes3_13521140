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



export async function answerQuestionBM(quest) {
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



export async function answerQuestionKMP(quest) {
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



export async function addQuestion(query, pertanyaan, jawaban) {
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
        let answer = "Pertanyaan " + pertanyaan + " telah ditambahkan..."
        addChat("me", query, "bot", answer);
        console.log(answer);
    } else {
        await pool.query("UPDATE question SET jawaban = '" + jawaban 
            + "' WHERE pertanyaan LIKE '" + pertanyaan + "'");
        let answer = "Pertanyaan " + pertanyaan + " sudah ada! Jawaban di-update ke " + jawaban;
        addChat("me", query, "bot", answer);
        console.log(answer);
    }
}



export async function deleteQuestion(query, pertanyaan) {
    let found = false;
    const [all] = await pool.query("SELECT * FROM question");
    for (let i = 0; i < all.length; i++) {
        if (BoyerMooreMatch(all[i].pertanyaan, pertanyaan) == 0 && similarityPercentage(all[i].pertanyaan, pertanyaan) == 1) {
            found = true;
        }
    }

    if (found == true) {
        await pool.query("DELETE FROM question WHERE pertanyaan LIKE '"+ pertanyaan +"'");
        let answer = "Pertanyaan "+query.substring(17)+" telah dihapus!";
        addChat("me", query, "bot", answer);
        console.log(answer);
    } else {
        let answer = "Pertanyaan tidak ditemukan!";
        addChat("me", query, "bot", answer);
        console.log(answer);
    }
}



export async function checkPresence(pertanyaan) {
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



export async function newChat() {
    await pool.query("INSERT INTO history (id, type, chat) SELECT COUNT(DISTINCT id), \"bot\", \"Hai, ada yang bisa saya bantu? :)\" FROM history");
    
    const [init] = await pool.query("SELECT chat FROM history WHERE id = (SELECT COUNT(DISTINCT id) FROM history)-1");
    console.log(init[0].chat);
}



// export async function addChat(type, chat) {
//     await pool.query("INSERT INTO history (id, type, chat) SELECT COUNT(DISTINCT id)-1, \"" + type + "\", \"" + chat + "\" FROM history");
// }
export async function addChat(type1, chat1, type2, chat2) {
    await pool.query("INSERT INTO history (id, type, chat) SELECT COUNT(DISTINCT id)-1, \"" + type1 + "\", \"" + chat1 + "\" FROM history");
    await pool.query("INSERT INTO history (id, type, chat) SELECT COUNT(DISTINCT id)-1, \"" + type2 + "\", \"" + chat2 + "\" FROM history");
}


// // TESTING
// let quest = "Apa ibukota Indonesia?";
// const [all] = await pool.query("SELECT * FROM question WHERE pertanyaan LIKE 'anjing makannya apa? '");
// console.log(all);
// answerQuestionBM(quest);
// answerQuestionKMP(quest);