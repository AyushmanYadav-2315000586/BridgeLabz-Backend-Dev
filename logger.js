const fs = require("fs");

function logActivity(message) {
  const timestamp = new Date().toLocaleString();
  const logMessage = `${timestamp} - ${message}\n`;
  fs.appendFileSync("activity.log", logMessage);
}

module.exports = logActivity;
