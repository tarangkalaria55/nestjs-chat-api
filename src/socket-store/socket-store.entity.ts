import { AutoMap } from '@automapper/classes';
import { UserEntity } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'socket_store',
})
export class SocketStoreEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @AutoMap()
  @Column({
    name: 'username',
    type: 'nvarchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  socketId: string;

  @AutoMap()
  @ManyToOne(() => UserEntity, (m) => m.sockets)
  user: UserEntity;
}
