import { FastifyInstance } from "fastify";
import { createProductHandler, getProductsHandler } from "./product.controller";
import { $ref } from "./product.schema";
export async function productsRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: [app.auth],
      schema: {
        body: $ref("createProductSchema"),
        response: {
          201: $ref("ProductResponseSchema"),
        },
      },
    },
    createProductHandler
  );

  app.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("ProductsResponseSchema"),
        },
      },
    },
    getProductsHandler
  );
}
