const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const { IAM_TOKEN, IAM_FOLDER } = process.env;

const translate = async (...text) =>
  axios
    .post(
      'https://translate.api.cloud.yandex.net/translate/v2/translate',
      {
        folder_id: IAM_FOLDER,
        texts: [...text],
        targetLanguageCode: 'ru',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${IAM_TOKEN}`,
        },
      }
    )
    .then(async res => {
      return await res.data;
    })
    .catch(e => {
      throw new Error(e);
    });

app.get('/', (req, res) => {
  res.send('Translator: go to /translate');
});

// GET: { data: [<string>] }
// RESPONSE: { data: [<string>] } | Internal Server Error 500
app.get('/translate', async (req, res) => {
  const words = await req.body.data;

  const translatedWordsJson = await translate(words).catch(() => {
    res.status(500);
    res.send('Internal Server Error 500');
  });

  const translatedWords = JSON.parse(translatedWordsJson);
  const result = [...translatedWords.translations.values()].map(el => el.text);

  res.send({
    data: result,
  });
});

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000');
});
