import { ORGRepository } from "@/repositories/ORG-repository";

interface CreateORGUseCaseRequest {
  name: string;
  description: string;
  phone: string;
  city: string;
}

export class CreateORGUseCase {
  constructor(private orgRepository: ORGRepository) {}

  async execute(data: CreateORGUseCaseRequest) {
    const ORG = await this.orgRepository.create(data);

    if (!ORG) {
      throw new Error();
    }

    return {
      ORG,
    };
  }
}
