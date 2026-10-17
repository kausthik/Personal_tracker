import studyRepository from "@/src/repositories/study.repository";
import { CreateStudyInput } from "@/src/zod/study.schema";
import { getNextRevisionDate } from "../lib/revision.utils";
import revisionService from "./revision.service";
import { WantRevisionType } from "../types/revision";

class StudyService {

  async createStudy(
  data: CreateStudyInput,
  userId: string, 
  wantRevision : WantRevisionType
) {
  const normalizedTitle = data.title.trim().toLowerCase();

  const existingStudy =
    await studyRepository.findByNormalizedTitle(
      userId,
      data.subject,
      normalizedTitle
    );

  if (existingStudy) {
    throw new Error("Topic already exists.");
  }

  const study = await studyRepository.create({
    userId,
    normalizedTitle,
    ...data,
  });
  console.log("i am in study service ", wantRevision)
  
  if(wantRevision===WantRevisionType.YES){
    console.log("REVISION CREATED")
  await revisionService.createRevision({
    userId,
    studyId: study._id.toString(),
    revisionNumber: 1,
    scheduledFor: getNextRevisionDate(
      data.difficulty,
      1
    ),
  });
}

  return study;
}

  async getAllTodayStudies(userId: string) {
    return studyRepository.findAllOfToday(userId);
  }

  // Returns null for another user's study, same as a missing one
  async getStudyById(id: string, userId: string) {
    const study = await studyRepository.findById(id);
    return study?.userId === userId ? study : null;
  }

  async deleteStudy(id: string, userId: string) {
  if (!(await this.getStudyById(id, userId))) {
    throw new Error("Study not found.");
  }

  await revisionService.deleteByStudyId(id);

  return studyRepository.delete(id);
}
}

export default new StudyService();