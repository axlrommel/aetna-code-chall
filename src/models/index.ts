import {sequelize} from '../config/connection';
import { MovieFactory } from './Movie';

const Movie = MovieFactory(sequelize);

export { sequelize, Movie };
