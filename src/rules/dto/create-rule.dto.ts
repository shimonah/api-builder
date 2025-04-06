import { IsNotEmpty, IsString, IsBoolean, IsArray, IsOptional, ValidateNested, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ConditionDto {
  @IsNotEmpty()
  @IsString()
  property_value: string;

  @IsNotEmpty()
  @IsString()
  property_type: string;

  @IsNotEmpty()
  @IsString()
  operator: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsString()
  transform: string;
}

export class CreateRuleDto {
  @IsOptional()
  @IsNumber()
  endpoint_id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean = true;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['AND', 'OR'])
  logical_operator: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConditionDto)
  conditions: ConditionDto[];

  @IsNotEmpty()
  @IsString()
  integration_code: string;
} 