import { Model, DataTypes, Sequelize } from "sequelize";
type dt = typeof DataTypes;

interface PollsAttributes {
  id: string;
  title: string;
  description: string;
  expires: string;
}

const polls = (sequelize: Sequelize, DataTypes: dt) => {
  class Polls extends Model<PollsAttributes> implements PollsAttributes {
    static associate = (model: typeof sequelize.models) => {
      Polls.belongsTo(model.Projects);
      Polls.hasMany(model.Options);
    };
    id!: string;
    title!: string;
    description!: string;
    expires!: string;
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
      expires: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("(now() + INTERVAL '1 day')"),
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: "polls",
      scopes: {
        full: {
          include: [
            {
              model: sequelize.models.Options,
            },
          ],
        },
      },
    }
  );
  return Polls;
};

module.exports = polls;
