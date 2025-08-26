import dotenv from "dotenv";
dotenv.config();
import express from "express";
import routes from "./Routes/routes.js"
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.use('/api',routes);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});