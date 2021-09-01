import {classToPlain} from "class-transformer"
import { inject, injectable } from "tsyringe";
import { ITagsRepository } from "@modules/tags/repositories/ITagsRepository";

@injectable()
class ListTagsUseCase{

    constructor(
        @inject("TagsRepository")
        private repository: ITagsRepository,
    ) {}

    async execute() {
        const tags = await this.repository.getAll();

        return classToPlain(tags);
    }
}

export { ListTagsUseCase }