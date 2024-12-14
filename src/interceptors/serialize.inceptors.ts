import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled
    return next.handle().pipe(
      map((data: any) => {
        console.log('Before transformation:', data);
        const transformed = plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
        console.log('After transformation:', transformed);
        return transformed;
      }),
    );
  }
}
