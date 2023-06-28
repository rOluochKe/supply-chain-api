import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Item } from './Item';

export enum Location {
  Supplier = 'Supplier',
  Manufacturer = 'Manufacturer',
  Distributor = 'Distributor',
  Retailer = 'Retailer',
  Customer = 'Customer',
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Column({ type: 'enum', enum: Location, default: Location.Supplier })
  @IsNotEmpty()
  @IsEnum(Location)
  location!: Location;

  @Column()
  @IsNotEmpty()
  @IsString()
  custodian!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;

  @ManyToOne(() => Item, item => item.events)
  item!: Item;
}
