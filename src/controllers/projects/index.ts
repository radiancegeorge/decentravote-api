import expressAsyncHandler from "express-async-handler";
import db from "../../../models";
import checkError from "../../middlewares/checkError";
import { CommunitiesAttributes } from "../../../models/communities";
import { Request } from "express";

export const getProject = expressAsyncHandler(async (req, res) => {
  const { id } = await checkError(req);
  const project = await db.Projects.scope(["full"]).findOne({
    where: {
      id,
    },
    include: [{ model: db.Users }],
  });
  if (!project) throw { status: 404, message: "Project not found" };
  res.send(project);
});

export type CommunitiesUpdateAttributes = {
  [key in CommunitiesAttributes["type"]]?: string;
};

export const updateProjectCommunities = expressAsyncHandler(
  async (req: Request, res) => {
    const { id } = (req as any).user;
    type CommunitiesUpdateAttributes = {
      [key in CommunitiesAttributes["type"]]?: string;
    };
    const {
      communities,
      projectId,
    }: { communities: CommunitiesUpdateAttributes[]; projectId: string } =
      (await checkError(req)) as any;

    //find project to make sure it belongs to user
    const project = await db.Projects.findOne({
      where: {
        UserId: id,
        id: projectId,
      },
    });
    if (!project) throw { message: "Project not found", status: 400 };

    const updates = await Promise.all(
      communities.map(async (community) => {
        const [key, value] = Object.entries(community)[0];
        // check if type exists
        const found = await db.Communities.findOne({
          where: {
            ProjectId: projectId,
            type: key,
          },
        });

        return !found
          ? await db.Communities.create({
              type: key,
              url: value,
              ProjectId: projectId,
            })
          : await found.update({ type: key, url: value });
      })
    );

    res.send(updates);
  }
);

export const deleteProjectCommunity = expressAsyncHandler(async (req, res) => {
  const { projectId, type } = await checkError(req);
  const { id } = (req as any).user as any;

  const community = await db.Communities.findOne({
    where: {
      projectId,
      type,
    },
    include: {
      model: db.Projects,
      required: true,
      include: {
        model: db.Users,
        required: true,
        where: {
          id,
        },
      },
    },
  });
  if (!community) throw { message: "Community detail not found", status: 400 };
  await community.destroy();
  res.status(204).send();
});
