const player = require('node-wav-player');
const colors = require('colors');

player
  .play({
    path: './sound.wav',
  })
  .then(() => {
    console.log('The wav file is playing successfully.'.cyan.bold.bgBlack);
  })
  .catch(error => {
    console.error('Play error:\n'.red.bold.bgBlack, error);
  });
