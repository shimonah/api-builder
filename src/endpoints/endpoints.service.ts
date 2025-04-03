import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endpoint } from './entities/endpoint.entity';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';

@Injectable()
export class EndpointsService {
  constructor(
    @InjectRepository(Endpoint)
    private endpointsRepository: Repository<Endpoint>,
  ) {}

  async create(createEndpointDto: CreateEndpointDto): Promise<Endpoint> {
    const existingEndpoint = await this.endpointsRepository.findOne({
      where: { endpoint_code: createEndpointDto.endpoint_code },
    });

    if (existingEndpoint) {
      throw new ConflictException(
        `Endpoint with code ${createEndpointDto.endpoint_code} already exists`,
      );
    }

    const endpoint = this.endpointsRepository.create(createEndpointDto);
    return this.endpointsRepository.save(endpoint);
  }

  async findByCode(endpoint_code: string): Promise<Endpoint> {
    const endpoint = await this.endpointsRepository.findOne({
      where: { endpoint_code },
    });

    if (!endpoint) {
      throw new NotFoundException(
        `Endpoint with code ${endpoint_code} not found`,
      );
    }

    return endpoint;
  }

  async findAll(): Promise<Endpoint[]> {
    return this.endpointsRepository.find();
  }

  async update(endpoint_code: string, updateEndpointDto: UpdateEndpointDto): Promise<Endpoint> {
    const endpoint = await this.findByCode(endpoint_code);
    
    // Update the endpoint with new data
    Object.assign(endpoint, updateEndpointDto);
    
    return this.endpointsRepository.save(endpoint);
  }

  async remove(endpoint_code: string): Promise<void> {
    const endpoint = await this.findByCode(endpoint_code);
    await this.endpointsRepository.remove(endpoint);
  }

  async findById(id: number): Promise<Endpoint> {
    const endpoint = await this.endpointsRepository.findOne({
      where: { id },
    });

    if (!endpoint) {
      throw new NotFoundException(
        `Endpoint with ID ${id} not found`,
      );
    }

    return endpoint;
  }

  async saveEndpoint(endpoint: Endpoint): Promise<Endpoint> {
    return this.endpointsRepository.save(endpoint);
  }

  async loadEndpointRelations(endpoint: Endpoint, relations: string[]): Promise<Endpoint> {
    const loadedEndpoint = await this.endpointsRepository.findOne({
      where: { id: endpoint.id },
      relations: relations,
    });
    
    if (!loadedEndpoint) {
      throw new NotFoundException(`Endpoint with ID ${endpoint.id} not found`);
    }
    
    return loadedEndpoint;
  }
} 