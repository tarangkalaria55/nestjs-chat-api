import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocketStoreEntity } from './socket-store.entity';

@Injectable()
export class SocketStoreService {
  constructor(
    @InjectRepository(SocketStoreEntity)
    public repository: Repository<SocketStoreEntity>,
  ) {}

  async findByUserID(id: number) {
    return await this.repository.find({ where: { user: { id: id } } });
  }

  async findBySocketID(socketId: string) {
    return await this.repository.findOne({ where: { socketId: socketId } });
  }

  async deleteBySocketID(socketId: string) {
    await this.repository.delete({ socketId: socketId });
  }
}
