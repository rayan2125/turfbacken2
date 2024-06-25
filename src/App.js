// app.js

import express from 'express';

import router from './routes/index.js'; 
import connection from './config/config.db.js';

const app = express();
const Port = 8000;


app.use(express.json());


app.use(router);


app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});


connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('Database connected');
});
