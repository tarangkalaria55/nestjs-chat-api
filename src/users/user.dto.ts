import { AutoMap } from '@automapper/classes';

export class UserDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  username: string;
}
