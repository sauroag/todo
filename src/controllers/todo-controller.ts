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
      `${this.basePath}/get/:id/`,
      this.getFromId,
    );
    this.router.post(
      `${this.basePath}/update/:id/`,
      this.updateTodo,
    );
    this.router.get(
        `${this.basePath}/getall/`,
        this.getAll,
      );

    this.router.get(
        `${this.basePath}/delete/:id`,
        this.delete,
      );
  }

  private createTodo = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const { title, description } = req.body;
    const todo = await this.appContext.todoRepository.save(
      new Model.Todo({
        title,
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
    const { id } = req.params;
    const data = await this.appContext.todoRepository.getTodoData(id);
    res.status(201).json(data);
  }

  private updateTodo = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const { title, description } = req.body;
    const { id } = req.params;
    const todo = await this.appContext.todoRepository.updateData(
      new Model.Todo({
        title,
        description,
        _id: id,
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

  private delete = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const todo = await this.appContext.todoRepository.deleteData(id);
    res.status(201).json(todo);
  }
}
