import { Request, Response } from 'express';
import { Movie } from '../models';
import { formatToCurrency } from '../utils/tools';
import { Op } from 'sequelize';

export const LIMIT = 50;
export const attributes = ['imdbId', 'title', 'genres', 'releaseDate', 'budget'];

export const moviesByGenre = async (req: Request, res: Response) => {
  try {
    const pageNumber = (req.query?.page as string) || '1';
    const genre = req.params?.genre;
    const offset = (parseInt(pageNumber) - 1) * LIMIT;
    const dbMovies = await Movie.findAll({
      where: {
        genres: {
          [Op.like]: `%${genre}%`,
        },
      },
      raw: true,
      offset,
      attributes,
      limit: LIMIT,
    });
    const movies = dbMovies.map((m) => ({ ...m, budget: formatToCurrency(m.budget) }));
    res.status(200).json(movies);
  } catch (e) {
    console.error(e);
    res.status(500).send('server error');
  }
};
