const express = require("express");
const morgan = require("morgan");
const dotEnvName = require("dotenv");
const dbConnect = require("./dbConnect");
dotEnvName.config({ path: "./.env" });
const mainRouter = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
// middleware
app.use(express.json());
// morgan is used to generate the logs, that helps in debugging
app.use(morgan("common"));
app.use(cookieParser());
// cors should be used above the main route
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const PORT = process.env.PORT || 9000;
app.get("/", (req, res) => {
  res.status(200).json({ message: "server ok" });
});
app.use("/api", mainRouter);
dbConnect.connecting();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
