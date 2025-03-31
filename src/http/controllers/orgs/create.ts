import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBodySchema = z.object({
    name: z.string().min(3),
    description: z.string().max(255).optional(),
    email: z.string().email(),
    password: z.string().min(8),
    city: z.string(),
    phone: z.string().length(11),
  });

  const createOrgData = createBodySchema.parse(request.body);

  try {
    const createOrgUseCase = makeCreateOrgUseCase();

    const org = await createOrgUseCase.execute(createOrgData);

    return reply.status(201).send(org);
  } catch (err) {
    return reply.status(400).send();
  }
};
