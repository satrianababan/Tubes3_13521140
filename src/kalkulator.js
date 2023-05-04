import readline from 'readline'

// Create a readline interface for reading input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to evaluate a mathematical expression
export function evaluateExpression(expression) {
  // Replace ^ with ** for exponentiation
  expression = expression.replace(/\^/g, '**');
  // Use eval() to evaluate the expression
  try {
    const result = eval(expression);
    if (isNaN(result)) {
      return 'Sintaks persamaan tidak sesuai.';
    } else {
      return result;
    }
  } catch (err) {
    return 'Sintaks persamaan tidak sesuai.';
  }
}

// Prompt the user for input
function promptInput() {
  rl.question('Masukkan operasi matematika : ', (input) => {
    // Evaluate the expression
    const result = evaluateExpression(input);
    console.log(`Hasilnya adalah : ${result}`);

    // Prompt for input again
    promptInput();
  });
}



// TESTING
// promptInput();