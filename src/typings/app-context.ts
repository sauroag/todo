import { Logger } from '@typings';
import { Repositories } from '@storage';
export type AppContext = {
  logger: Logger;
  todoRepository: Repositories.TodoRepository
};
