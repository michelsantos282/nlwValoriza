import {getRepository, Repository } from "typeorm";
import { ITagsRepository, ICreateTagDTO } from "../../../repositories/ITagsRepository";
import { Tag } from "../entities/Tag";


class TagsRepository implements ITagsRepository{

    private repository: Repository<Tag>

    constructor() {
        this.repository = getRepository(Tag);
    }

    async create({name} : ICreateTagDTO): Promise<void> {
        const tag = this.repository.create({
            name
        });

        await this.repository.save(tag);
    }

    async findByName(name: string): Promise<Tag> {
        const tag = this.repository.findOne({name});

        return tag;
    }

    async findById(id: string): Promise<Tag> {
        const tag = this.repository.findOne(id);

        return tag;
    }

    async getAll(): Promise<Tag[]> {
        const tags = this.repository.find();

        return tags;
    }
}

export { TagsRepository }