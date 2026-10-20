import taskRepository from "@/src/repositories/task.repository";

import { CreateTaskInput } from "@/src/zod/task.schema";

// shortcut: "today" uses the server clock, move to the user's timezone if the day rolls over at the wrong hour
function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

class TaskService {
  createTask(data: CreateTaskInput, userId: string) {
    return taskRepository.create({ userId, ...data });
  }

  async getTodayTasks(userId: string) {
    const today = startOfToday();
    const tasks = await taskRepository.findActive(userId, today);

    return tasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      frozen: task.frozen,
      // A frozen task done yesterday counts as not done today
      done: !!task.completedAt && task.completedAt >= today,
    }));
  }

  private async getOwnedTask(id: string, userId: string) {
    const task = await taskRepository.findById(id);
    if (task?.userId.toString() !== userId) {
      throw new Error("Task not found.");
    }
    return task;
  }

  async setDone(id: string, done: boolean, userId: string) {
    await this.getOwnedTask(id, userId);
    return taskRepository.update(id, { completedAt: done ? new Date() : null });
  }

  async setFrozen(id: string, frozen: boolean, userId: string) {
    await this.getOwnedTask(id, userId);
    return taskRepository.update(id, { frozen });
  }

  async deleteTask(id: string, userId: string) {
    await this.getOwnedTask(id, userId);
    return taskRepository.delete(id);
  }
}

export default new TaskService();
