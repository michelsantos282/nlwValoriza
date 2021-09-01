import { ICreateTagDTO, ITagsRepository } from "@modules/tags/repositories/ITagsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateTagUseCase {

    constructor(
        @inject("TagsRepository")
        private repository: ITagsRepository,
    ) {}

    async execute({name}:ICreateTagDTO) {
        if (!name) {
            throw new Error("Tag field is Empty!");
        }

        const tagAlreadyExists = await this.repository.findByName(name)

        if (tagAlreadyExists) {
            throw new Error("Tag already exists");
        }

        const tag = this.repository.create({name});

        return tag;
    }
}

export { CreateTagUseCase }