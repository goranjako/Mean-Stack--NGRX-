import compression from "compression";
import express from "express";
import helmet from "helmet";
import xssClean from "xss-clean";
import cors from "cors";
import hpp from "hpp";
import path from "path";
import  bodyParser from 'body-parser';
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./util/errorHandler";
import setRoutes from "./routes";
import { connectDB } from "./config/db";
const app = express();
dotenv.config();
connectDB();
// enable cors
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOption));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet()); // Set security headers
app.use(xssClean()); // Prevent xss attacks
app.use(hpp()); // Prevent http param polution
app.use(compression());
app.use(mongoSanitize()); // Sanitize request
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minuates
  max: 100, // 100 requests
});
app.use(limiter);
setRoutes(app);
// Catch all route
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not a valid route",
  });
});

// error handler
app.use(notFound);
app.use(errorHandler);
//RabbitMQ.Conect();
export default app;
