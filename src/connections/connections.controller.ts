import { Controller, Get, Post, Body, Param, Put, Delete, Query, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';
import { Connection } from './entities/connection.entity';

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createConnectionDto: CreateConnectionDto): Promise<Connection> {
    return this.connectionsService.create(createConnectionDto);
  }

  @Get()
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<{ data: Connection[]; total: number }> {
    const [connections, total] = await this.connectionsService.findAll(limit, offset);
    return { data: connections, total };
  }

  @Get('stats')
  async getStats(): Promise<any> {
    return this.connectionsService.getStats();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Connection> {
    return this.connectionsService.findOne(id);
  }

  @Get('endpoint/:endpointId')
  async findByEndpointId(
    @Param('endpointId', ParseIntPipe) endpointId: number,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<{ data: Connection[]; total: number }> {
    const [connections, total] = await this.connectionsService.findByEndpointId(endpointId, limit, offset);
    return { data: connections, total };
  }

  @Get('integration/:integrationId')
  async findByIntegrationId(
    @Param('integrationId', ParseIntPipe) integrationId: number,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<{ data: Connection[]; total: number }> {
    const [connections, total] = await this.connectionsService.findByIntegrationId(integrationId, limit, offset);
    return { data: connections, total };
  }

  @Get('status/:status')
  async findByStatus(
    @Param('status') status: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<{ data: Connection[]; total: number }> {
    const [connections, total] = await this.connectionsService.findByStatus(status, limit, offset);
    return { data: connections, total };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConnectionDto: UpdateConnectionDto,
  ): Promise<Connection> {
    return this.connectionsService.update(id, updateConnectionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.connectionsService.remove(id);
  }
} 