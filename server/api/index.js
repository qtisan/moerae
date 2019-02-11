
import express from 'express';
import bodyParser from 'body-parser';

const api = express();

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.get('/', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  res.end(JSON.stringify({ message: 'Hello, API!' }));
});

export default api;
