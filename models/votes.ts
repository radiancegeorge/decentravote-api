import { Sequelize, Model, DataTypes } from "sequelize";

export type VotesAttribute = {};

const votes = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Votes extends Model {
    static associate = (model: Sequelize["models"]) => {
      Votes.belongsTo(model.Users);
      Votes.belongsTo(model.Options);
    };
  }
  Votes.init(
    {},
    {
      sequelize,
      tableName: "votes",
    }
  );
  return Votes;
};

module.exports = votes;
