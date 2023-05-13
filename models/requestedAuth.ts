import { Model, Sequelize, DataTypes as dt } from "sequelize";

export interface RequestedAuthAttributes {
  id: string;
  walletAddress?: string;
  uid: string;
}

const requestedAuth = (sequelize: Sequelize, DataTypes: typeof dt) => {
  class RequestAuth
    extends Model<RequestedAuthAttributes>
    implements RequestedAuthAttributes
  {
    static associate = (model: any) => {
      RequestAuth.belongsTo(model.Users);
    };
    id!: string;
    walletAddress?: string | undefined;
    uid!: string;
  }

  RequestAuth.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      walletAddress: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      uid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
      },
    },
    { sequelize, tableName: "requestAuth" }
  );

  return RequestAuth;
};

module.exports = requestedAuth;
