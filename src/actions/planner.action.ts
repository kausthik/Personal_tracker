"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../lib/auth";
import { connectDB } from "../lib/mongodb";

import plannerService from "../services/planner.service";

import {
  createPlannerSchema,
  CreatePlannerInput,
} from "@/src/zod/planner.schema";

import { SourceType } from "@/src/types/study";
import {WantRevisionType } from "../types/revision";

export async function createPlannerAction(
  data: CreatePlannerInput
) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const validatedData =
    createPlannerSchema.parse(data);

  const planner =
    await plannerService.createPlanner(
      validatedData,
      session.user.id
    );

  revalidatePath("/study-tracker/planner");

  return planner;
}

export async function getUserPlannersAction() {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return plannerService.getUserPlanners(
    session.user.id
  );
}

export async function getPlannerByIdAction(
  id: string
) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const planner = await plannerService.getPlannerById(id);

  // Only the owner may see a planner
  return planner?.userId === session.user.id ? planner : null;
}

export async function deletePlannerAction(
  id: string
) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const planner =
    await plannerService.deletePlanner(id);

  revalidatePath("/study-tracker/planner");

  return planner;
}

export async function completePlannerTaskAction(
  taskId: string,
  sources: {
    type: SourceType;
    name: string;
    url?: string;
  }[],
  wantRevision: WantRevisionType,
) {
  await connectDB();
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const result =
    await plannerService.completeTask(
      taskId,
      session.user.id,
      sources,
      wantRevision,
    );

  revalidatePath("/study-tracker");
  revalidatePath("/study-tracker/planner");
  revalidatePath(
    `/study-tracker/planner/${result.plannerId}`
  );

  return result.study;
}

export async function getPlannerTasksAction(
  plannerId: string
) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const planner = await plannerService.getPlannerById(plannerId);

  if (planner?.userId !== session.user.id) {
    throw new Error("Planner not found");
  }

  return plannerService.getPlannerTasks(
    plannerId
  );
}