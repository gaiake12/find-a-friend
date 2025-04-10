import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "../create-pet";
import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";

export function makeCreatePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const prismaOrgsRepository = new PrismaOrgRepository();

  const createPetUseCase = new CreatePetUseCase(
    prismaPetsRepository,
    prismaOrgsRepository
  );

  return createPetUseCase;
}
