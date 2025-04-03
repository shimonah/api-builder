import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Endpoint } from '../../endpoints/entities/endpoint.entity';

@Entity('rules')
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('jsonb')
  rules: {
    condition: {
      operator: string;
      value: string | number | boolean;
    };
    integration_code: string;
    priority: number;
  }[];

  @Column('jsonb')
  default: {
    integration_code: string;
    priority: number;
  };

  @ManyToMany(() => Endpoint, endpoint => endpoint.rules)
  endpoints: Endpoint[];
} 