import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketStoreService } from './socket-store.service';
import { SocketStoreEntity } from './socket-store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocketStoreEntity])],
  providers: [SocketStoreService],
  exports: [SocketStoreService],
})
export class SocketStoreModule {}
