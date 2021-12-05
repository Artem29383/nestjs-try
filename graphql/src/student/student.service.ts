import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudentEntity } from "./student.entity";
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from "./create-student.input";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity) private studentRepository: Repository<StudentEntity>
  ) {}

  async getStudent(id): Promise<StudentEntity> {
    return this.studentRepository.findOne({ id });
  }

  async getStudents() {
    return this.studentRepository.find();
  }

  async createStudent(createStudentInput: CreateStudentInput): Promise<StudentEntity> {
    const student = await this.studentRepository.create({
      id: uuid(),
      ...createStudentInput,
    })

    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<StudentEntity[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds
        }
      }
    });
  }
}
