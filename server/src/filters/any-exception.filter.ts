import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      console.log('Http ',exception.getResponse())
      
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.getResponse(),
        name: exception.name
      });
    }

    if (exception instanceof ValidationError) { 
      console.log('Valid ',exception.errors[0].message)     
      return response.status(409).json({
        statusCode: 409,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.errors[0].message,
        name: exception.name
      });
    }


    if (exception instanceof JsonWebTokenError) {
      console.log('JwsonWeb ',exception.message)     
      return response.status(401).json({
        statusCode: 401,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
        name: exception.name
      });
    }

    console.log(exception);

    response.status(500).json({
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
      name: exception.name
    });
  }
}