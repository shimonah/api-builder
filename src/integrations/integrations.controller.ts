import { Controller, Post, Body, Get, Param, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { Integration } from './entities/integration.entity';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get('list')
  async findAll(): Promise<Integration[]> {
    return this.integrationsService.findAll();
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createIntegrationDto: CreateIntegrationDto): Promise<Integration> {
    return this.integrationsService.create(createIntegrationDto);
  }

  @Get(':integrationCode')
  async findByCode(@Param('integrationCode') integrationCode: string): Promise<Integration> {
    return this.integrationsService.findByCode(integrationCode);
  }
}