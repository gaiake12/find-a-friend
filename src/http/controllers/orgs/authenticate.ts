import { makeAuthenticateOrgUseCase } from "@/use-cases/factories/make-authenticate-org";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });

  const authenticateData = authenticateSchema.parse(request.body);

  try {
    const authenticateOrgUseCase = makeAuthenticateOrgUseCase();

    const org = await authenticateOrgUseCase.execute(authenticateData);

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(201)
      .send({ token });
  } catch (err) {
    reply.status(400).send();
  }
}
