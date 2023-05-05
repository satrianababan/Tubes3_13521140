import readline from 'readline'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

import { realProccess } from './RegularExpression.js';
import { newChat } from './DatabaseAccess.js';
  
function promptInput() {
  rl.question('', (input) => {
    realProccess(input,1);//BM
    // realProccess(input,2);//KMP
    promptInput();
  });
}

newChat();
promptInput();
  
