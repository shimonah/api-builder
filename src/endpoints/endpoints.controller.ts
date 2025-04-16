import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { EndpointsService } from './endpoints.service';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { Endpoint } from './entities/endpoint.entity';

@Controller('endpoints')
export class EndpointsController {
  constructor(private readonly endpointsService: EndpointsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEndpointDto: CreateEndpointDto): Promise<Endpoint> {
    return this.endpointsService.create(createEndpointDto);
  }

  @Get()
  async findAll(): Promise<Endpoint[]> {
    return this.endpointsService.findAll();
  }

  @Get(':code')
  async findByCode(@Param('code') endpoint_code: string): Promise<Endpoint> {
    return this.endpointsService.findByCode(endpoint_code);
  }

  @Get('id/:id')
  async findById(@Param('id') id: number): Promise<Endpoint> {
    return this.endpointsService.findById(id);
  }

  @Put(':code')
  async update(
    @Param('code') endpoint_code: string,
    @Body() updateEndpointDto: UpdateEndpointDto,
  ): Promise<Endpoint> {
    return this.endpointsService.update(endpoint_code, updateEndpointDto);
  }

  @Delete(':code')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('code') endpoint_code: string): Promise<void> {
    return this.endpointsService.remove(endpoint_code);
  }
} 