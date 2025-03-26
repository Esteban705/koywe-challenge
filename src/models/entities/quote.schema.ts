import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuoteDocument = Quote & Document;

@Schema({ timestamps: true })
export class Quote {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  convertedAmount: number;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  expiresAt: Date;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote); 