import { FastifyReply, FastifyRequest } from "fastify";
import { createProductInput, productSchemas } from "./product.schema";
import { createProduct, getProducts } from "./product.service";
export async function createProductHandler(
  req: FastifyRequest<{
    Body: createProductInput;
  }>,
  reply: FastifyReply
) {
  const product = await createProduct({
    ...req.body,
    ownerId: req?.user?.id!,
  });
}

export async function getProductsHandler() {
  const products = await getProducts();

  return products;
}
