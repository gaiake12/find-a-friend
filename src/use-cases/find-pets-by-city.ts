import { PetsRepository } from "@/repositories/pets-repository";

interface FindAPetByCityUseCaseRequest {
  city: string;
}

export class FindPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city }: FindAPetByCityUseCaseRequest) {
    const pets = this.petsRepository.findAPetByCity(city);

    return pets;
  }
}
