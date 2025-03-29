import { PetsRepository } from "@/repositories/pets-repository";

interface SearchPetsRequest {
  query: string;
  page: number;
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ query, page }: SearchPetsRequest) {
    const pets = await this.petsRepository.searchPets(query, page);

    return pets;
  }
}
