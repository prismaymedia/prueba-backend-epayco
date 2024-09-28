import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: [String] })
  directors: string[];

  @Prop({ required: true, type: [String] })
  cast: string[];

  @Prop({ type: [String], default: [] })
  similar_year: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
