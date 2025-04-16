import { IsString, IsBoolean, IsObject, IsOptional, IsDateString } from 'class-validator';

export class UpdateIntegrationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsObject()
  request?: any;

  @IsOptional()
  @IsObject()
  response?: any;
} 