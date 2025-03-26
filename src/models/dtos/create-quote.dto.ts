import { IsNotEmpty, IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNumber()
  @IsOptional()
  rate?: number;

  @IsNumber()
  @IsOptional()
  convertedAmount?: number;

  @IsDate()
  @IsOptional()
  timestamp?: Date;

  @IsDate()
  @IsOptional()
  expiresAt?: Date;
} 