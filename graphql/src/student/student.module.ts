import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentResolver } from "./student.resolver";
import { StudentEntity } from "./student.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity])
  ],
  providers: [StudentResolver, StudentService]})
export class StudentModule {}
