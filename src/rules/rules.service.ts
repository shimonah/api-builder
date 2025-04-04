import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rule } from './entities/rule.entity';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { EndpointsService } from '../endpoints/endpoints.service';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule)
    private rulesRepository: Repository<Rule>,
    private endpointsService: EndpointsService,
  ) {}

  async create(createRuleDto: CreateRuleDto): Promise<Rule> {
    const { endpoint_id, ...ruleData } = createRuleDto;
    const rule = this.rulesRepository.create(ruleData);

    return await this.rulesRepository.save(rule);
  }

  async findAll(): Promise<Rule[]> {
    return this.rulesRepository.find({ relations: [] });
  }

  async findOne(id: number): Promise<Rule> {
    const rule = await this.rulesRepository.findOne({
      where: { id },
      relations: [],
    });

    if (!rule) {
      throw new NotFoundException(`Rule with ID ${id} not found`);
    }

    return rule;
  }

  async findByEndpointId(endpoint_id: number): Promise<Rule[]> {
    const endpoint = await this.endpointsService.findById(endpoint_id);

    await this.endpointsService.loadEndpointRelations(endpoint, ['rules']);
    
    return endpoint.rules || [];
  }

  async update(id: number, updateRuleDto: UpdateRuleDto): Promise<Rule> {
    const rule = await this.findOne(id);
      Object.assign(rule, updateRuleDto);
      return this.rulesRepository.save(rule);
  }

  async remove(id: number): Promise<void> {
    const rule = await this.findOne(id);
    await this.rulesRepository.remove(rule);
  }
} 