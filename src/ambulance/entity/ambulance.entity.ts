import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import type { Point } from 'geojson';

@Entity('ambulances')
export class Ambulance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g., 'Ambulance-001'

  @Column({ default: 'available' }) // Extra: 'available', 'in-use', 'maintenance'
  status: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: false,
  })
  @Index({ spatial: true })
  location: Point;
}