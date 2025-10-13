import { User } from 'src/users/entities/user.entity';

export type JWTPayload = Omit<User, '_id'> & { _id: string };
