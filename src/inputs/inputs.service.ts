import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Input } from './entities/input.entity';
import { CreateInputDto } from './dto/create-input.dto';
import { UpdateInputDto } from './dto/update-input.dto';
import { EndpointsService } from '../endpoints/endpoints.service';

@Injectable()
export class InputsService {
  constructor(
    @InjectRepository(Input)
    private inputsRepository: Repository<Input>,
    private endpointsService: EndpointsService,
  ) {}

  async create(createInputDto: CreateInputDto): Promise<Input> {
    // Create the input without the endpoint_id
    const { endpoint_id, ...inputData } = createInputDto;
    const input = this.inputsRepository.create(inputData);
    
    // Save the input first
    const savedInput = await this.inputsRepository.save(input);
    
    // If endpoint_id is provided, associate the input with the endpoint
    if (endpoint_id !== undefined) {
      const endpoint = await this.endpointsService.findById(endpoint_id);
      
      // Add the input to the endpoint's inputs
      if (!endpoint.inputs) {
        endpoint.inputs = [];
      }
      endpoint.inputs.push(savedInput);
      await this.endpointsService.saveEndpoint(endpoint);
    }
    
    return savedInput;
  }

  async findAll(): Promise<Input[]> {
    return this.inputsRepository.find({ relations: ['endpoints'] });
  }

  async findOne(id: number): Promise<Input> {
    const input = await this.inputsRepository.findOne({
      where: { id },
      relations: ['endpoints'],
    });

    if (!input) {
      throw new NotFoundException(`Input with ID ${id} not found`);
    }

    return input;
  }

  async findByEndpointId(endpoint_id: number): Promise<Input[]> {
    const endpoint = await this.endpointsService.findById(endpoint_id);
    
    // Load the inputs relation
    await this.endpointsService.loadEndpointRelations(endpoint, ['inputs']);
    
    return endpoint.inputs || [];
  }

  async update(id: number, updateInputDto: UpdateInputDto): Promise<Input> {
    const input = await this.findOne(id);
    
    // If endpoint_id is being updated, handle the relationship change
    if (updateInputDto.endpoint_id) {
      // This is now handled differently with many-to-many
      // We'll need to update the endpoint's inputs collection
      const endpoint = await this.endpointsService.findById(updateInputDto.endpoint_id);
      
      // Remove endpoint_id from the DTO as it's not a field in the entity anymore
      const { endpoint_id, ...inputData } = updateInputDto;
      
      // Update the input data
      Object.assign(input, inputData);
      
      // Save the input
      const savedInput = await this.inputsRepository.save(input);
      
      // Update the endpoint's inputs if needed
      // This would require additional logic to add/remove from the relationship
      
      return savedInput;
    } else {
      // Just update the input data
      Object.assign(input, updateInputDto);
      return this.inputsRepository.save(input);
    }
  }

  async remove(id: number): Promise<void> {
    const input = await this.findOne(id);
    await this.inputsRepository.remove(input);
  }
} 