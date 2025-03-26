import { org, Prisma } from "@prisma/client";

export interface OrgsRepository {
  create(data: Prisma.orgUncheckedCreateInput): Promise<org | null>;
}
