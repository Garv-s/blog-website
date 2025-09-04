import dotenv from "dotenv";
dotenv.config();
import express from "express";
import routes from "./Routes/routes.js"
import errorHandler from "./middleware/errorMiddleware.js";
import helmet from "helmet";
import swaggerDoc from "./swaggerDoc.js"
import { apiLimiter } from "./middleware/rateLimit.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;
app.use(helmet());
swaggerDoc(app);
app.use('/api',apiLimiter,routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});