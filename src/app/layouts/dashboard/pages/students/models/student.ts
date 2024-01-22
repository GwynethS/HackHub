import { Course } from "../../courses/models/course";

export interface Student{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cursos: Course[];
}