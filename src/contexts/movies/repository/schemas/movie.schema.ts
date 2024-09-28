import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie extends Document {
  @Prop()
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop([String])
  directors: string[];

  @Prop([String])
  cast: string[];

  @Prop()
  year: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
