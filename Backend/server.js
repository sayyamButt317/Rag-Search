import dotenv from "dotenv";
import { app } from "./app.js";
import { connectionDB } from "./src/db/connection.js";
import chalk from "chalk";

dotenv.config({ path: "./.env" });
//Connect to DB
connectionDB()
  .then(() => {
    app.listen(8000, () => {
      console.log(chalk.bgBlue(`Server running on port ${8000}`));
    });
  })
  .catch((err) => console.log(`Qdrant connection failed`, err));
  
