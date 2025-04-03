import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Connection } from './entities/connection.entity';
import { CreateConnectionDto } from './dto/create-connection.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection)
    private connectionsRepository: Repository<Connection>,
  ) {}

  async create(createConnectionDto: CreateConnectionDto): Promise<Connection> {
    const connection = this.connectionsRepository.create(createConnectionDto);
    return this.connectionsRepository.save(connection);
  }

  async findAll(limit: number = 100, offset: number = 0): Promise<[Connection[], number]> {
    return this.connectionsRepository.findAndCount({
      order: { created_at: 'DESC' },
      take: limit,
      skip: offset,
      relations: ['endpoint', 'integration'],
    });
  }

  async findOne(id: number): Promise<Connection> {
    const connection = await this.connectionsRepository.findOne({
      where: { id },
      relations: ['endpoint', 'integration'],
    });

    if (!connection) {
      throw new NotFoundException(`Connection with ID ${id} not found`);
    }

    return connection;
  }

  async findByEndpointId(
    endpoint_id: number,
    limit: number = 100,
    offset: number = 0,
  ): Promise<[Connection[], number]> {
    return this.connectionsRepository.findAndCount({
      where: { endpoint_id },
      order: { created_at: 'DESC' },
      take: limit,
      skip: offset,
      relations: ['endpoint', 'integration'],
    });
  }

  async findByIntegrationId(
    integration_id: number,
    limit: number = 100,
    offset: number = 0,
  ): Promise<[Connection[], number]> {
    return this.connectionsRepository.findAndCount({
      where: { integration_id },
      order: { created_at: 'DESC' },
      take: limit,
      skip: offset,
      relations: ['endpoint', 'integration'],
    });
  }

  async findByDateRange(
    startDate: Date,
    endDate: Date,
    limit: number = 100,
    offset: number = 0,
  ): Promise<[Connection[], number]> {
    return this.connectionsRepository.findAndCount({
      where: {
        created_at: Between(startDate, endDate),
      },
      order: { created_at: 'DESC' },
      take: limit,
      skip: offset,
      relations: ['endpoint', 'integration'],
    });
  }

  async findByStatus(
    status: string,
    limit: number = 100,
    offset: number = 0,
  ): Promise<[Connection[], number]> {
    return this.connectionsRepository.findAndCount({
      where: { status },
      order: { created_at: 'DESC' },
      take: limit,
      skip: offset,
      relations: ['endpoint', 'integration'],
    });
  }

  async update(id: number, updateConnectionDto: UpdateConnectionDto): Promise<Connection> {
    const connection = await this.findOne(id);
    
    Object.assign(connection, updateConnectionDto);
    
    return this.connectionsRepository.save(connection);
  }

  async remove(id: number): Promise<void> {
    const connection = await this.findOne(id);
    await this.connectionsRepository.remove(connection);
  }

  async getStats(): Promise<any> {
    // Get total count
    const totalCount = await this.connectionsRepository.count();
    
    // Get counts by status
    const successCount = await this.connectionsRepository.count({ where: { status: 'success' } });
    const failedCount = await this.connectionsRepository.count({ where: { status: 'failed' } });
    const errorCount = await this.connectionsRepository.count({ where: { status: 'error' } });
    
    // Get average duration
    const avgDurationResult = await this.connectionsRepository
      .createQueryBuilder('connection')
      .select('AVG(connection.duration_ms)', 'avgDuration')
      .getRawOne();
    
    const avgDuration = avgDurationResult ? parseFloat(avgDurationResult.avgDuration) || 0 : 0;
    
    return {
      totalCount,
      successCount,
      failedCount,
      errorCount,
      successRate: totalCount > 0 ? (successCount / totalCount) * 100 : 0,
      avgDuration,
    };
  }
} 