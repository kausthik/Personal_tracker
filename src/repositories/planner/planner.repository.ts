import { Types } from "mongoose";

import { Planner } from "@/src/models/planner.model";
import { PlannerRepositoryType } from "@/src/types/planner";
import { PlannerTask } from "@/src/models/plannertask.model";

class PlannerRepository {
  // CREATE
  async create(data: PlannerRepositoryType) {
  const { plannerTasks, ...plannerData } = data;

  const planner = await Planner.create(plannerData);

  await PlannerTask.insertMany(
    plannerTasks.map((task, index) => ({
      plannerId: planner._id,
      subject: task.subject,
      title: task.title,
      normalizedTitle: task.title.trim().toLowerCase(),
      difficulty: task.difficulty,
      order: index + 1,
      status: "PENDING",
    }))
  );

  return {
    ...planner.toObject(),
    _id: planner._id.toString(),
    userId: planner.userId.toString(),
  };
}

  // READ
  async findById(id: string) {
  const planner = await Planner.findById(id).lean();

  if (!planner) return null;

  return {
    ...planner,
    _id: planner._id.toString(),
    userId: planner.userId.toString(),
  };
}

  async findByUser(userId: string) {
  const planners = await Planner.find({
    userId: new Types.ObjectId(userId),
  })
    .sort({
      createdAt: -1,
    })
    .lean();

  return planners.map((planner) => ({
    ...planner,
    _id: planner._id.toString(),
    userId: planner.userId.toString(),
  }));
}

  async findByNormalizedTitle(
    userId: string,
    normalizedTitle: string
  ) {
    return Planner.findOne({
      userId: new Types.ObjectId(userId),
      normalizedTitle,
    }).lean();
  }

  async incrementCompletedTasks(plannerId: string) {
  const planner =
    await Planner.findByIdAndUpdate(
      plannerId,
      {
        $inc: {
          completedTasks: 1,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

  if (!planner) return null;

  return {
    ...planner,
    _id: planner._id.toString(),
    userId: planner.userId.toString(),
  };
}

  // UPDATE
  async update(
    id: string,
    data: Partial<PlannerRepositoryType>
  ) {
    return Planner.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // DELETE
  async delete(id: string) {
    return Planner.findByIdAndDelete(id);
  }

  async findByPlannerId(plannerId: string) {
  const tasks = await PlannerTask.find({
    plannerId: new Types.ObjectId(plannerId),
  })
    .sort({ order: 1 })
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

async markCompleted(id: string) {
  return Planner.findByIdAndUpdate(
    id,
    {
      status: "COMPLETED",
    },
    {
      new: true,
      runValidators: true,
    }
  ).lean();
}
}

export default new PlannerRepository();