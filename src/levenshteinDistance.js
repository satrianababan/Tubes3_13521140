function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
  
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
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
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
  
  // Test the function
  const str1 = "kitten";
  const str2 = "sitting";
  const distance = levenshteinDistance(str1, str2);
  console.log(`The Levenshtein Distance between "${str1}" and "${str2}" is ${distance}`);
  