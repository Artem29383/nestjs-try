import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssignStudentsToLessonInput {
  @IsUUID()
  @Field(() => ID)
  lessonId: string

  @IsUUID("all", { each: true })
  @Field(() => [ID])
  studentIds: string[]
}
