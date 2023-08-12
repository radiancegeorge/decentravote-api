import { Sequelize, Model, DataTypes } from "sequelize";

export type OptionsAttributes = {
  id: string;
  name: string;
};

const options = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Options extends Model<OptionsAttributes> implements OptionsAttributes {
    static associate = (models: typeof sequelize.models) => {
      Options.belongsTo(models.Polls);
      Options.belongsToMany(models.Users, {
        through: models.Votes,
        foreignKey: { allowNull: false, name: "OptionId" },
      });
      Options.hasMany(models.Votes, { as: "votes" });
    };
    id!: string;
    name!: string;
  }

  Options.init(
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: dataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "options",
    }
  );
  return Options;
};

module.exports = options;
