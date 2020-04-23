import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';
import { app } from './app';

// TODO: Initialize a MongoDB Service Client
const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  process.env.REACT_APP_MONGODB_SERVICE_CLIENT
);

// TODO: Instantiate a collection handle for todo.items
const events = mongoClient
  .db(process.env.REACT_APP_MONGODB_DATABASE_NAME)
  .collection(process.env.REACT_APP_MONGODB_EVENTS_COLLECTION);

export { events };
