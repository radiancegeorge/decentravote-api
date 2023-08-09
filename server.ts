import app from "./src/app";
import http from "http";
import db from "./models";
import chainListener from "./src/utils/projectListener";
const port = process.env.port ?? 4000;
const server = http.createServer(app);

db.sequelize.sync().then(async () => {
  await chainListener().catch(console.log);
  server.listen(port, console.log.bind(this, `listening on port :: ${port}`));
});
