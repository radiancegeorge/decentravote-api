import { Model, Sequelize, DataTypes } from "sequelize";

type dt = typeof DataTypes;

interface ProjectAttributes {
  id: string;
  contractAddress?: string;
  name: string;
  symbol?: string;
}

const projects = (sequelize: Sequelize, DataTypes: dt) => {
  class Projects extends Model<ProjectAttributes> implements ProjectAttributes {
    static associate = (model: any) => {
      Projects.belongsTo(model.Users);
      Projects.hasMany(model.Communities);
      Projects.hasMany(model.Polls);
    };
    id!: string;
    contractAddress!: string;
    name!: string;
    symbol?: string | undefined;
  }

  Projects.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      contractAddress: {
        unique: "contractAddress",
        allowNull: true,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      symbol: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: "projects",
      scopes: {
        full: {
          include: [
            {
              model: sequelize.models.Communities,
            },
          ],
        },
      },
    }
  );
  // console.log(Projects.associations.Users.target);
  return Projects;
};

module.exports = projects;
