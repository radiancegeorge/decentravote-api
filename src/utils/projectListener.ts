import Web3 from "web3";
import db from "../../models";
import vote from "../abi/vote.json";
const chainListener = async () => {
  const { rpc } = await db.Chains.findOne({
    where: {
      chainId: "0x61",
    },
  });

  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      "wss://bsc.getblock.io/e2e65122-46e8-4e28-81c9-69ef580eec67/testnet/"
    )
  );
  const contract = new web3.eth.Contract(vote as any, process.env.VOTE_ADDRESS);
};

export default chainListener;
