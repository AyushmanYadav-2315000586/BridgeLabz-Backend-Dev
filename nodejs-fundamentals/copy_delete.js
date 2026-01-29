const fs = require("fs");
const path = require("path");

fs.copyFile("newFile.txt", "copied.txt", (err) => {
  if (err) {
    console.log("Error copying");
    return;
  }
  console.log("Copied");

  fs.readFile("copied.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("Error while reading");
      return;
    }
    console.log(data);

    fs.unlink("testing.txt", (err) => {
      if (err) {
        console.log("Error while deleting");
        return;
      }
      console.log("Deleted");
    });
  });
});

fs.writeFile("newFile.txt", "This is a new file", (err) => {
  if (err) {
    console.log("Error writing file");
    return;
  }
  console.log("Done creating newFile.txt");
});

fs.mkdir("New_Directory", { recursive: true }, (err) => {
  if (err) {
    console.log("");
    return;
  }
  console.log("Directory Created");
});

fs.readdir("os_modules", (err, files) => {
  if (err) {
    console.log("Error reading directory");
    return;
  }
  files.forEach((file) => {
    const pathJoin=path.join("os_modules",file);
    fs.readFile(pathJoin, "utf-8", (err, data) => {
      if (err) {   
        console.log("Error Reading file");
        return;
      }
      console.log(data);
    });
  });
});
