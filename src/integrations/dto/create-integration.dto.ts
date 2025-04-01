import { IsNotEmpty, IsString, IsBoolean, IsObject, IsOptional, IsDateString } from 'class-validator';

export class CreateIntegrationDto {
  @IsNotEmpty()
  @IsString()
  integrationCode: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  version: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsObject()
  request: any;

  @IsNotEmpty()
  @IsObject()
  response: any;
} 