import { CreateStudyInput } from "../zod/study.schema";

export enum Subject {
  DSA = "DSA",
  OPERATING_SYSTEM = "OPERATING_SYSTEM",
  DBMS = "DBMS",
  COMPUTER_NETWORKS = "COMPUTER_NETWORKS",
  OOPS = "OOPS",
  WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
  APTITUDE = "APTITUDE",
  SYSTEM_DESIGN = "SYSTEM_DESIGN",
  BACKEND_DEVELOPMENT = "BACKEND_DEVELOPMENT",
  FRONTEND_DEVELOPMENT = "FRONTEND_DEVELOPMENT",
  DEVOPS = "DEVOPS",
  SOFTWARE_ENGINEERING = "SOFTWARE_ENGINEERING",
  WEB_SECURITY = "WEB_SECURITY",
  CYBER_SECURITY = "CYBER_SECURITY",
  AI_ML = "AI_ML",
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export enum SourceType {
  YOUTUBE = "YOUTUBE",
  WEBSITE = "WEBSITE",
  BOOK = "BOOK",
  COURSE = "COURSE",
  NOTES = "NOTES",
  AIMODEL = "AI MODEL",
  LEETCODE = "LEETCODE"
}


export interface Source {
  type: SourceType;
  name: string;
  url?: string;
}

export interface StudyTopic {
  id: string;
  userId: string;
  subject: Subject;
  title: string;
  difficulty: Difficulty;
  sources: Source[];
  studiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type StudyRespositoryType = {
   userId : string
   normalizedTitle: string
}  & CreateStudyInput 
