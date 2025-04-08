import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateOrgUseCaseRequest {
  name: string;
  description?: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({ password, ...data }: CreateOrgUseCaseRequest) {
    const passwordHash = await hash(password, 6);

    const orgWithSameEmail = await this.orgRepository.findByEmail(data.email);

    if (orgWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const org = await this.orgRepository.create({ ...data, passwordHash });

    return org;
  }
}
