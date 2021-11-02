import { Injectable} from '@nestjs/common';
import {RoomDocument, Room} from './room.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

    async getAll() {
        return this.roomModel.find({})
    }

    async getOne(roomId: string) {
        return this.roomModel.findOne({id: roomId})
    }

    async createOne(createRoomDto: CreateRoomDto) {
        return this.roomModel.create(createRoomDto)
    }
}