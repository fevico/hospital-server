import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import type { Point } from 'geojson';

@Entity('hospitals')
export class Hospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true }) // Extra: Street address for display
  address: string;

  @Column({ default: 100 }) // Extra: Bed capacity
  capacity: number;

  @Column({ nullable: true }) // Extra: e.g., 'General', 'Specialist', 'Emergency'
  type: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: false,
  })
  @Index({ spatial: true })
  location: Point; // { type: 'Point', coordinates: [lng, lat] }
}