"use server";

import { auth } from "../lib/auth";
import { revalidatePath } from "next/cache";

import { connectDB } from "../lib/mongodb";
import importantDateService from "@/src/services/important-date.service";

import {
  createImportantDateSchema,
  CreateImportantDateInput,
} from "@/src/zod/important-date.schema";

export async function createImportantDateAction(
  data: CreateImportantDateInput
) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const validatedData =
    createImportantDateSchema.parse(data);

  const importantDate =
    await importantDateService.createImportantDate(
      validatedData,
      session.user.id
    );

  revalidatePath("/study-tracker");

  return importantDate;
}

export async function getUpcomingImportantDatesAction() {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return importantDateService.getUpcomingImportantDates(
    session.user.id
  );
}

export async function getPastImportantDatesAction() {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return importantDateService.getPastImportantDates(
    session.user.id
  );
}

export async function getImportantDateByIdAction(
  id: string
) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return importantDateService.getImportantDateById(id, session.user.id);
}

export async function updateImportantDateAction(
  id: string,
  data: CreateImportantDateInput
) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Parse so the client can't slip extra fields (e.g. userId) into the update
  const validatedData =
    createImportantDateSchema.parse(data);

  const updated =
    await importantDateService.updateImportantDate(
      id,
      validatedData,
      session.user.id
    );

  revalidatePath("/study-tracker");

  return updated;
}

export async function deleteImportantDateAction(
  id: string
) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const deleted =
    await importantDateService.deleteImportantDate(id, session.user.id);

  revalidatePath("/study-tracker");

  return deleted;
}