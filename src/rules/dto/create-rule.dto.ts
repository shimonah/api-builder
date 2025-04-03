import { IsNotEmpty, IsString, IsObject, IsNumber, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ConditionDto {
  @IsNotEmpty()
  @IsString()
  operator: string;

  @IsNotEmpty()
  value: string | number | boolean;
}

export class RuleItemDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ConditionDto)
  condition: ConditionDto;

  @IsNotEmpty()
  @IsString()
  integration_code: string;

  @IsNotEmpty()
  @IsNumber()
  priority: number;
}

export class DefaultRuleDto {
  @IsNotEmpty()
  @IsString()
  integration_code: string;

  @IsNotEmpty()
  @IsNumber()
  priority: number;
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

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RuleItemDto)
  rules: RuleItemDto[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => DefaultRuleDto)
  default: DefaultRuleDto;
} 