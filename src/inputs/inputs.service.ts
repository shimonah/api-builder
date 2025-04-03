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
    const { ...inputData } = createInputDto;
    const input = this.inputsRepository.create(inputData);
    
    return await this.inputsRepository.save(input);
  }

  // TODO: refine and check if relation is needed, same for findOne, findByCode
  async findAll(): Promise<Input[]> {
    return this.inputsRepository.find({
      relations: []
    });
  }

  async findOne(id: number): Promise<Input> {
    const input = await this.inputsRepository.findOne({
      where: { id },
      relations: [],
    });

    if (!input) {
      throw new NotFoundException(`Input with ID ${id} not found`);
    }

    return input;
  }

  async findByEndpointId(endpoint_id: number): Promise<Input[]> {
    const endpoint = await this.endpointsService.findById(endpoint_id);
    
    await this.endpointsService.loadEndpointRelations(endpoint, ['inputs']);
    
    return endpoint.inputs || [];
  }

  async update(id: number, updateInputDto: UpdateInputDto): Promise<Input> {
    const input = await this.findOne(id);
    
    Object.assign(input, updateInputDto);
    
    return this.inputsRepository.save(input);
    
  }

  async remove(id: number): Promise<void> {
    const input = await this.findOne(id);
    await this.inputsRepository.remove(input);
  }

  async findByCode(code: string): Promise<Input> {
    const input = await this.inputsRepository.findOne({
      where: { code },
      relations: [],
    });

    if (!input) {
      throw new NotFoundException(`Input with code ${code} not found`);
    }

    return input;
  }
} 