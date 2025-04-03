import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RulesController } from './rules.controller';
import { RulesService } from './rules.service';
import { Rule } from './entities/rule.entity';
import { EndpointsModule } from '../endpoints/endpoints.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rule]),
    EndpointsModule,
  ],
  controllers: [RulesController],
  providers: [RulesService],
  exports: [RulesService],
})
export class RulesModule {} 