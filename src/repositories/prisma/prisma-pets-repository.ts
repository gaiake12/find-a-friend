import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async searchPets(query: string, page: 1) {
    const pets = await prisma.pet.findMany({
      where: {
        search: {
          contains: query,
        },
      },
      select: {
        id: true,
        color: true,
        race: true,
        orgId: true,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return pets;
  }

  async createPet({
    color,
    race,
    ...data
  }: Omit<Prisma.PetUncheckedCreateInput, "search">) {
    const search = `${color} ${race}`;

    const pet = await prisma.pet.create({
      data: {
        ...data,
        color,
        race,
        search,
      },
      select: {
        id: true,
        color: true,
        race: true,
        orgId: true,
      },
    });

    if (!pet) return null;

    return pet;
  }

  async findPetById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        color: true,
        race: true,
        orgId: true,
      },
    });

    return pet;
  }

  async findPetByOrgId(orgsIds: string[]) {
    const pets = await prisma.pet.findMany({
      where: {
        orgId: {
          in: orgsIds,
        },
      },
      select: {
        id: true,
        color: true,
        race: true,
        orgId: true,
      },
    });

    return pets;
  }
}
