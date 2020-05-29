import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../auth/user.entity';

export const GetStore = createParamDecorator((data: unknown, ctx: ExecutionContext): void => {
  const request = ctx.switchToHttp().getRequest();
  console.log(request);
});
