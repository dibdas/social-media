const express = require("express");
const app = express();
const dotEnvName = require("dotenv");
const dbConnect = require("./dbConnect");
dotEnvName.config({ path: "./.env" });

const PORT = process.env.PORT || 9000;
app.get("/", (req, res) => {
  res.status(200).json({ message: "server ok" });
});
dbConnect.connecting();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
