import UserEntity from '../src/common/entities/user.entity';

declare global {
  namespace Express {
    class User extends UserEntity {}
  }
}
