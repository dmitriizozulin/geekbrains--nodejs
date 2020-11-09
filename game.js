const argv = require('minimist')(process.argv.slice(2));
const { Console } = require('console');
const fs = require('fs');
const random = require('random');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const LOG_FILE = argv.o || argv.output || 'game-log.txt';

const logger = new Console(fs.createWriteStream(LOG_FILE), fs.createWriteStream('game-errors.txt'));

function game() {
  let num = random.int(1, 2);

  rl.question('Орел или решка (1 или 2)?\n', answer => {
    switch (answer) {
      case String(num):
        console.log('Верно!');
        logger.log('win');
        game();
        break;

      case 'q':
      case 'quit':
        rl.close();
        break;

      default:
        console.log('Неверно!');
        logger.log('lose');
        game();
    }
  });
}

game();
