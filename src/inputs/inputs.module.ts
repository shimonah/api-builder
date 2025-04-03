import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InputsController } from './inputs.controller';
import { InputsService } from './inputs.service';
import { Input } from './entities/input.entity';
import { EndpointsModule } from '../endpoints/endpoints.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Input]),
    EndpointsModule,
  ],
  controllers: [InputsController],
  providers: [InputsService],
  exports: [InputsService],
})
export class InputsModule {} 