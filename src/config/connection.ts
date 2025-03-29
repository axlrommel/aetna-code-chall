import { Sequelize } from 'sequelize';

export const moviesDb = new Sequelize({
  dialect: 'sqlite',
  storage: './db/movies.db'
});

export const ratingsDb = new Sequelize({
  dialect: 'sqlite',
  storage: './db/ratings.db'
});