import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { InputsService } from './inputs.service';
import { CreateInputDto } from './dto/create-input.dto';
import { UpdateInputDto } from './dto/update-input.dto';
import { Input } from './entities/input.entity';

@Controller('inputs')
export class InputsController {
  constructor(private readonly inputsService: InputsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createInputDto: CreateInputDto): Promise<Input> {
    return this.inputsService.create(createInputDto);
  }

  @Get()
  async findAll(): Promise<Input[]> {
    return this.inputsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Input> {
    return this.inputsService.findOne(+id);
  }

  @Get('endpoint/:endpointId')
  async findByEndpointId(@Param('endpointId') endpointId: string): Promise<Input[]> {
    return this.inputsService.findByEndpointId(+endpointId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInputDto: UpdateInputDto,
  ): Promise<Input> {
    return this.inputsService.update(+id, updateInputDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.inputsService.remove(+id);
  }
} 