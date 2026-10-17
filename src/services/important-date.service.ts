import importantDateRepository from "@/src/repositories/important-date.repository";

import { CreateImportantDateInput } from "@/src/zod/important-date.schema";

class ImportantDateService {
  async createImportantDate(
    data: CreateImportantDateInput,
    userId: string
  ) {
    return importantDateRepository.create({
      userId,
      ...data,
    });
  }

  // Returns null for another user's date, same as a missing one
  async getImportantDateById(id: string, userId: string) {
    const importantDate = await importantDateRepository.findById(id);
    return importantDate?.userId.toString() === userId ? importantDate : null;
  }

  getUpcomingImportantDates(userId: string) {
    return importantDateRepository.findUpcoming(userId);
  }

  getPastImportantDates(userId: string) {
    return importantDateRepository.findPast(userId);
  }

  async updateImportantDate(
    id: string,
    data: Partial<CreateImportantDateInput>,
    userId: string
  ) {
    if (!(await this.getImportantDateById(id, userId))) {
      throw new Error("Important date not found.");
    }

    return importantDateRepository.update(id, data);
  }

  async deleteImportantDate(id: string, userId: string) {
    if (!(await this.getImportantDateById(id, userId))) {
      throw new Error("Important date not found.");
    }

    return importantDateRepository.delete(id);
  }
}

export default new ImportantDateService();