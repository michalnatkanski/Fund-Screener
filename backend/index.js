const express = require('express');
const responses = require('./responses');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const isGrumpy = !!process.env.GRUMPY;
  const randominessFactor = Math.floor(Math.random() * 10) + 1;

  if (!isGrumpy) {
    console.log('API: Successful response returned');
    return res.json(responses.default);
  }

  if (randominessFactor < 5) {
    console.log('GRUMPY: Regular response returned');
    return res.json(responses.default);
  }

  if (randominessFactor < 8) {
    console.log('GRUMPY: Malformed response returned');
    return res.json(responses.malformed);
  }

  if (randominessFactor < 9) {
    console.log('GRUMPY: 500 error returned');
    return res.status(500);
  }

  console.log('GRUMPY: null response returned');
  return res.json(null);
});

app.listen(port, () => {
  console.log(`API app listening at http://0.0.0.0:${port}`);
});
