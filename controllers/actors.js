const Actors = require('../models/actors');

(async () => {
  await Actors.init();
  console.log('Initializing actors...');
})();

const getAllActors = async (req, res) => {
  const actorsList = await Actors.getAll();
  res.render('actors', { actors: actorsList, isAuthed: req.session.username });
};

const getActorById = async (req, res) => {
  const actor = await Actors.getById(req.params.id);
  res.render('actors', { actors: [actor] });
};

const removeActorById = async (req, res) => {
  if (req.session.username) {
    await Actors.remove(req.params.id);
  }
  res.redirect('/actors');
};

const addActor = async (req, res) => {
  if (!req.session.username) {
    res.redirect('/actors');
    return;
  }

  const [firstName, lastName] = req.body.fullName.split(' ');
  if (!lastName) {
    res.redirect('/actors');
    return;
  }
  await Actors.add(firstName, lastName);
  res.redirect('/actors');
};

module.exports = {
  getAllActors,
  getActorById,
  removeActorById,
  addActor,
};
