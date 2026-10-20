"use server";

import { auth } from "../lib/auth";
import { revalidatePath } from "next/cache";

import { connectDB } from "../lib/mongodb";
import taskService from "@/src/services/task.service";

import { createTaskSchema, CreateTaskInput } from "@/src/zod/task.schema";

async function getUserId() {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}

export async function createTaskAction(data: CreateTaskInput) {
  const userId = await getUserId();

  await taskService.createTask(createTaskSchema.parse(data), userId);

  revalidatePath("/study-tracker");
}

export async function getTodayTasksAction() {
  return taskService.getTodayTasks(await getUserId());
}

export async function setTaskDoneAction(id: string, done: boolean) {
  const userId = await getUserId();

  await taskService.setDone(id, done === true, userId);

  revalidatePath("/study-tracker");
}

export async function setTaskFrozenAction(id: string, frozen: boolean) {
  const userId = await getUserId();

  await taskService.setFrozen(id, frozen === true, userId);

  revalidatePath("/study-tracker");
}

export async function deleteTaskAction(id: string) {
  const userId = await getUserId();

  await taskService.deleteTask(id, userId);

  revalidatePath("/study-tracker");
}
