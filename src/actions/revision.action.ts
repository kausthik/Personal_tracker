"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../lib/auth";
import { connectDB } from "../lib/mongodb";

import revisionService from "../services/revision.service";


export async function getTodayRevisionsAction() {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return revisionService.getTodayRevisions(
    session.user.id
  );
}

export async function getRevisionByIdAction(
  id: string
) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return revisionService.getRevisionById(id, session.user.id);
}

export async function deleteRevisionAction(
  id: string
) {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const revision =
    await revisionService.deleteRevision(id, session.user.id);

  revalidatePath("/study-tracker");

  return revision;
}

export async function completeRevisionAction(
  id: string
) {
  await connectDB();
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const revision =
    await revisionService.completeRevision(id, session.user.id);

  revalidatePath("/study-tracker");

  return revision;
}

export async function todaysCompletedRevisionCount() {
  await connectDB();

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const revision =
  await revisionService.countTodaysCompletedRevision(session.user.id);

  return revision;
}