import { Logger } from '@typings';
import { IDataStore } from '@storage';

export type RepositoryContext = {
  logger: Logger;
  store: IDataStore;
  translate: (key: string) => string;
};
