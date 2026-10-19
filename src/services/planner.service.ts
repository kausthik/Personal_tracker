import { CreatePlannerInput } from "@/src/zod/planner.schema";
import plannerRepository from "../repositories/planner/planner.repository";
import plannertaskRepository from "../repositories/plannertask.repository";

import studyService from "./study.service";
import { SourceType } from "@/src/types/study";
import { WantRevisionType } from "../types/revision";

class PlannerService {
  async createPlanner(
    data: CreatePlannerInput,
    userId: string
  ) {
    const normalizedTitle = data.title
      .trim()
      .toLowerCase();

    const existingPlanner =
      await plannerRepository.findByNormalizedTitle(
        userId,
        normalizedTitle
      );

    if (existingPlanner) {
      throw new Error("Planner already exists.");
    }

    const planner = await plannerRepository.create({
    ...data,
    imageUrl:
    data.imageUrl?.trim() ||
    "/planner.png",
    userId,
    normalizedTitle,
    totalTasks: data.plannerTasks.length,
});
  return planner;
}

  async completeTask(
  taskId: string,
  userId: string,
  sources: {
    type: SourceType;
    name: string;
    url?: string;
  }[],
  wantRevision : WantRevisionType,
) {
  const task = await plannertaskRepository.findById(taskId);

  const taskPlanner = task
    ? await plannerRepository.findById(task.plannerId.toString())
    : null;

  if (!task || taskPlanner?.userId !== userId) {
    throw new Error("Planner task not found.");
  }
  // Claim first so a double submit can't create two studies or double count
  if (!(await plannertaskRepository.claimPending(taskId))) {
    throw new Error("Task already completed.");
  }

  let study;
  try {
    study = await studyService.createStudy(
      {
        subject: task.subject,
        title: task.title,
        difficulty: task.difficulty,
        sources,
      },
      userId,
      wantRevision
    );
  } catch (error) {
    await plannertaskRepository.setPending(taskId);
    throw error;
  }
  await plannertaskRepository.setStudy(
    taskId,
    study._id
  );

  const planner =
  await plannerRepository.syncCompletedTasks(
    task.plannerId.toString()
  );

if (
  planner &&
  planner.completedTasks >= planner.totalTasks
) {
  await plannerRepository.markCompleted(
    planner._id.toString()
  );
}

  return {
  study,
  plannerId: task.plannerId.toString(),
};
}

  getPlannerById(id: string) {
    return plannerRepository.findById(id);
  }

  getUserPlanners(userId: string) {
    return plannerRepository.findByUser(userId);
  }

  async deletePlanner(id: string, userId: string) {
    const planner = await this.getPlannerById(id);

    if (planner?.userId !== userId) {
      throw new Error("Planner not found");
    }

    await plannerRepository.delete(id);
  }

  async getPlannerTasks(
  plannerId: string
) {
  return plannertaskRepository.findByPlannerId(
    plannerId
  );
}
  
}



export default new PlannerService();