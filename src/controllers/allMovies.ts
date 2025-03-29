import { Request, Response } from 'express';
import { Movie } from "../models";

const PAGE = 50;
const attributes = ['imdbId', 'title', 'genres', 'releaseDate', 'budget']

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.findAll({ attributes, limit: PAGE });
    // const movies = dbMovies.map(m => ({ budget: `$ ${movies?.budget}`, ...m }))
    res.status(200).json(movies);
  } catch (e) {
    console.log(e);
    res.status(500).send('server error')
  }
}