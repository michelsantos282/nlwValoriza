import { getCustomRepository } from "typeorm"
import { TagsRepository } from "../repositories/TagsRepository"

interface ITagRequest {
    name: string
}

class CreateTagService {

    async execute({name}:ITagRequest) {
        const repository = getCustomRepository(TagsRepository);

        if (!name) {
            throw new Error("Tag field is Empty!");
        }

        const tagAlreadyExists = await repository.findOne({name});

        if (tagAlreadyExists) {
            throw new Error("Tag already exists");
        }

        const tag = repository.create({name});

        await repository.save(tag);

        return tag;
    }
}

export { CreateTagService }