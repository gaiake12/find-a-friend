import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createSchema = z.object({
    color: z.string().min(1),
    race: z.string().min(1),
    orgId: z.string().uuid(),
  });

  const pet = createSchema.parse(request.body);

  try {
    const createPetUseCase = makeCreatePetUseCase();

    await createPetUseCase.execute(pet);
  } catch (err) {
    throw new Error();
  }

  return reply.status(201).send();
};
