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

  @Column({ default: true })
  active: boolean;

  @Column()
  logical_operator: string;

  @Column('jsonb')
  conditions: {
    property_value: string;
    property_type: string;
    operator: string;
    value: string;
    transform: string;
  }[];

  @Column()
  integration_code: string;

  @ManyToMany(() => Endpoint, endpoint => endpoint.rules)
  endpoints: Endpoint[];
} 