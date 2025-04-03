import { IsNotEmpty, IsString, IsObject, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SchemaPropertyDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsString()
  description?: string;

  @IsEnum([true, false], { each: false })
  required?: boolean;

  [key: string]: any;
}

export class SchemaDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsObject()
  properties: {
    [key: string]: SchemaPropertyDto;
  };
}

export class CreateInputDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  endpoint_id?: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
  method: string;

  @IsNotEmpty()
  @IsObject()
  @Type(() => SchemaDto)
  schema: SchemaDto;
} 