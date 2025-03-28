import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FindPetsByCityUseCase } from "../find-pets-by-city";

export function makeFindPetsByCityUseCase() {
  const prismaPetRepository = new PrismaPetsRepository();

  const findPetsByCity = new FindPetsByCityUseCase(prismaPetRepository);

  return findPetsByCity;
}
