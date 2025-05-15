const sum = require('./sum.js');
const chalk = require('chalk');

function main() {
  try {
    const array = JSON.parse(process.argv[2]);
    const result = sum(array);

    console.log(chalk.bgGreen(`Sum = ${result}`));
  } catch (error) {
    console.error(chalk.bgRed(`Error parsing input: ${error}`));
    process.exit(1);
  }
}

main();
