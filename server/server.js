/* eslint-disable no-undef */
const express = require('express');
const fs = require('fs');
const app = express();
const axios = require('axios');
require('dotenv').config();
const port = process.env.PORT;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
}
);
app.post('/generateImgs', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      prompt: req.body.prompt,
      n: req.body.n,
    }, {
      headers: {
        Authorization: `Bearer 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`,
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data); // Log the raw response data
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.post('/generateText', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/audio/speech', {
      model: 'tts-1',
      input: req.body.text,
      voice: "echo",
      response_format: "mp3",
    }, {
      headers: {
        Authorization: `Bearer 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`,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer' // to handle binary data
    });

    // Send the audio data as a response to the client
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.listen(port, () => {
  console.log(`Connected Successfully on port ${port}!`)
  console.log(`${process.env.OPENAI_API_KEY}`)
}
)
