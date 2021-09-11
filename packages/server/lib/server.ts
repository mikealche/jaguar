"use strict";

import express from "express";

export default function startServer() {
  const app = express();

  app.use(express.json());

  const init = async () => {
    // await registerRoutesFromFileSystem(app);
    const port = 3000;
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  };
}
