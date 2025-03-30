import { Request, Response } from 'express';
import { allMovies } from '../controllers/allMovies';

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
    };

    res = {
      json: jsonMock,
      status: statusMock,
      send: sendMock,
    } as any;
  });

  it('should return formatted movies', async () => {
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
});
