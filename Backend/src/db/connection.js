import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from 'chalk';

dotenv.config();
const connectionDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(chalk.bgGreenBright(` Connected to database! ✅ `),
        `Database: ${connectionInstance.connection.name}`,
    );
  } catch (error) {
    console.log(chalk.bgRed("MongoDB connection failed ❌", error));
    process.exit(1);
  }
};

export { connectionDB };