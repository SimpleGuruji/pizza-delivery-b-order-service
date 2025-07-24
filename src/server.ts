import app from "./app";
import config from "config";
import logger from "./config/logger";
import connectDB from "./config/db";
import { MessageBroker } from "./types/broker";
import { createBroker } from "./common/middleware/factories/brokerFactory";

const startServer = async () => {
  const PORT = config.get("server.port") || 5503;

  let broker: MessageBroker | null = null;

  try {
    await connectDB();

    broker = createBroker();
    await broker.connectConsumer();

    await broker.consumeMessage(["product", "topping"], false);

    app
      .listen(PORT, () => console.log(`Listening on port ${PORT}`))
      .on("error", (err) => {
        console.log("err", err.message);
        process.exit(1);
      });
  } catch (err) {
    logger.error("Error happened: ", err.message);
    if (broker) {
      await broker.disconnectConsumer();
    }
    process.exit(1);
  }
};

void startServer();
