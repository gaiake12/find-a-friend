import { ORG, Prisma } from "@prisma/client";

export interface ORGRepository {
  create(data: Prisma.ORGUncheckedCreateInput): Promise<ORG | null>;
}
