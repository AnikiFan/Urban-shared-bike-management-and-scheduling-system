import { drizzle } from 'drizzle-orm/node-postgres';
import {join} from 'path'
import * as dotenv from "dotenv"
dotenv.config({path:join(__dirname,"..",'..','.env.development')})
export const db = drizzle(process.env.POSTGRES_URL!);