import { Model, Sequelize, DataTypes as dt } from "sequelize";

interface ChainsAttributes {
  chainId: string;
  name: string;
  rpc: string;
}

const chains = (sequelize: Sequelize, DataTypes: typeof dt) => {
  class Chains extends Model<ChainsAttributes> implements ChainsAttributes {
    chainId!: string;
    name!: string;
    rpc!: string;
  }

  Chains.init(
    {
      chainId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "chainId",
        // primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rpc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, tableName: "chains" }
  );
  return Chains;
};

module.exports = chains;
