import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FindPetsByCityUseCase } from "../find-pets-by-city";
import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository";

export function makeFindPetsByCityUseCase() {
  const prismaPetRepository = new PrismaPetsRepository();
  const prismaOrgsRepository = new PrismaOrgRepository();

  const findPetsByCity = new FindPetsByCityUseCase(
    prismaPetRepository,
    prismaOrgsRepository
  );

  return findPetsByCity;
}
