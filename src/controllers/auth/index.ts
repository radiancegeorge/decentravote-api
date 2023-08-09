import expressAsyncHandler from "express-async-handler";
import checkError from "../../middlewares/checkError";
import db from "../../../models";
import { RequestedAuthAttributes } from "../../../models/requestedAuth";
import Web3 from "web3";
import jwt from "jsonwebtoken";
const { generateUsername } = require("username-generator");

export const RequestAuth = expressAsyncHandler(async (req, res) => {
  const { walletAddress } = await checkError(req);

  const user = await db.Users.findOne({
    where: {
      walletAddress,
    },
  });
  let data: RequestedAuthAttributes | undefined;
  if (!user) {
    //new user
    data = await db.RequestAuth.create({
      walletAddress,
    });
  } else {
    // existing user
    data = await db.RequestAuth.create({
      UserId: user.id,
    });
  }
  res.send({
    sessionId: data?.id,
    uid: data?.uid,
  });
});

export const Authenticate = expressAsyncHandler(async (req, res) => {
  const { sessionId, signature } = await checkError(req);
  const { chain } = req.headers;

  // console.log(chainId, req.headers);
  const { rpc } = await db.Chains.findOne({
    where: {
      chainId: chain,
    },
  });
  const data = await db.RequestAuth.findOne({
    where: {
      id: sessionId,
    },
    include: [
      {
        model: db.Users,
      },
    ],
  });

  const walletAddress: string = data.walletAddress ?? data.User.walletAddress;
  const web3 = new Web3(rpc);
  const isValid =
    web3.eth.accounts.recover(data.uid, signature) === walletAddress;

  if (!isValid) throw { statusCode: 401, message: "Invalid signature" };

  let user;
  if (data.walletAddress) {
    //new user :: create new user;
    const username = "user-" + generateUsername();
    user = await db.Users.create({ walletAddress, username });
  } else {
    //existing user
    user = await db.Users.findOne({
      where: {
        id: data.UserId,
      },
    });
  }

  const { JWT } = process.env;
  const token = jwt.sign(
    { walletAddress, username: user.username, id: user.id },
    JWT as string,
    { expiresIn: "7d" }
  );
  await data.destroy();
  res.send({ token });
});
