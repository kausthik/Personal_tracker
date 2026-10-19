import { Types } from "mongoose";

import { PlannerTask } from "@/src/models/plannertask.model";
import { PlannerTaskRepositoryType, PlannerTaskStatus } from "@/src/types/planner";

class PlannerTaskRepository {

  // CREATE
  async createMany(data: PlannerTaskRepositoryType[]) {
    return await PlannerTask.insertMany(data);
  }

  // READ
  async findById(id: string) {
  const task = await PlannerTask.findById(id).lean();

  if (!task) return null;

  return {
    ...task,
    _id: task._id.toString(),
    plannerId: task.plannerId.toString(),
    studyId: task.studyId
      ? task.studyId.toString()
      : null,
  };
}

  async findByPlannerId(plannerId: string) {
  const tasks = await PlannerTask.find({
    plannerId: new Types.ObjectId(plannerId),
  })
    .sort({
      order: 1,
    })
    .lean();

  return tasks.map((task) => ({
    ...task,
    _id: task._id.toString(),
    plannerId: task.plannerId.toString(),
    studyId: task.studyId
      ? task.studyId.toString()
      : null,
  }));
}

  async findByNormalizedTitle(
    plannerId: string,
    normalizedTitle: string
  ) {
    return await PlannerTask.findOne({
      plannerId: new Types.ObjectId(plannerId),
      normalizedTitle,
    }).lean();
  }

  // UPDATE
  async update(
    id: string,
    data: Partial<PlannerTaskRepositoryType>
  ) {
    return await PlannerTask.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // Atomic PENDING -> COMPLETED; returns null if another request already completed it
  async claimPending(taskId: string) {
  return PlannerTask.findOneAndUpdate(
    { _id: taskId, status: PlannerTaskStatus.PENDING },
    { status: PlannerTaskStatus.COMPLETED },
    { new: true }
  ).lean();
}

  async setPending(taskId: string) {
  return PlannerTask.findByIdAndUpdate(taskId, {
    status: PlannerTaskStatus.PENDING,
  });
}

  async setStudy(
  taskId: string,
  studyId: string
) {
  return PlannerTask.findByIdAndUpdate(taskId, {
    studyId: new Types.ObjectId(studyId),
  });
}

  // DELETE
  async delete(id: string) {
    return await PlannerTask.findByIdAndDelete(id);
  }
}

export default new PlannerTaskRepository();