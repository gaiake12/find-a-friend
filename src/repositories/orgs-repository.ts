import { org, Prisma } from "@prisma/client";

export interface OrgsRepository {
  create(
    data: Prisma.orgUncheckedCreateInput
  ): Promise<Omit<org, "passwordHash"> | null>;
  findByEmail(email: string): Promise<org | null>;
}
