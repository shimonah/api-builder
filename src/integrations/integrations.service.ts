import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Integration } from './entities/integration.entity';
import { CreateIntegrationDto } from './dto/create-integration.dto';

@Injectable()
export class IntegrationsService {
  constructor(
    @InjectRepository(Integration)
    private integrationsRepository: Repository<Integration>,
  ) {}

  async create(createIntegrationDto: CreateIntegrationDto): Promise<Integration> {
    const existingIntegration = await this.integrationsRepository.findOne({
      where: { integrationCode: createIntegrationDto.integrationCode },
    });

    if (existingIntegration) {
      throw new ConflictException(
        `Integration with code ${createIntegrationDto.integrationCode} already exists`,
      );
    }

    const integration = this.integrationsRepository.create(createIntegrationDto);
    return this.integrationsRepository.save(integration);
  }

  async findByCode(integrationCode: string): Promise<Integration> {
    const integration = await this.integrationsRepository.findOne({
      where: { integrationCode },
    });

    if (!integration) {
      throw new NotFoundException(
        `Integration with code ${integrationCode} not found`,
      );
    }

    return integration;
  }

  async findAll(): Promise<Integration[]> {
    return this.integrationsRepository.find();
  }

  async update(integrationCode: string, updateData: Partial<CreateIntegrationDto>): Promise<Integration> {
    const integration = await this.findByCode(integrationCode);
    
    // Update the integration with new data
    Object.assign(integration, updateData);
    
    return this.integrationsRepository.save(integration);
  }
} 