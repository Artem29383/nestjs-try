import { TaskStatus } from "../task.model";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetTasksFilterDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
