"use strict";

import express from "express";
import { registerRoutesFromFileSystem } from "@jaguar/core";
export default async function startServer() {
  const app = express();

  app.use(express.json());

  await registerRoutesFromFileSystem(app);
  const port = 3000;
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  return app;
}
