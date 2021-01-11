import { BaseRepository } from './base-repository';
import { RepositoryContext } from './repository-context';
import { Model } from '@storage';
// import lodash from 'lodash';

export class TodoRepository extends BaseRepository<Model.Todo> {
  constructor(context: RepositoryContext) {
    super(context);
  }
  public async getTodoData(
    id: string,
  ): Promise<Model.Todo> {
    return new Promise(async (resolve, reject) => {
      const objectId = this.toObjectId(id);
      const data = await this.findOne({
        _id: objectId,
      });
      resolve(data);
    });
  }

  public async updateData(
    data: Model.Todo,
  ): Promise<Model.Todo> {
    return new Promise(async (resolve, reject) => {
      const titleObjectId = this.toObjectId(data._id);
      await this.update(
        {
          _id: titleObjectId,
        },
        {
          $set:
          {
            title: data.title,
            description: data.description,
          },
        });
      resolve(data);
    });
  }

  public async deleteData(
    id: string,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const titleObjectId = this.toObjectId(id);
      await this.deleteMany(
        {
          _id: titleObjectId,
        });
      resolve({
        id: titleObjectId,
      });
    });
  }

  protected modelFactory(): Model.ModelFactory<Model.Todo> {
    return {
      getType() {
        return typeof Model.Todo;
      },
      create(json: any) {
        return new Model.Todo(json);
      },
    };
  }
}
