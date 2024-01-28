import { AutoMap } from '@automapper/classes';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @AutoMap()
  @Column({
    name: 'username',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  username: string;

  @AutoMap()
  @Column({
    name: 'password',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  password: string;
}
