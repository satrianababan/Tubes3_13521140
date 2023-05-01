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



// // TESTING
// // Query untuk meminta hari dari tanggal
// const regexPattern1 = /(.*)?hari (apa )*(pada |di |untuk )*(tanggal )*(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2}|\d{4})(.*)?/gi;
// const regexPattern2 = /(pada )*(tanggal )*(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2}|\d{4})(.*)?hari (apa)*(.*)?/gi;
// const regexPattern3 = / /;
// const regexPatternList = [[regexPattern1, regexPattern2]];
// console.log(matchRegEx(regexPatternList, "Tanggal 03-12-2022 itu hari apa sih ya? Tolong beritahu saya."));
// console.log(matchRegEx(regexPatternList, "Hai, tau gak hari apa pada tanggal 06.02.2003?"));