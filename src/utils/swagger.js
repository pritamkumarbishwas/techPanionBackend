import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Product Management API",
      version: "1.0.0",
      description: "API documentation for managing products",
      contact: {
        name: "API Documentation",
        url: "http://example.com",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/**/*.js"], // Ensure the correct path to your route files
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const setupSwaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.get("/api-docs.json", (req, res) => {
    res.json(swaggerDocs);
  });
};

export default setupSwaggerDocs;
