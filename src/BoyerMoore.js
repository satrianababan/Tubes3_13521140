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

var text = "Aku adalah anak gembala, selalu riang serta gembira";
var pattern = "selalu";

let x = BoyerMooreMatch(text, pattern);
// console.log("text:" + text.length);
// console.log("pattern:" + pattern.length);
console.log(x);