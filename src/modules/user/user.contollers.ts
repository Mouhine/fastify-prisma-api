import { FastifyRequest, FastifyReply } from "fastify";
import { app } from "../../app";
import { verifyPassword } from "../../utils/hash";
import { createUserInput, loginInput } from "./user.schema";
import { createUser, findUserByEmail, findUsers } from "./user.service";
export async function registerUserHandler(
  req: FastifyRequest<{ Body: createUserInput }>,
  reply: FastifyReply
) {
  try {
    const body = req.body;

    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (error) {
    return reply.code(500).send("server error");
  }
}

export async function loginHandler(
  req: FastifyRequest<{ Body: loginInput }>,
  reply: FastifyReply
) {
  try {
    const body = req.body;

    //find user by email
    const user = await findUserByEmail(body.email);
    if (!user) return reply.code(401).send("invalid email or password");
    //verify password

    const isValid = verifyPassword(body.password, user.salt, user.password);

    //create accessToken
    if (isValid) {
      const { password, salt, ...rest } = user;
      return { accessToken: app.jwt.sign(rest) };
    }
    // response

    reply.code(401).send("Invalid email or password");
  } catch (error) {}
}

export async function getUsersHandler(
  req: FastifyRequest<{ Body: loginInput }>,
  reply: FastifyReply
) {
  try {
    const users = await findUsers();
    return users;
  } catch (error) {}
}
