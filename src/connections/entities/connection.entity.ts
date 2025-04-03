import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Endpoint } from '../../endpoints/entities/endpoint.entity';
import { Integration } from '../../integrations/entities/integration.entity';

@Entity('connections')
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  endpoint_id: number;

  @ManyToOne(() => Endpoint, endpoint => endpoint.connections, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'endpoint_id' })
  endpoint: Endpoint;

  @Column({ nullable: true })
  integration_id: number;

  @ManyToOne(() => Integration, integration => integration.connections, { onDelete: 'NO ACTION', nullable: true })
  @JoinColumn({ name: 'integration_id' })
  integration: Integration;

  @Column()
  status: string; // 'success', 'failed', 'error'

  @Column({ type: 'int', nullable: true })
  duration_ms: number;

  @Column('jsonb', { nullable: true })
  incoming_data: any;

  @Column('jsonb', { nullable: true })
  rule_execution: {
    rule_id: number;
    matched_condition?: {
      operator: string;
      value: any;
      matched_value: any;
    };
    used_default: boolean;
    selected_integration_code: string;
  };

  @Column('jsonb', { nullable: true })
  integration_request: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
  };

  @Column('jsonb', { nullable: true })
  integration_response: {
    status: number;
    headers: Record<string, string>;
    body: any;
    duration_ms: number;
  };

  @Column('jsonb', { nullable: true })
  validation_result: {
    success: boolean;
    conditions_results?: {
      path: string;
      operator: string;
      expected_value: any;
      actual_value: any;
      result: boolean;
    }[];
    error?: string;
  };

  @Column('jsonb', { nullable: true })
  client_response: {
    status: number;
    body: any;
  };

  @Column({ nullable: true })
  error_message: string;
} 