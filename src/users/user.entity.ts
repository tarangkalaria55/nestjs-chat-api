import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  password: string;
}
