import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { RulesService } from './rules.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { Rule } from './entities/rule.entity';

@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRuleDto: CreateRuleDto): Promise<Rule> {
    return this.rulesService.create(createRuleDto);
  }

  @Get()
  async findAll(): Promise<Rule[]> {
    return this.rulesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Rule> {
    return this.rulesService.findOne(+id);
  }

  @Get('endpoint/:endpointId')
  async findByEndpointId(@Param('endpointId') endpointId: string): Promise<Rule[]> {
    return this.rulesService.findByEndpointId(+endpointId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRuleDto: UpdateRuleDto,
  ): Promise<Rule> {
    return this.rulesService.update(+id, updateRuleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.rulesService.remove(+id);
  }
} 