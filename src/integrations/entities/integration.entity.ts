import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { Connection } from '../../connections/entities/connection.entity';
import { Endpoint } from '../../endpoints/entities/endpoint.entity';

@Entity('integrations')
export class Integration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  integrationCode: string;

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

  @Column()
  type: string;

  @Column('jsonb')
  request: any;

  @Column('jsonb')
  response: any;

  @ManyToMany(() => Endpoint, endpoint => endpoint.integrations)
  endpoints: Endpoint[];

  @OneToMany(() => Connection, connection => connection.integration)
  connections: Connection[];
} 