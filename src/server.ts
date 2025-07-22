import app from "./app";
import config from "config";
import logger from "./config/logger";
import connectDB from "./config/db";

const startServer = async () => {
  const PORT = config.get("server.port") || 5503;

  try {
    await connectDB();

    app
      .listen(PORT, () => console.log(`Listening on port ${PORT}`))
      .on("error", (err) => {
        console.log("err", err.message);
        process.exit(1);
      });
  } catch (err) {
    logger.error("Error happened: ", err.message);
    process.exit(1);
  }
};

void startServer();
