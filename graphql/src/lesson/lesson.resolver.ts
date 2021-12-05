import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { CreateLessonInput } from "./lesson.input";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { LessonEntity } from "./lesson.entity";
import { StudentService } from "../student/student.service";

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService
  ) {}

  @Query(() => LessonType)
  lesson(
    @Args('id') id: string,
  ) {
    return this.lessonService.getLesson(id)
  }

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: LessonEntity) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
