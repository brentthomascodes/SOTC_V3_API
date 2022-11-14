import * as functions from "firebase-functions";
import * as express from "express";
import entryRoutes from "./handlers/EntryHandler";
import WatchRoutes from "./handlers/WatchesHandler";
import WatchListRoutes from "./handlers/WatchListHandler";

const routes = [
  ...entryRoutes,
  ...WatchRoutes,
  ...WatchListRoutes,
];

const applyRoutes = (routes: any[], router: any): void => {
  for (const route of routes) {
    const {method, path, handler} = route;
    (router as any)[method](path, handler);
  }
};

const app = express();
applyRoutes(routes, app);

exports.app = functions.https.onRequest(app);
