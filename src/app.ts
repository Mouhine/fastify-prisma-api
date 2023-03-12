console.log("hell world");
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.routes";
import { userSchemas } from "./modules/user/user.schema";
import fJWT from "fastify-jwt";
import { productsRoutes } from "./modules/product/product.routes";
export const app = fastify();

app.get("/healthcheck", async function () {
  return { ststus: "ok" };
});

declare module "fastify" {
  export interface FastifyInstance {
    auth: any;
  }
}

declare module "fastify-jwt" {
  export interface FastifyJWT {
    user: {
      email: string;
      name: string;
      id: string;
    };
  }
}

for (let schema of userSchemas) {
  app.addSchema(schema);
}
app.register(fJWT, {
  secrete: "sjfgfgghgfjhgdsgjhsgsdfh",
});

app.decorate("auth", async function (req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (error) {}
});
app.register(userRoutes, { prefix: "/api/users" });
app.register(productsRoutes, { prefix: "/api/products" });

async function main() {
  try {
    await app.listen(3000, "0.0.0.0");
    console.log("serveris runnig");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
main();
