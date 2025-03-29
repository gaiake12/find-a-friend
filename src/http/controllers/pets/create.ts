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

    const createdPet = await createPetUseCase.execute(pet);

    reply.status(201).send(createdPet);
  } catch (err) {
    reply.status(400).send();
  }
};
