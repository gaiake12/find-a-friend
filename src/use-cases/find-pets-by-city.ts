import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";

interface FindAPetByCityUseCaseRequest {
  city: string;
}

export class FindPetsByCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({ city }: FindAPetByCityUseCaseRequest) {
    const orgsByCity = await this.orgsRepository.findOrgsByCity(city);

    const pets = await this.petsRepository.findPetByOrgId(orgsByCity);

    return pets;
  }
}
