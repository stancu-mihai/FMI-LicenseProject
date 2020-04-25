import { DbObject, DbObjectId } from "../others/db";

export interface StudSubjRel extends DbObject {
    studentGroupId: DbObjectId;
    subjectId: DbObjectId;
    semester: number;
    professorId: DbObjectId;
    weeklyHours: number;
    projector: boolean;
    blackboard: boolean; 
    smartboard: boolean; 
    computers: boolean;
}