import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface CreatePetUseCaseResquest {
  color: string;
  race: string;
  ORGId: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ ...data }: CreatePetUseCaseResquest) {
    const pet = await this.petsRepository.createPet(data);

    if (!pet) {
      throw new Error();
    }

    return { pet };
  }
}
