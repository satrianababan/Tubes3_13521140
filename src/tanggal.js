const readline = require('readline');

// Create a readline interface for reading input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get the day of the week from a date
function getDayOfWeek(date) {
  const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return daysOfWeek[date.getDay()];
}

// Prompt the user for input
function promptInput() {
  rl.question('Masukkan tanggal (dd/mm/yyyy): ', (input) => {
    // Parse the input as a date
    const [day, month, year] = input.split('/');
    const date = new Date(`${month}/${day}/${year}`);

    // Check if the date is valid
    if (isNaN(date)) {
      console.log('Input tidak valid. Masukkan tanggal yang valid dengan format dd/mm/yyyy.');
    } else {
      const dayOfWeek = getDayOfWeek(date);
      console.log(`Tanggal ${input} adalah hari ${dayOfWeek}.`);
    }

    // Prompt for input again
    promptInput();
  });
}

// Start prompting for input
promptInput();
