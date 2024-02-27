import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorsMiddleware } from './cors.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: Boolean(process.env.APP_CACHE),
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: Number(process.env.THROTTLE_TTL),
        limit: Number(process.env.THROTTLE_LIMIT),
      },
      {
        name: 'medium',
        ttl: Number(process.env.THROTTLE_TTL) * 10,
        limit: Number(process.env.THROTTLE_LIMIT) * 2,
      },
      {
        name: 'long',
        ttl: Number(process.env.THROTTLE_TTL) * 100,
        limit: Number(process.env.THROTTLE_LIMIT) * 5,
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_MONGODB_CONNECTION_STRING,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
      ssl: Boolean(process.env.USE_SSL),
      autoLoadEntities: true,
      logging: true,
    }),
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
