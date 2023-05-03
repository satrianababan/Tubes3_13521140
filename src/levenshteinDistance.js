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

export function similarityPercentage(str1, str2) {
    let maximum = getMaxLength(str1, str2);
    let same = (maximum - levenshteinDistance(str1, str2)) / maximum
    return (same);
}



// // TESTING
// const str1 = "kiTten";
// const str2 = "sitting";
// const distance = levenshteinDistance(str1, str2);
// console.log(`The Levenshtein Distance between "${str1}" and "${str2}" is ${distance}`);
// console.log(similarityPercentage(str1, str2)); 