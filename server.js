import express from "express";
import bodyParser from "body-parser";
import swaggerJsDocs from "./config/swagger/swagger-config-web";
import swaggerUI from "swagger-ui-express";
const app = express();
import webRoutes from "./api/v1/web";
import db from "./db";
import cors from "cors";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(
  "/web-api-docs",
  swaggerUI.serveFiles(swaggerJsDocs, {}),
  swaggerUI.setup(swaggerJsDocs)
);

app.use("/api/v1", webRoutes);

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res
      .status(400)
      .json({
        status: false,
        message: err.error.message.toString().replace(/[\""]+/g, "")
      });
  } else {
    next(err);
  }
});

app.listen(8000, () => console.log("Backend is running on port 8000"));
