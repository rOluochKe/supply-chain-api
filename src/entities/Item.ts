import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString, Min, IsNumber } from 'class-validator';
import { Event } from './Event';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  colour!: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;

  @OneToMany(() => Event, (event) => event.item)
  events!: Event[];
}
