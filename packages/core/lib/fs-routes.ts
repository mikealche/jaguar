// Taken from: https://github.com/kogosoftwarellc/open-api/blob/master/packages/fs-routes/index.ts

const glob = require("glob");
const path = require("path");
const memo = {};

function compare(a: string, b: string) {
  let result;
  let ar;
  let br;
  ar = {
    dirname: path.dirname(a).replace(/^\./g, ""),
    basename: path.basename(a).replace(/\:/g, "~"),
  };
  br = {
    dirname: path.dirname(b).replace(/^\./g, ""),
    basename: path.basename(b).replace(/\:/g, "~"),
  };

  if (ar.dirname === br.dirname) {
    result = -1;
    if (ar.basename > br.basename) {
      result = 1;
    }
  } else {
    result = 1;
    if (ar.dirname < br.dirname) {
      result = -1;
    }
  }

  return result;
}

export interface FsRoutesOptions {
  glob?: string;
  indexFileRegExp?: RegExp;
}

export interface FsRoute {
  path: string;
  route: string;
}

export default function fsRoutes(
  dir: string,
  options: FsRoutesOptions = {}
): FsRoute[] {
  dir = path.resolve(process.cwd(), dir);
  options.glob = options.glob || "**/*.ts";
  options.indexFileRegExp = options.indexFileRegExp || /(?:index)?\.ts$/;
  const cacheKey = dir + options.glob;

  //@ts-ignore
  if (!memo[cacheKey]) {
    //@ts-ignore
    memo[cacheKey] = glob
      .sync(options.glob, { cwd: dir })
      .sort(compare)
      //@ts-ignore
      .map((file) => ({
        path: path.resolve(dir, file),
        route: "/" + file.replace(options.indexFileRegExp, ""),
      }));
  }

  //@ts-ignore
  return memo[cacheKey];
}
