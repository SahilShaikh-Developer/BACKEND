const app = require("./src/app");
const connectToDB = require("./src/config/database");

require("dotenv").config();

connectToDB();

app.listen(3000, () => {
  console.log("server is running on port no 3000");
});
