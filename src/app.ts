import express from 'express';
import {sequelize} from './config/connection';
import { getAllMovies } from './controllers/allMovies';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/movies', getAllMovies)

// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  console.log(`Connected to database successfully.`);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
