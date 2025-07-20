import dotenv from "dotenv";
import { app } from "./app.js";
import { connectionDB } from "./src/db/connection.js";
import chalk from 'chalk';

// Environment variable configuration
dotenv.config({ path: "./.env" });

// Connect to MongoDB
connectionDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(chalk.bgBlue(`Server running on port ${process.env.PORT || 8000}`));
    });
  })
  .catch((err) => console.log(`MongoDB connection failed`, err));