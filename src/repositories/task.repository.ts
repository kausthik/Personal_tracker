import { Types } from "mongoose";

import { Task } from "@/src/models/task.model";

class TaskRepository {
  async create(data: { userId: string; title: string; frozen: boolean }) {
    const task = await Task.create(data);
    return task.toObject();
  }

  async findById(id: string) {
    return Task.findById(id).lean();
  }

  // Open tasks, frozen tasks, and anything finished since `since`
  async findActive(userId: string, since: Date) {
    return Task.find({
      userId: new Types.ObjectId(userId),
      $or: [
        { completedAt: null },
        { frozen: true },
        { completedAt: { $gte: since } },
      ],
    })
      .sort({ frozen: -1, createdAt: 1 })
      .lean();
  }

  async update(
    id: string,
    data: { frozen?: boolean; completedAt?: Date | null }
  ) {
    return Task.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return Task.findByIdAndDelete(id);
  }
}

export default new TaskRepository();
