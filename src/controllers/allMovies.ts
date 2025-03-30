import { Request, Response } from 'express';
import { Movie } from '../models';
import { formatToCurrency } from '../utils/tools';

export const LIMIT = 50;
export const attributes = ['imdbId', 'title', 'genres', 'releaseDate', 'budget'];

export const allMovies = async (req: Request, res: Response) => {
  try {
    const pageNumber = (req.query?.page as string) || '1';
    const offset = (parseInt(pageNumber) - 1) * LIMIT;
    const dbMovies = await Movie.findAll({ raw: true, offset, attributes, limit: LIMIT });
    const movies = dbMovies.map((m) => ({ ...m, budget: formatToCurrency(m.budget) }));
    res.status(200).json(movies);
  } catch (e) {
    console.error(e);
    res.status(500).send('server error');
  }
};
