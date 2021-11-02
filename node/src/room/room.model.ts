import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';

export type RoomDocument = Room & Document

@Schema()
export class Room {
    @Prop()
    name: string
}

export const RoomSchema = SchemaFactory.createForClass(Room)