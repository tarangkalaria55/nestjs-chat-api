import { AutoMap } from '@automapper/classes';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'rooms',
})
export class RoomEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @AutoMap()
  @Column({
    name: 'username',
    type: 'nvarchar',
    length: 255,
    nullable: false,
  })
  name: string;
}
