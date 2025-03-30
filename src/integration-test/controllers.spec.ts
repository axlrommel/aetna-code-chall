import { Request, Response } from 'express';
import { allMovies } from '../controllers/allMovies';
import { movieDetails } from '../controllers/movieDetails';

describe('any controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => res as Response);
    sendMock = jest.fn();

    res = {
      json: jsonMock,
      status: statusMock,
      send: sendMock,
    } as any;
  });

  it('allMovies integration test', async () => {
    req = {
      query: { page: '1' },
    };
    await allMovies(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        {
          budget: '$4,000,000.00',
          genres: '[{"id": 80, "name": "Crime"}, {"id": 35, "name": "Comedy"}]',
          imdbId: 'tt0113101',
          releaseDate: '1995-12-09',
          title: 'Four Rooms',
        },
      ]),
    );
  });
  it('movieDetails integration test', async () => {
    req = {
      params: { imdbId: 'tt0113101' },
    };
    await movieDetails(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      budget: '$4,000,000.00',
      genres: '[{"id": 80, "name": "Crime"}, {"id": 35, "name": "Comedy"}]',
      imdbId: 'tt0113101',
      releaseDate: '1995-12-09',
      title: 'Four Rooms',
      language: null,
      movieId: undefined,
      overview:
        "It's Ted the Bellhop's first night on the job...and the hotel's very unusual guests are about to place him in some outrageous predicaments. It seems that this evening's room service is serving up one unbelievable happening after another.",
      productionCompanies:
        '[{"name": "Miramax Films", "id": 14}, {"name": "A Band Apart", "id": 59}]',
      rating: '3.27',
      runtime: 98,
    });
  });
});
