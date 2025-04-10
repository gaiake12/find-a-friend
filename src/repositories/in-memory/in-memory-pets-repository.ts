import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";
import { search } from "@/http/controllers/pets/search";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async createPet({
    color,
    orgId,
    race,
  }: Omit<Prisma.PetUncheckedCreateInput, "search">) {
    const pet = {
      id: randomUUID(),
      search: `${color} ${race}`,
      color,
      race,
      orgId,
    };

    this.items.push(pet);

    return pet;
  }

  async findPetById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async searchPets(query: string, page: number) {
    const pets = this.items
      .filter((item) => item.search.includes(query))
      .slice((page - 1) * 20, page * 20);

    return pets;
  }

  async findPetByOrgId(orgsIds: string[]) {
    const pets = this.items.filter((pet) =>
      orgsIds.some((orgId) => orgId === pet.orgId)
    );

    return pets;
  }
}
