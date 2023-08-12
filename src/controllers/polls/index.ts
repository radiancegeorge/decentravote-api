import expressAsyncHandler from "express-async-handler";
import db from "../../../models";
import checkError from "../../middlewares/checkError";
import { Op, Sequelize } from "sequelize";

export const pollsFeed = expressAsyncHandler(async (req, res) => {
  const user = (req as any).user; // user this to determine if user has a vote

  const { limit, page } = await checkError(req);
  const offset = (page - 1) * limit;

  const { rows, count } = await db.Polls.findAndCountAll({
    include: [
      {
        model: db.Options,
        required: true,
      },
    ],
    limit,
    offset,
    order: [["createdAt", "desc"]],
  });

  await Promise.all(
    rows.map(async ({ dataValues: row }: any) => {
      // getting total votes in a poll
      row.voteCount = await db.Votes.count({
        where: {
          OptionId: {
            [Op.in]: row.Options.map((item: any) => item.id),
          },
        },
      });

      // getting users vote if any
      row.userVote =
        user &&
        (await db.Votes.findOne({
          where: {
            UserId: user.id,
            OptionId: {
              [Op.in]: row.Options.map((item: any) => item.id),
            },
          },
        }));

      // get vote count for every option
      await Promise.all(
        row.Options.map(async ({ dataValues: item }: any) => {
          item.voteCount = await db.Votes.count({
            where: {
              OptionId: item.id,
            },
          });
        })
      );
    })
  );

  res.send({
    page,
    limit,
    totalPages: Math.ceil(count / limit),
    results: rows,
  });
});
