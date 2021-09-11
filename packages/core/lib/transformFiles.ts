// import FastGlob from "fast-glob";
// import mkdirp from "mkdirp";
// import { join, basename } from "path";
// import { transform, transformAsync } from "@babel/core";
// import { readFileSync, writeFileSync } from "fs";

// const transformFiles = async () => {
//   const dir = join(process.cwd(), ".bulldog");
//   mkdirp.sync(dir);

//   const sourceDirectory = join(process.cwd(), "frontend", "**");
//   const outDirectory = join(process.cwd(), ".bulldog");
//   const files = await FastGlob(sourceDirectory);

//   for (const file of files) {
//     console.log(readFileSync(file, { encoding: "utf-8" }));
//     const result = await transformAsync(
//       readFileSync(file, { encoding: "utf-8" }),
//       { plugins: ["@bulldog/babel-plugin-bulldog"] }
//     );

//     const outPath = join(outDirectory, basename(file));
//     writeFileSync(outPath, result?.code!);
//   }
//   console.log(files);
// };

// export default transformFiles;
