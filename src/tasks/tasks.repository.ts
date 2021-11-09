import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "../auth/user.entity";
import { InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository', { timestamp: true });

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task: Task = this.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    try {
      const query = this.createQueryBuilder('task');
      query.where({ user });

      if (filterDto.status) {
        query.andWhere('task.status = :status', { status: filterDto.status });
      }

      if (filterDto.search) {
        query.andWhere(
          '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
          { search: `%${filterDto.search}%` }
        )
      }

      return await query.getMany();
    } catch (e) {
      this.logger.error(`Failed to get task for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, e.stack);
      throw new InternalServerErrorException();
    }
  }
}
