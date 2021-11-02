import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.model';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService) {}

  @Get('/')
  async getAll(): Promise<Room[]> {
      return await this.roomService.getAll()
  }

  @Get('/:id')
  async getById(@Param('id') roomId: string): Promise<Room> {
      return await this.roomService.getOne(roomId)
  }

  @Post('/')
  async create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
      return await this.roomService.createOne(createRoomDto)
  }
}