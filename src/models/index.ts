import { moviesDb, ratingsDb } from '../config/connection';
import { MovieFactory } from './Movie';
import { RatingFactory } from './Rating';

const Movie = MovieFactory(moviesDb);
const Rating = RatingFactory(ratingsDb);

export { moviesDb, ratingsDb, Movie, Rating };
