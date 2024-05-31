import express from "express"
import dotenv from "dotenv"
import { connection } from "./database/db.js";
import route from "./routes/route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(route);

app.listen(process.env.PORT, async()=> {
    await connection();
    console.log(`http://localhost:${process.env.PORT}`);
})




