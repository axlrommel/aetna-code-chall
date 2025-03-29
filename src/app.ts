import express from 'express';
import { moviesDb, ratingsDb } from './config/connection';
import { allMovies } from './controllers/allMovies';
import { movieDetails } from './controllers/movieDetails';
import { byYear } from './controllers/moviesByYear';
import { byGenre } from './controllers/moviesByGenre';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/movies/:imdbId', movieDetails)
app.get('/movies', allMovies)
app.get('/movies/year/:year', byYear);
app.get('/movies/genre/:genre', byGenre);

Promise.all([moviesDb.sync(), ratingsDb.sync()])
  .then(() => {
    console.log(`Connected to both databases successfully.`);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to databases:`, error);
  });
