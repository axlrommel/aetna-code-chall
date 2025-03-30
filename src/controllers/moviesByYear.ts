import { Request, Response } from 'express';
import { Movie } from '../models';
import { formatToCurrency } from '../utils/tools';
import { Op } from 'sequelize';

export const LIMIT = 50;
export const attributes = ['imdbId', 'title', 'genres', 'releaseDate', 'budget'];

export const moviesByYear = async (req: Request, res: Response) => {
  try {
    const pageNumber = (req.query?.page as string) || '1';
    const year = req.params?.year || '0';
    const intYear = parseInt(year);
    if (!Number.isInteger(intYear)) {
      res.status(400).send('invalid year');
      return;
    }
    const offset = (parseInt(pageNumber) - 1) * LIMIT;
    const dbMovies = await Movie.findAll({
      where: {
        releaseDate: {
          [Op.startsWith]: year,
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
    console.log(e);
    res.status(500).send('server error');
  }
};
