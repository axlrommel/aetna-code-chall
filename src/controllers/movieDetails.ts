import { Request, Response } from 'express';
import { Movie, Rating } from "../models";
import { formatToCurrency } from '../utils/tools';
import { Sequelize } from 'sequelize';

const attributes = ['imdbId', 'movieId', 'title', 'overview', 'releaseDate', 'budget', 'runtime', 'genres', 'language', 'productionCompanies']

export const movieDetails = async (req: Request, res: Response) => {
  try {
    const imdbId = req.params.imdbId;
    const dbMovie = await Movie.findOne({
      where: {
        imdbId
      }, raw: true, attributes
    });
    const averageRating = await Rating.findOne({
      where: { movieId: dbMovie.movieId },
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('rating')), 'rating'],
      ],
    })
    const details = { ...dbMovie, rating: averageRating.rating.toFixed(2), budget: formatToCurrency(dbMovie.budget), movieId: undefined }
    res.status(200).json(details);
  } catch (e) {
    console.log(e);
    res.status(500).send('server error')
  }
}