const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { scrapeNews } = require('./newsScraper');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: __dirname + '/views',
    extname: 'hbs',
  })
);

const cookieChecker = (req, res, next) => {
  const inputs = req.body;

  for (let input in inputs) {
    if (req.cookies[input] !== req.body[input]) {
      res.cookie(input, req.body[input], {
        maxAge: 2592000000,
        sameSite: true,
      });
    }
  }

  next();
};

app.get('/', (req, res) => {
  res.render('main', req.cookies);
});

app.post('/', cookieChecker, async (req, res) => {
  const { url, newsClass, newsCount } = req.body;

  let titles = await scrapeNews(url, newsClass);
  titles = titles.slice(0, newsCount);

  res.render('main', { ...req.body, data: titles });
});

app.listen(3000, () => {
  console.log('Server listening at port 3000');
});
