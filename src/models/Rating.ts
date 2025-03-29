import { Sequelize, Model, DataTypes } from 'sequelize';

export class Rating extends Model {
  public ratingId: number;
  public userId: number;
  public movieId: number;
  public rating: number;
  public timestamp: number;
}

export function RatingFactory(sequelize: Sequelize): typeof Rating {
  Rating.init({
    ratingId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    movieId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    rating: {
      allowNull: false,
      type: DataTypes.REAL
    },
    timestamp: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, { sequelize, modelName: 'ratings', timestamps: false })

  return Rating;
}