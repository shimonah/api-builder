import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Input } from '../../inputs/entities/input.entity';
import { Rule } from '../../rules/entities/rule.entity';
import { Connection } from '../../connections/entities/connection.entity';
import { Integration } from '../../integrations/entities/integration.entity';

@Entity('endpoints')
export class Endpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  endpoint_code: string;

  @Column()
  url_path: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  version: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToMany(() => Input)
  @JoinTable({
    name: 'endpoint_inputs',
    joinColumn: { name: 'endpoint_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'input_id', referencedColumnName: 'id' }
  })
  inputs: Input[];

  @ManyToMany(() => Rule)
  @JoinTable({
    name: 'endpoint_rules',
    joinColumn: { name: 'endpoint_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'rule_id', referencedColumnName: 'id' }
  })
  rules: Rule[];

  @ManyToMany(() => Integration)
  @JoinTable({
    name: 'endpoint_integrations',
    joinColumn: { name: 'endpoint_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'integration_id', referencedColumnName: 'id' }
  })
  integrations: Integration[];

  @OneToMany(() => Connection, connection => connection.endpoint)
  connections: Connection[];
} 