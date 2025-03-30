import { PetsRepository } from "@/repositories/pets-repository";

interface FetchPetInfoUseCaseRequest {
  id: string;
}

export class FetchPetInfoUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: FetchPetInfoUseCaseRequest) {
    const pet = await this.petsRepository.findPetById(id);

    if (!pet) {
      throw new Error();
    }

    return pet;
  }
}
