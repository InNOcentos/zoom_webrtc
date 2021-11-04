import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.model';
import { RoomService } from './room.service';
import {AuthGuard} from '@nestjs/passport'

@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService) {}

  @UseGuards(AuthGuard('jwt'))
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