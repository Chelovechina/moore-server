import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ManagersModule } from './managers/managers.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@moore-db.gzoen1b.mongodb.net/?retryWrites=true&w=majority',
    ),
    UsersModule,
    AuthModule,
    ManagersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
