const Actor = require('./models/actor');

(async () => {
  const data = await Actor.getAll();
  // const data = await Actor.edit(1, 'Dmitrii', 'Zozulin');
  // const data = await Actor.getById(202);
  // const data = await Actor.add('Adam', 'Levine');
  // const data = await Actor.remove(202);
  console.log(data);
})();
