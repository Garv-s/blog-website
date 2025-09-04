import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import moment from "moment-timezone";

const START_TIME = moment.tz("Asia/Kolkata").format("DD-MMM-YYYY hh:mm:ss a");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "blogWebsite_api",
    version: "1.0.0",
    description: `<h4>Last build: <b>${START_TIME}</b></h4>`,
  },
  servers: [
    { url: "http://localhost:5000" }
  ],
  components: {                     
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [                       // 👈 Move global security here
    { bearerAuth: [] }
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],         // route files with swagger comments
};

const swaggerSpec = swaggerJsDoc(options);

export default (app) => {
  app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, false, {
      docExpansion: "none",
      tryItOutEnabled: true,
    })
  );
};
