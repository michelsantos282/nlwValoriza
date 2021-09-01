import { ICreateTagDTO } from "../dtos/ICreateTagDTO";
import { Tag } from "../infra/typeorm/entities/Tag";

interface ITagsRepository {
    create(data: ICreateTagDTO): Promise<void>;
    findByName(name: string): Promise<Tag>;
    findById(id: string): Promise<Tag>;
    getAll(): Promise<Tag[]>;
}

export { ITagsRepository, ICreateTagDTO }