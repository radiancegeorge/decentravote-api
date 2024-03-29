import { DataTypes, Model, Sequelize } from "sequelize";

export interface UsersAttributes {
  id?: string;
  username: string;
  walletAddress: string;
  email?: string;
}
type dataType = typeof DataTypes;

const users = (sequelize: Sequelize, DataTypes: dataType) => {
  class Users extends Model<UsersAttributes> implements UsersAttributes {
    static associate = (models: any) => {
      Users.hasOne(models.Projects);
      Users.belongsToMany(models.Options, {
        through: models.Votes,
        foreignKey: {
          allowNull: false,
          name: "UserId",
        },
      });
    };

    id?: string;
    username!: string;
    walletAddress!: string;
    email?: string;
  }

  Users.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: "username",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: "email",
      },
      walletAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "walletAddress",
      },
    },
    {
      sequelize,
      tableName: "users",
      paranoid: true,
    }
  );
  return Users;
};

module.exports = users;
