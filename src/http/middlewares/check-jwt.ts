import { FastifyReply, FastifyRequest } from "fastify";

export async function checkJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    const teste = await request.jwtVerify();

    console.log(teste);
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
