import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from 'src/Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto) {
    const { id, ...data } = dto;

    if(!id) {
      try {
        return await this.taskRepository.save(data)     
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
    try {
      return this.taskRepository.save({
        ...data,
        id,
      });
    } catch (error) {
      
    }
    

    return null;
  }
}
