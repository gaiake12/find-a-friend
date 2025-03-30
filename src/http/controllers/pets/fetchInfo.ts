import { makeFetchPetInfoUseCase } from "@/use-cases/factories/make-fetch-pet-info";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchInfo(request: FastifyRequest, reply: FastifyReply) {
  const fetchInfoSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = fetchInfoSchema.parse(request.params);

  const fetchPetInfo = makeFetchPetInfoUseCase();

  const pet = await fetchPetInfo.execute({ id });

  reply.status(200).send(pet);
}
