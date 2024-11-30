import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv"
dotenv.config({path:"./.env.development"})

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/",
  dbCredentials:{
    host:process.env.POSTGRES_HOST as string,
    port:5432,
    user:process.env.POSTGRES_USER as string,
    password:process.env.POSTGRES_PASSWORD as string,
    database:process.env.POSTGRES_DATABASE as string,
    ssl:false
  }
});
