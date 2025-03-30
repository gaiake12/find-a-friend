import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FetchPetInfoUseCase } from "../fetch-pet-info";

export function makeFetchPetInfoUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository();

  const fecthPetInfoUseCase = new FetchPetInfoUseCase(prismaPetsRepository);

  return fecthPetInfoUseCase;
}
