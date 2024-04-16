import readline from 'readline';
import { bot } from './bot.js'

const userArgs = process.argv.slice(2);

if (userArgs.length < 3 || userArgs.length % 2 === 0) {
  console.error(`\x1b[31mPlease pass an odd number of arguments greater than or equal to 3.\x1b[0m
For example: \x1b[33mnpm run start rock paper scissors\x1b[0m\n`);
  process.exit(0);
}

bot.setMoveVariants(...userArgs);

console.log(`\x1b[36mWelcome to the Game!\x1b[0m\n`);

async function mainLoop() {
  try {
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

    let keepGoing = true;
    while (keepGoing) {
      const userInput = await new Promise((resolve) => {
          rl.question('Enter your input: ', (input) => {
          resolve(input);
          });
      });

      if (userInput === 'stop') {
          keepGoing = false;
          rl.close();
          process.exit(0);
      }
      
      console.log(`You entered: ${userInput}`);
    }
  } catch (error) {
      console.error('Error:', error);
  }
}

mainLoop();