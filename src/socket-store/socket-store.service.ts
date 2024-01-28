import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocketStoreEntity } from './socket-store.entity';

@Injectable()
export class SocketStoreService {
  constructor(
    @InjectRepository(SocketStoreEntity)
    private socketsRepository: Repository<SocketStoreEntity>,
  ) {}
}
