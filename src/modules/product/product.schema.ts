import { z } from "zod";

import { buildJsonSchemas } from "fastify-zod";
const productInput = {
  title: z.string(),
  Price: z.number(),
  content: z.string().optional(),
};

const productGenerated = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const createProductSchema = z.object({
  ...productInput,
});
const ProductResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});

const ProductsResponseSchema = z.array(ProductResponseSchema);

export type createProductInput = z.infer<typeof createProductSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas({
  createProductSchema,
  ProductsResponseSchema,
  ProductResponseSchema,
});
