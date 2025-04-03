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
    // Create the rule without the endpoint_id
    const { endpoint_id, ...ruleData } = createRuleDto;
    const rule = this.rulesRepository.create(ruleData);
    
    // Save the rule first
    const savedRule = await this.rulesRepository.save(rule);
    
    // If endpoint_id is provided, associate the rule with the endpoint
    if (endpoint_id !== undefined) {
      const endpoint = await this.endpointsService.findById(endpoint_id);
      
      // Add the rule to the endpoint's rules
      if (!endpoint.rules) {
        endpoint.rules = [];
      }
      endpoint.rules.push(savedRule);
      await this.endpointsService.saveEndpoint(endpoint);
    }
    
    return savedRule;
  }

  async findAll(): Promise<Rule[]> {
    return this.rulesRepository.find({ relations: ['endpoints'] });
  }

  async findOne(id: number): Promise<Rule> {
    const rule = await this.rulesRepository.findOne({
      where: { id },
      relations: ['endpoints'],
    });

    if (!rule) {
      throw new NotFoundException(`Rule with ID ${id} not found`);
    }

    return rule;
  }

  async findByEndpointId(endpoint_id: number): Promise<Rule[]> {
    const endpoint = await this.endpointsService.findById(endpoint_id);
    
    // Load the rules relation
    await this.endpointsService.loadEndpointRelations(endpoint, ['rules']);
    
    return endpoint.rules || [];
  }

  async update(id: number, updateRuleDto: UpdateRuleDto): Promise<Rule> {
    const rule = await this.findOne(id);
    
    // If endpoint_id is being updated, handle the relationship change
    if (updateRuleDto.endpoint_id) {
      // This is now handled differently with many-to-many
      // We'll need to update the endpoint's rules collection
      const endpoint = await this.endpointsService.findById(updateRuleDto.endpoint_id);
      
      // Remove endpoint_id from the DTO as it's not a field in the entity anymore
      const { endpoint_id, ...ruleData } = updateRuleDto;
      
      // Update the rule data
      Object.assign(rule, ruleData);
      
      // Save the rule
      const savedRule = await this.rulesRepository.save(rule);
      
      // Update the endpoint's rules if needed
      // This would require additional logic to add/remove from the relationship
      
      return savedRule;
    } else {
      // Just update the rule data
      Object.assign(rule, updateRuleDto);
      return this.rulesRepository.save(rule);
    }
  }

  async remove(id: number): Promise<void> {
    const rule = await this.findOne(id);
    await this.rulesRepository.remove(rule);
  }
} 