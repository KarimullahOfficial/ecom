import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'types/enum';

export const USER_ROLE = 'role';

export const Role = (...roles: UserRole[]) => SetMetadata(USER_ROLE, roles);
