import { Model, Sequelize, DataTypes } from "sequelize";
type dt = typeof DataTypes;

interface ProjectAttributes {
  id: string;
  contractAddress: string;
  name: string;
  symbol?: string;
}

const projects = (sequelize: Sequelize, DataTypes: dt) => {
  class Projects extends Model<ProjectAttributes> implements ProjectAttributes {
    static associate = (model: any) => {
      Projects.belongsTo(model.Users);
    };
    id!: string;
    contractAddress!: string;
    name!: string;
    symbol?: string | undefined;
  }

  Projects.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      contractAddress: {
        unique: "contractAddress",
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { sequelize, paranoid: true, tableName: "projects" }
  );

  return Projects;
};

module.exports = projects;
