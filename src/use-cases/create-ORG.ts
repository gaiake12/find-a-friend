import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcryptjs";

interface CreateOrgUseCaseRequest {
  name: string;
  description?: string;
  phone: string;
  city: string;
  password: string;
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({ password, ...data }: CreateOrgUseCaseRequest) {
    const passwordHash = await hash(password, 6);

    const org = await this.orgRepository.create({ ...data, passwordHash });

    if (!org) {
      throw new Error();
    }

    return {
      org,
    };
  }
}
