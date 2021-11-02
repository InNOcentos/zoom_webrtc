import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomController } from './room.controller';
import { Room, RoomSchema } from './room.model';
import { RoomService } from './room.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Room.name, schema: RoomSchema}])
    ],
    controllers: [RoomController],
    providers: [RoomService],
    exports: [RoomService]
})
export class RoomModule {}
