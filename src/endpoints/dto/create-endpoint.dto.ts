import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreateEndpointDto {
  @IsNotEmpty()
  @IsString()
  endpoint_code: string;

  @IsNotEmpty()
  @IsString()
  url_path: string;

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
} 