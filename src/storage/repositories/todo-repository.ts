import { BaseRepository } from './base-repository';
import { RepositoryContext } from './repository-context';
import { Model } from '@storage';
// import lodash from 'lodash';

export class TodoRepository extends BaseRepository<Model.Todo> {
  constructor(context: RepositoryContext) {
    super(context);
  }
  public async getTodoData(
    topicId: string,
  ): Promise<Model.Todo> {
    return new Promise(async (resolve, reject) => {
      const topicObjectId = this.toObjectId(topicId);
      const data = await this.findOne({
        _id: topicObjectId,
      });
      resolve(data);
    });
  }

  public async updateData(
    data: Model.Todo,
  ): Promise<Model.Todo> {
    return new Promise(async (resolve, reject) => {
      const topicObjectId = this.toObjectId(data._id);
      await this.update(
        {
          _id: topicObjectId,
        },
        {
          $set:
          {
            'todo.$.topic': data.title,
            'todo.$.description': data.description,
          },
        });
      resolve(data);
    });
  }
}
