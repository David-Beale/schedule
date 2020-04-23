import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { app } from "./app";

// TODO: Initialize a MongoDB Service Client
const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  "scheduler-service"
);

// TODO: Instantiate a collection handle for todo.items
const events = mongoClient.db("scheduler").collection("events");

export { events };
