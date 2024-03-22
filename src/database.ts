import { connect, connection } from "mongoose";
import { MONGODB_URI, DB_NAME } from "./config";

export async function connectToMongodb() {
  try {
    await connect(MONGODB_URI, {dbName: DB_NAME});
  } catch (error) {
    console.log("Error:", error.message);
  }
}

connection.on("connected", () => {
  console.log("Mongodb connected to:", connection.db.databaseName);
});

connection.on("error", (error) => {
  console.error("error", error.message);
});

connection.on("disconnected", () => {
  console.log("Mongodb disconnected");
});
