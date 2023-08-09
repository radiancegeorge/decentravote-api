import { body, param } from "express-validator";
import web3 from "web3";
import db from "../../../models";
import { Model, Op } from "sequelize";
import { CommunitiesUpdateAttributes } from "../../controllers/projects";

export const ReqSignInValidation = [
  param("walletAddress")
    .trim()
    .custom(async (val: string) => {
      if (!web3.utils.isAddress(val)) {
        throw new Error("string not an address!");
      }
      if (!web3.utils.checkAddressChecksum) {
        throw new Error("invalid address checksum");
      }
      const user = await db.Users.findOne({
        where: {
          walletAddress: val,
        },
      });
      const request = await db.RequestAuth.findAll({
        where: {
          [Op.or]: [
            {
              walletAddress: val,
            },
            user && {
              UserId: user.id,
            },
          ].filter((item) => item),
        },
        include: [
          {
            model: db.Users,
          },
        ],
      });
      await Promise.all(
        request.map(async (entity: any) => await entity.destroy())
      );
      return true;
    }),
];
export const AuthValidation = [
  body("sessionId").trim().notEmpty({ ignore_whitespace: true }),
  body("signature").trim().notEmpty({ ignore_whitespace: true }),
];
export const UserUpdateValidation = [
  body(["username"])
    .notEmpty({ ignore_whitespace: true })
    .custom(async (username) => {
      const user = await db.Users.findOne({
        where: {
          username,
        },
      });
      if (user) throw new Error("username has already been taken");
      return true;
    }),
];
export const GetProjectValidation = [
  param("id").isString().withMessage("project id not found"),
];
export const UpdateCommunitiesValidation = [
  body("communities")
    .isArray()
    .custom((val: CommunitiesUpdateAttributes[]) => {
      for (let community of val) {
        const val = Object.values(community);
        if (val.length > 1) throw { message: "invalid community data" };
        if (!val[0]) throw { message: "community cannot have a falsy value" };
      }
      return true;
    }),
  param("projectId").isString().withMessage("please provide a project id"),
];
export const DeleteCommunityValidation = [
  param(["projectId", "type"])
    .isString()
    .withMessage("invalid projectId or type"),
];
