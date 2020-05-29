import { Module } from '@nestjs/common';
import { StoresModule } from './stores/stores.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    StoresModule,
    AuthModule,
    ProductsModule,
  ]
})
export class AppModule {}
