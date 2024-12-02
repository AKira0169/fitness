import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Override the getRequest method to extract the token from cookies
  getRequest(context: any): Request {
    const request = context.switchToHttp().getRequest();
    // Extract the JWT from the cookie (assuming it's named 'jwt')
    const token = request.cookies['jwt'];
    // Set the Authorization header in the request if the token exists
    request.headers['authorization'] = token ? `Bearer ${token}` : '';
    return request;
  }
}
