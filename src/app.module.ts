import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IntegrationsModule } from './integrations/integrations.module';
import { EndpointsModule } from './endpoints/endpoints.module';
import { InputsModule } from './inputs/inputs.module';
import { RulesModule } from './rules/rules.module';
import { ConnectionsModule } from './connections/connections.module';
import { Integration } from './integrations/entities/integration.entity';
import { Endpoint } from './endpoints/entities/endpoint.entity';
import { Input } from './inputs/entities/input.entity';
import { Rule } from './rules/entities/rule.entity';
import { Connection } from './connections/entities/connection.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Integration, Endpoint, Input, Rule, Connection],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
      }),
    }),
    IntegrationsModule,
    EndpointsModule,
    InputsModule,
    RulesModule,
    ConnectionsModule,
  ],
})
export class AppModule {}
