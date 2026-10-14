import { Types } from "mongoose";

import { Revision } from "@/src/models/revision.model";
import { DAILY_REVISION_GOAL } from "@/src/lib/revision.utils";
import { RevisionRepositoryType } from "@/src/types/revision"

class RevisionRepository {

  // CREATE
  async create(data: RevisionRepositoryType) {
    const revision = await Revision.create(data);
    return revision.toObject();
  }

  // READ
  async findById(id: string) {
  const revision = await Revision.findById(id).lean();

  if (!revision) {
    return null;
  }

  return {
    ...revision,
    _id: revision._id.toString(),
    userId: revision.userId.toString(),
    studyId: revision.studyId.toString(),
    scheduledFor: revision.scheduledFor.toISOString(),
    completedAt: revision.completedAt
      ? revision.completedAt.toISOString()
      : null,
    createdAt: revision.createdAt.toISOString(),
    updatedAt: revision.updatedAt.toISOString(),
  };
}

  async findToday(userId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return await Revision.find({
      userId: new Types.ObjectId(userId),
      scheduledFor: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).lean();
  }

  async findTodayRevisions(userId: string) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const revisions = await Revision.find({
    userId: new Types.ObjectId(userId),
    scheduledFor: {
      $lte: endOfDay,
    },
    status: "PENDING",
  })
    .populate("studyId")
    .sort({ scheduledFor: 1 })
    .limit(DAILY_REVISION_GOAL)
    .lean();

  return revisions.map((revision) => ({
    ...revision,

    _id: revision._id.toString(),
    userId: revision.userId.toString(),

    studyId: revision.studyId
      ? {
          ...revision.studyId,
          _id: revision.studyId._id.toString(),
        }
      : null,

    scheduledFor: revision.scheduledFor.toISOString(),
    createdAt: revision.createdAt.toISOString(),
    updatedAt: revision.updatedAt.toISOString(),
  }));
}


async deleteByStudyId(studyId: string) {
  return Revision.deleteMany({
    studyId: new Types.ObjectId(studyId),
  });
}

async complete(id: string) {
  return Revision.findByIdAndUpdate(
    id,
    {
      status: "COMPLETED",
      completedAt: new Date(),
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
}

  async findByStudyId(studyId: string) {
    return await Revision.find({
      studyId: new Types.ObjectId(studyId),
    }).lean();
  }

  // UPDATE
  async update(id: string, data: Partial<RevisionRepositoryType>) {
    return await Revision.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // DELETE
  async delete(id: string) {
    return await Revision.findByIdAndDelete(id);
  }

  async countTodays(id: string){
    const date = new Date()
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return await Revision.countDocuments({
    userId: id,
    completedAt: {
    $gte: startOfDay,
    $lte: endOfDay,
   },
  });
  }
}

export default new RevisionRepository();
