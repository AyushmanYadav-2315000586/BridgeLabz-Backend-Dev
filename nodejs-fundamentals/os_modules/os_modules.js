const os = require("os");

const totalMemory = os.totalmem() / 1024 ** 3;
const freeMemory = os.freemem() / 1024 ** 3;
const platform = os.platform();
const uptime = os.uptime() / 3600;

console.log(totalMemory);
console.log(freeMemory);
console.log(platform);
console.log(uptime);
