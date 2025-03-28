import { makeFindPetsByCityUseCase } from "@/use-cases/factories/make-find-pets-by-city";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findByCity(request: FastifyRequest, reply: FastifyReply) {
  const findByCitySchema = z.object({
    city: z.string().min(1),
  });

  const city = findByCitySchema.parse(request.query);

  const makeFindPetByCityUseCase = makeFindPetsByCityUseCase();

  const pets = await makeFindPetByCityUseCase.execute(city);

  reply.status(200).send({
    pets,
  });
}
