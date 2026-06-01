import type { Knex } from "knex";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || "5432"),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "./src/infrastructure/database/migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./src/infrastructure/database/seeds",
      extension: "ts",
    },
  },
};

export default config;
