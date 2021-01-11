import { model, Schema } from 'mongoose';

const todoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    collection: 'todo',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
const todo = model('Todo', todoSchema);
export default todo;
