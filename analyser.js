const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

const FILE_PATH = argv.f || argv.file || argv._[0] || 'game-log.txt';

fs.readFile(FILE_PATH, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split(/\r?\n/);
  lines.pop();

  const stats = {
    wins: 0,
    loses: 0,
    _isWinning: false,
    _curWinsInRow: 0,
    maxWinsInRow: 0,
    _curLosesInRow: 0,
    maxLosesInRow: 0,
  };

  lines.forEach(line => {
    if (line === 'win') {
      if (!stats._isWinning) {
        if (stats._curLosesInRow > stats.maxLosesInRow) {
          stats.maxLosesInRow = stats._curLosesInRow;
        }
        stats._curLosesInRow = 0;
      }

      stats.wins++;
      stats._curWinsInRow++;
      stats._isWinning = true;
    }

    if (line === 'lose') {
      if (stats._isWinning) {
        if (stats._curWinsInRow > stats.maxWinsInRow) {
          stats.maxWinsInRow = stats._curWinsInRow;
        }
        stats._curWinsInRow = 0;
      }

      stats.loses++;
      stats._curLosesInRow++;
      stats._isWinning = false;
    }

    if (stats._curLosesInRow > stats.maxLosesInRow) {
      stats.maxLosesInRow = stats._curLosesInRow;
    }
    if (stats._curWinsInRow > stats.maxWinsInRow) {
      stats.maxWinsInRow = stats._curWinsInRow;
    }
  });

  console.log(`
Побед: ${stats.wins}
Поражений: ${stats.loses}
Всего: ${stats.wins + stats.loses}
Победы/Поражения: ${stats.wins / stats.loses}
Максимум побед подряд: ${stats.maxWinsInRow}
Максимум поражений подряд: ${stats.maxLosesInRow}
  `);
});
