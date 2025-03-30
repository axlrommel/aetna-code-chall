import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { moviesByGenre, LIMIT, attributes } from '../controllers/moviesByGenre';
import { Movie } from '../models/Movie';

jest.mock('../models/Movie', () => {
  const mockFindAll = jest.fn();
  const MockMovie = {
    findAll: mockFindAll,
  };

  return {
    Movie: MockMovie,
    MovieFactory: jest.fn(() => MockMovie),
  };
});

describe('allMovies Controller', () => {
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
      query: { page: '1' },
      params: { genre: 'Drama' },
    };

    res = {
      json: jsonMock,
      status: statusMock,
      send: sendMock,
    } as any;
  });

  it('should return formatted movies', async () => {
    (Movie.findAll as jest.Mock).mockResolvedValue([
      { imdbId: 1, title: 'The Matrix', budget: 63000000 },
      { imdbId: 2, title: 'Inception', budget: 160000000 },
    ] as any);

    await moviesByGenre(req as Request, res as Response);

    expect(Movie.findAll).toHaveBeenCalledWith({
      raw: true,
      offset: 0,
      attributes,
      limit: LIMIT,
      where: {
        genres: {
          [Op.like]: '%Drama%',
        },
      },
    });
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith([
      { imdbId: 1, title: 'The Matrix', budget: '$63,000,000.00' },
      { imdbId: 2, title: 'Inception', budget: '$160,000,000.00' },
    ]);
  });

  it('should handle server errors', async () => {
    jest.spyOn(Movie, 'findAll').mockRejectedValue('Database error');

    await moviesByGenre(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('server error');
  });
});
