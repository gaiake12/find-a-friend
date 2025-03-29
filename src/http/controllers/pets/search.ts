import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchSchema = z.object({
    query: z.string().min(1),
    page: z.coerce.number().gte(1),
  });

  const searchData = searchSchema.parse(request.query);

  const searchPetsUseCase = makeSearchPetsUseCase();

  const pets = await searchPetsUseCase.execute(searchData);

  reply.status(200).send({
    pets,
  });
}
