import { Controller, Post, Body, Get, Param, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { Integration } from './entities/integration.entity';

@Controller('integration')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createIntegrationDto: CreateIntegrationDto): Promise<Integration> {
    return this.integrationsService.create(createIntegrationDto);
  }

  @Get('list')
  async findAll(): Promise<Integration[]> {
    return this.integrationsService.findAll();
  }

  @Get(':integrationCode')
  async findByCode(@Param('integrationCode') integrationCode: string): Promise<Integration> {
    return this.integrationsService.findByCode(integrationCode);
  }
}