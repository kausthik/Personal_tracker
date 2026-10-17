"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../lib/auth";

import studyService from "@/src/services/study.service";
import {
  createStudySchema,
  CreateStudyInput,
} from "@/src/zod/study.schema";
import { connectDB } from "../lib/mongodb";
import { WantRevisionType } from "../types/revision";


export async function createStudyAction(
  data: CreateStudyInput
) {
  await connectDB();
  // 1. Authentication
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // 2. Validation
  const validatedData = createStudySchema.parse(data);

  // 3. Service
  const study = await studyService.createStudy(
    validatedData,
    session.user.id,
    WantRevisionType.YES
  );

  // 4. Revalidate Cache
  revalidatePath("/study-tracker");

  // 5. Return Response
  return study;
}

export async function getTodayStudiesAction() {
  await connectDB();
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return await studyService.getAllTodayStudies(
    session.user.id
  );
}

export async function getStudyByIdAction(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return await studyService.getStudyById(id, session.user.id);
}

export async function deleteStudyAction(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const study = await studyService.deleteStudy(id, session.user.id);

  revalidatePath("/study-tracker");

  return study;
}