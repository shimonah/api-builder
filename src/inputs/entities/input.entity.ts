import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Endpoint } from '../../endpoints/entities/endpoint.entity';

@Entity('inputs')
export class Input {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  method: string;

  @Column('jsonb')
  schema: {
    type: string;
    properties: {
      [key: string]: {
        type: string;
        description?: string;
        required?: boolean;
        enum?: string[];
        [key: string]: any;
      };
    };
  };

  @ManyToMany(() => Endpoint, endpoint => endpoint.inputs)
  endpoints: Endpoint[];
} 