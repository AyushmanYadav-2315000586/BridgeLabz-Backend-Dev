const fs = require("fs");

const path = require("path");

const inputFilePath = path.join(__dirname, "input.txt");
const outputFilePath = path.join(__dirname, "output.txt");

const readStream = fs.createReadStream(inputFilePath, { encoding: "utf-8" });

readStream.on("data", (chunk) => {
  console.log("Processing", chunk);
});
readStream.on("end", () => {
  console.log("Done");
});
readStream.on("error", (err) => {
  console.log("Error", err);
});

const writeStream = fs.createWriteStream(outputFilePath, { encoding: "utf-8" });

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Writing is done");
});
