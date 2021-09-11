import { RequestHandler, Express } from "express";
import fsRoutes, { FsRoute } from "./fs-routes";

const wrapResolver = (resolver: Function) => {
  const requestHandler: RequestHandler = async (req, res) => {
    try {
      const response = await resolver({ ...req.params, ...req.body });
      res.json(response);
    } catch (err) {
      //@ts-ignore
      res.sendStatus(500).send(err.message);
    }
  };
  return requestHandler;
};

const routes: FsRoute[] = fsRoutes("routes");

const registerRoutesFromFileSystem = async (app: Express) => {
  for (const route of routes) {
    const resolver = require(route.path).default;
    if (resolver.middleware) {
      app.get(
        `${route.route.toLowerCase()}`,
        resolver.middleware,
        wrapResolver(resolver)
      );
    } else {
      app.get(`${route.route.toLowerCase()}`, wrapResolver(resolver));
    }
  }
};

export default registerRoutesFromFileSystem;
