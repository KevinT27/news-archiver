import scraper from './scraper.js';
import express from 'express';

const app = express();

app.post('/', async (req, res) => {
  await scraper();
  res.end();
})

app.listen(process.env.PORT, () => console.log('Server is running'));