import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
} 