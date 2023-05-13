import { Model, DataTypes, Sequelize } from "sequelize";
type dt = typeof DataTypes;

interface PollsAttributes {
  id: string;
  title: string;
  description: string;
  options: {
    id: string;
    value: string;
  }[];
}

const polls = (sequelize: Sequelize, DataTypes: dt) => {
  class Polls extends Model<PollsAttributes> implements PollsAttributes {
    static associate = (model: any) => {
      Polls.belongsTo(model.Projects);
    };

    id!: string;
    title!: string;
    description!: string;
    options!: { id: string; value: string }[];
  }

  Polls.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      options: {
        allowNull: false,
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: "polls",
    }
  );

  return Polls;
};

module.exports = polls;
