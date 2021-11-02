import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
  MongooseModule.forRoot('mongodb+srv://qq:123@cluster0.tkjub.mongodb.net/ZOO?retryWrites=true&w=majority'),
  RoomModule,
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}