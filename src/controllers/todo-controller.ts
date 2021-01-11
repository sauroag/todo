import { Response, Router, NextFunction } from 'express';

import { BaseController } from './base-controller';

import { Model } from '@storage';
import {
  AppContext,
  Errors,
  ExtendedRequest,
  ValidationFailure,
} from '@typings';

export class TodoController extends BaseController {
  public basePath: string = '/todo';
  public router: Router = Router();

  constructor(ctx: AppContext) {
    super(ctx);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.basePath}`,
      this.createTodo,
    );
    this.router.post(
      `${this.basePath}/:_id/`,
      this.getFromId,
    );
    this.router.post(
      `${this.basePath}/update/:topic_id/`,
      this.updateTodo,
    );
    this.router.get(
        `${this.basePath}/getall/`,
        this.getAll,
      );
  }

  private createTodo = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const { topic, description } = req.body;
    const todo = await this.appContext.todoRepository.save(
      new Model.Todo({
        topic,
        description,
      }),
    );
    res.status(201).json(todo.serialize());
  }

  private getFromId = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const { _id } = req.params;
    const data = this.appContext.todoRepository.getTodoData(_id);
    res.json(data);
  }

  private updateTodo = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const { topic, description } = req.body;
    const todo = await this.appContext.todoRepository.updateData(
      new Model.Todo({
        topic,
        description,
      }),
    );
    res.status(201).json(todo.serialize());
  }

  private getAll = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const todo = await this.appContext.todoRepository.getAll();
    res.status(201).json(todo);
  }
}
