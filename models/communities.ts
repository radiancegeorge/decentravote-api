import { DataType, DataTypes, Model, Sequelize } from "sequelize";

type dt = typeof DataTypes;
export interface CommunitiesAttributes {
  type:
    | "twitter"
    | "discord"
    | "slack"
    | "telegram"
    | "reddit"
    | "youtube"
    | "linkedin";
  url: string;
  id: string;
}
const communities = (sequelize: Sequelize, dataTypes: dt) => {
  class Communities
    extends Model<CommunitiesAttributes>
    implements CommunitiesAttributes
  {
    static associate = (models: any) => {
      Communities.belongsTo(models.Projects);
    };
    url!: string;
    id!: string;
    type!:
      | "twitter"
      | "discord"
      | "slack"
      | "telegram"
      | "reddit"
      | "youtube"
      | "linkedin";
  }

  Communities.init(
    {
      id: {
        type: dataTypes.STRING,
        defaultValue: dataTypes.UUIDV4,
        unique: "id",
        primaryKey: true,
      },
      type: {
        type: dataTypes.ENUM(
          "twitter",
          "discord",
          "slack",
          "telegram",
          "reddit",
          "youtube",
          "linkedin"
        ),
        allowNull: false,
      },
      url: {
        type: dataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
    },
    { tableName: "communities", sequelize }
  );

  return Communities;
};

module.exports = communities;
