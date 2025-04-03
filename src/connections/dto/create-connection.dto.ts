import { IsNotEmpty, IsNumber, IsString, IsObject, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RuleExecutionDto {
  @IsNumber()
  rule_id: number;

  @IsOptional()
  @IsObject()
  matched_condition?: {
    operator: string;
    value: any;
    matched_value: any;
  };

  @IsBoolean()
  used_default: boolean;

  @IsString()
  selected_integration_code: string;
}

export class IntegrationRequestDto {
  @IsString()
  method: string;

  @IsString()
  url: string;

  @IsObject()
  headers: Record<string, string>;

  @IsOptional()
  @IsObject()
  body?: any;
}

export class IntegrationResponseDto {
  @IsNumber()
  status: number;

  @IsObject()
  headers: Record<string, string>;

  @IsObject()
  body: any;

  @IsNumber()
  duration_ms: number;
}

export class ValidationResultDto {
  @IsBoolean()
  success: boolean;

  @IsOptional()
  @IsObject({ each: true })
  conditions_results?: {
    path: string;
    operator: string;
    expected_value: any;
    actual_value: any;
    result: boolean;
  }[];

  @IsOptional()
  @IsString()
  error?: string;
}

export class ClientResponseDto {
  @IsNumber()
  status: number;

  @IsObject()
  body: any;
}

export class CreateConnectionDto {
  @IsNotEmpty()
  @IsNumber()
  endpoint_id: number;

  @IsOptional()
  @IsNumber()
  integration_id?: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  duration_ms?: number;

  @IsOptional()
  @IsObject()
  incoming_data?: any;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => RuleExecutionDto)
  rule_execution?: RuleExecutionDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => IntegrationRequestDto)
  integration_request?: IntegrationRequestDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => IntegrationResponseDto)
  integration_response?: IntegrationResponseDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ValidationResultDto)
  validation_result?: ValidationResultDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ClientResponseDto)
  client_response?: ClientResponseDto;

  @IsOptional()
  @IsString()
  error_message?: string;
} 