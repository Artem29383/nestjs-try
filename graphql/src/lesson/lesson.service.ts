import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { LessonEntity } from "./lesson.entity";
import { Repository } from "typeorm";
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from "./lesson.input";

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity) private lessonRepository: Repository<LessonEntity>
  ) {}

  async getLesson(id): Promise<LessonEntity> {
    return this.lessonRepository.findOne({ id });
  }

  async getLessons() {
    return this.lessonRepository.find();
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<LessonEntity> {
    const lesson = await this.lessonRepository.create({
      id: uuid(),
      ...createLessonInput
    })

    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(lessonId: string, studentsIds: string[]): Promise<LessonEntity> {
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentsIds];
    return this.lessonRepository.save(lesson);
  }
}

