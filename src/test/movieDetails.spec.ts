import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { movieDetails, attributes } from '../controllers/movieDetails';
import { Movie } from '../models/Movie';
import { Rating } from '../models/Rating';

jest.mock('../models/Movie', () => {
  const mockFindOne = jest.fn();
  const MockMovie = {
    findOne: mockFindOne,
  };

  return {
    Movie: MockMovie,
    MovieFactory: jest.fn(() => MockMovie),
  };
});

jest.mock('../models/Rating', () => {
  const mockFindOne = jest.fn();
  const MockRating = {
    findOne: mockFindOne,
  };

  return {
    Rating: MockRating,
    RatingFactory: jest.fn(() => MockRating),
  };
});

describe('movieDetails Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => res as Response);
    sendMock = jest.fn();

    req = {
      params: { imdbId: 'imdbId' },
    };

    res = {
      json: jsonMock,
      status: statusMock,
      send: sendMock,
    } as any;
  });

  it('should return movie details', async () => {
    const genre1 = JSON.stringify([
      { id: 9648, name: 'Mystery' },
      { id: 18, name: 'Drama' },
    ]);

    (Movie.findOne as jest.Mock).mockResolvedValue({
      imdbId: 'imdbId',
      movieId: 1,
      title: 'The Matrix',
      budget: 63000000,
      genres: genre1,
    });

    (Rating.findOne as jest.Mock).mockResolvedValue({ rating: 4.01111 });

    await movieDetails(req as Request, res as Response);

    expect(Movie.findOne).toHaveBeenCalledWith({
      raw: true,
      attributes,
      where: {
        imdbId: 'imdbId',
      },
    });
    expect(Rating.findOne).toHaveBeenCalledWith({
      where: {
        movieId: 1,
      },
      attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'rating']],
    });
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      imdbId: 'imdbId',
      title: 'The Matrix',
      budget: '$63,000,000.00',
      genres: genre1,
      rating: '4.01',
      movieId: undefined,
    });
  });

  it('should handle server errors', async () => {
    jest.spyOn(Movie, 'findOne').mockRejectedValue('Database error');

    await movieDetails(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('server error');
  });

  it('returns 404 if imbdId passed is not found', async () => {
    (Movie.findOne as jest.Mock).mockResolvedValue(undefined);

    await movieDetails(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(sendMock).toHaveBeenCalledWith('not found');
  });
});
