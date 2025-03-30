import { Sequelize, Model, DataTypes } from 'sequelize';

export class Movie extends Model {
  public movieId: number;
  public imdbId: string;
  public title: string;
  public overview: string;
  public productionCompanies: string;
  public releaseDate: string;
  public budget: number;
  public revenue: number;
  public runtime: number;
  public language: string;
  public genres: string;
  public status: string;
}

export function MovieFactory(sequelize: Sequelize): typeof Movie {
  Movie.init(
    {
      movieId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      imdbId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      overview: DataTypes.STRING,
      productionCompanies: DataTypes.STRING,
      releaseDate: DataTypes.STRING,
      budget: DataTypes.INTEGER,
      revenue: DataTypes.INTEGER,
      runtime: DataTypes.REAL,
      language: DataTypes.STRING,
      genres: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    { sequelize, modelName: 'movies', timestamps: false },
  );

  return Movie;
}
