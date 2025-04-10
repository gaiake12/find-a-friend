import { org, Prisma } from "@prisma/client";

export interface OrgsRepository {
  create(data: Prisma.orgUncheckedCreateInput): Promise<org | null>;
  findById(id: string): Promise<org | null>;
  findByEmail(email: string): Promise<org | null>;
  findOrgsByCity(city: string): Promise<string[]>;
}
