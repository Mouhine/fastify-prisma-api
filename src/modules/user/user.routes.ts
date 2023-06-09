import { FastifyInstance } from "fastify";
import {
  loginHandler,
  registerUserHandler,
  getUsersHandler,
} from "./user.contollers";
import { $ref } from "./user.schema";

async function userRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    registerUserHandler
  );

  app.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );

  app.get(
    "/",
    {
      preHandler: [app.auth],
    },
    getUsersHandler
  );
}

export default userRoutes;
